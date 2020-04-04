const express = require('express')
const mongoose = require('mongoose')
const shortid = require('shortid')
const timeLib = require('./../libs/timeLib')
const responseLib = require('./../libs/responseLib')
const checkLib = require('./../libs/checkLib')
const loggerLib = require('./../libs/loggerLib')
const validateInput = require('./../libs/paramsValidationLib');
const passwordLib = require('./../libs/passwordLib')
const tokenLib = require('./../libs/tokenLib')
const sendEmail = require('./../libs/nodemailer')

const UserModel = mongoose.model('User')
const AuthModel = mongoose.model('Auth')


/*----------SIGNUP START ---------*/
let signUpFunction = (req, res) => {
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                if (!validateInput.Email(req.body.email)) {
                    let apiResponse = responseLib.generate(true, 'Invalid email id', 400, null);
                    reject(apiResponse);
                } else if (!validateInput.Password(req.body.password)) {
                    let apiResponse = responseLib.generate(true, 'Password length must be minimum 8 characters', 400, null);
                    reject(apiResponse);
                } else {
                    resolve(req);
                }
            } else {
                let apiResponse = responseLib.generate(true, 'some parameter is missing', 400, null);
                reject(apiResponse);
            }
        });
    }

    let createUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({
                email: req.body.email
            })
                .exec((err, retrievedUserDetails) => {
                    if (err) {
                        let apiResponse = responseLib.generate(true, 'Failed To Create User', 500, null)
                        reject(apiResponse)
                    } else if (checkLib.isEmpty(retrievedUserDetails)) {
                        let newUser = new UserModel({
                            userId: shortid.generate(),
                            userName: req.body.userName,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName || '',
                            email: req.body.email.toLowerCase(),
                            isAdmin: req.body.isAdmin,
                            mobileNumber: req.body.mobileNumber,
                            password: passwordLib.hashpassword(req.body.password),
                            countryName: req.body.countryName,
                            countryCode: req.body.countryCode,
                            createdOn: timeLib.now()
                        })
                        newUser.save((err, newUser) => {
                            if (err) {
                                loggerLib.error(err.message, 'userController: createUser', 10)
                                let apiResponse = responseLib.generate(true, 'Failed to create new User', 500, null)
                                reject(apiResponse)
                            } else {
                                let newUserObj = newUser.toObject();
                                resolve(newUserObj)
                            }
                        })
                    } else {
                        loggerLib.error('User Already Present', 'userController: createUser', 4)
                        let apiResponse = responseLib.generate(true, 'User Already Present With this Email', 403, null)
                        reject(apiResponse)
                    }
                })
        });
    } 


    validateUserInput(req, res)
        .then(createUser)
        .then((resolve) => {
            delete resolve.password
            let apiResponse = responseLib.generate(false, 'User created Successfully', 200, resolve)
            res.send(apiResponse)
            sendEmail.welcomeMail(resolve);

        })
        .catch((err) => {
            res.send(err);
        })

}
/*----------SIGNUP END ---------*/


let loginFunction = (req, res) => {
    let findUser = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                UserModel.findOne({ email: req.body.email },(err, userDetails) => {
                    if (err) {
                            loggerLib.error('Failed to find user', 'userController: findUser()');
                            let response = responseLib.generate(true, 'Failed to find user', 500, null);
                            reject(response);
                        } else if (checkLib.isEmpty(userDetails)) {
                            let response = responseLib.generate(true, 'User not found', 404, null)
                            reject(response);
                        } else {
                            resolve(userDetails);
                        }
                    });

            } else {
                let response = responseLib.generate(true, 'email missing', 400, null);
                reject(response);
            }
        })
    }
    let validatePassword = (retrievedUserDetails) => {
        return new Promise((resolve, reject) => {
            passwordLib.comparePassword(req.body.password, retrievedUserDetails.password, (err, isMatch) => {
                if (err) {
                    loggerLib.error(err.message, 'userController: validatePassword()', 10)
                    let response = responseLib.generate(true, 'Login Failed', 500, null)
                    reject(response)
                } else if (isMatch) {
                    let retrievedUserDetailsObj = retrievedUserDetails.toObject()
                    delete retrievedUserDetailsObj.password
                    delete retrievedUserDetailsObj._id
                    delete retrievedUserDetailsObj.__v
                    delete retrievedUserDetailsObj.createdOn
                    delete retrievedUserDetailsObj.modifiedOn
                    resolve(retrievedUserDetailsObj)
                } else {
                    loggerLib.info('Invalid Password', 'userController: validatePassword()', 10)
                    let response = responseLib.generate(true, 'Invalid Password', 400, null)
                    reject(response)
                }
            })
        })
    }

    let generateToken = (userDetails) => {
        return new Promise((resolve, reject) => {
            tokenLib.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    let response = responseLib.generate(true, 'Failed To Generate Token', 500, null)
                    reject(response)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }
            })
        })
    }
    let saveToken = (tokenDetails) => {
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ userId: tokenDetails.userId }, (err, retrievedTokenDetails) => {
                if (err) {
                    let response = responseLib.generate(true, 'Failed To Generate Token', 500, null)
                    reject(response)
                } else if (checkLib.isEmpty(retrievedTokenDetails)) {
                    let newAuthToken = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: timeLib.now()
                    })
                    newAuthToken.save((err, newTokenDetails) => {
                        if (err) {
                            let response = responseLib.generate(true, 'Failed To Generate Token', 500, null)
                            reject(response)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                } else {
                    retrievedTokenDetails.authToken = tokenDetails.token
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrievedTokenDetails.tokenGenerationTime = timeLib.now()
                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {
                            let response = responseLib.generate(true, 'Failed To Generate Token', 500, null)
                            reject(response)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                }
            })
        })
    }

    findUser(req, res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            let response = responseLib.generate(false, 'Login Successful', 200, resolve)
            res.status(200)
            res.send(response)
        })
        .catch((err) => {
            res.status(err.status)
            res.send(err)
        })
}


/*----------GET USERS START ---------*/
let getAllUsers = (req, res) => {
    UserModel.find()
        .select(' -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                loggerLib.error(err.message, 'User Controller: getAllUsers()', 10)
                let apiRespose = responseLib.generate(true, 'Failed To Find Users Details', 500, null)
                res.send(apiRespose)
            } else if (checkLib.isEmpty(result)) {
                let apiRespose = responseLib.generate(true, 'No User Found', 404, null)
                res.send(apiRespose);
            } else {
                let apiRespose = responseLib.generate(false,  'User Details Found Successfully', 200, result)
                res.send(apiRespose);
            }
        })
}
/*----------GET USERS END ---------*/



let logout = (req, res) => {
    AuthModel.findOneAndRemove({ userId: req.params.userId }, (err, result) => {
            if (err) {
                let apiResponse = responseLib.generate(true, 'Failed to logout', 500, null);
                res.send(apiResponse);
            } else if (checkLib.isEmpty(result)) {
                let apiResponse = responseLib.generate(true, 'User not found', 404, null);
                res.send(apiResponse);
            } else {
                let apiResponse = responseLib.generate(false, 'Logged out Successfully', 200, null);
                res.send(apiResponse);
            }
        });
}

let forgotPassword = (req, res) => {
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (checkLib.isEmpty(req.body.email)) {
                let apiResponse = responseLib.generate(true, 'Bad request, email is missing', 400, null);
                reject(apiResponse);
            } else {
                resolve(req);
            }
        })
    }
    let sendResetPasswordLink = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email: req.body.email },
                (err, result) => {
                    if (err) {
                        let apiResponse = responseLib.generate(true, 'Failed to Find User Details', 500, null);
                        reject(apiResponse);
                    } else if (checkLib.isEmpty(result)) {
                        let apiResponse = responseLib.generate(true, 'User not found with this email', 404, null);
                        reject(apiResponse);
                    } else {
                        let apiResponse = responseLib.generate(false, 'Email sent successfully to reset the password', 200, 'Email Sent Successfully');
                        resolve(apiResponse);
                    }
                })
        })
    }
    validateUserInput(req, res)
        .then(sendResetPasswordLink)
        .then((resolve) => {
            let apiResponse = responseLib.generate(false, 'email send successfully to reset Password', 200, resolve)
            res.send(apiResponse);
            sendEmail.forgotPassword()
        }).catch((err) => {
            let apiResponse = responseLib.generate(err.error, err.message, err.status, err.data);
            res.send(apiResponse);
        })
}


let getUserByUserId = (req, res) => {
    UserModel.findOne({ 'userId': req.params.userId })
        .select('-password -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                loggerLib.error(err.message, 'userController: getUserById()')
                let apiResponse = responseLib.generate(true, 'Failed to Find User', 500, null)
                res.send(apiResponse);
            } else if (checkLib.isEmpty(result)) {
                let apiResponse = responseLib.generate(true, 'User not found', 404, null)
                res.send(apiResponse);
            } else {
                let apiResponse = responseLib.generate(false, 'User found Successfully', 200, result)
                res.send(apiResponse);
            }
        })
}



let deleteUser = (req, res) => {
    UserModel.findOneAndRemove({ 'userId': req.params.userId }).exec((err, result) => {
        if (err) {
            loggerLib.error(err.message, 'User Controller: deleteUser()');
            let response = responseLib.generate(true, 'Failed to Delete User', 500, null);
            res.send(response);
        } else if (checkLib.isEmpty(result)) {
            loggerLib.info('User not found', 'User Controller: deleteUser()');
            let response = responseLib.generate(true, 'User not found', 404, null);
            res.send(response);
        } else {
            let response = responseLib.generate(false, 'User Deleted Successfully', 200, result);
            res.send(response);
        }
    });
}



module.exports = {
    getAllUsers: getAllUsers,
    loginFunction: loginFunction,
    signUpFunction: signUpFunction,
    logout: logout,
    forgotPassword: forgotPassword,
    getUserByUserId: getUserByUserId,
    deleteUser: deleteUser
}