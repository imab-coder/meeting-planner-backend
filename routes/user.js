const express = require('express')
const appConfig = require('./../config/appConfig')
const userController = require('../controllers/userController')
const auth = require('./../middlewares/auth')

let setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;

    app.post(`${baseUrl}/login`, userController.loginFunction)
    /**
	 * @api {post} /api/v1/users/login Login user
	 * @apiVersion 0.0.1
	 * @apiGroup Read
	 *
     * @apiParam {String} email Email of the user passed as the body parameter
     * @apiParam {String} password Password of the user passed as the body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
            "error": false,
            "message": "Login Successful",
            "status": 200,
            "data": {
                "authToken": "XqS7SVZnP-Y6dA1cK080EYyXZ6J7PcYLtOU",
                "userDetails": {
                    "userId": "k0K20rqOG",
                    "userName": "abhi2",
                    "firstName": "abhi",
                    "lastName": "av",
                    "mobileNumber": 9999999999,
                    "countryCode": "91",
                    "isAdmin": true,
                    "email": "abhi@gmail.com"
                }
            }
        }
	  
	 * @apiErrorExample {json} Error-Response:
	 * {
	    "error": true,
	    "message": "Login Failed",
	    "status": 500,
	    "data": null
	   }
	*/
    

    app.post(`${baseUrl}/signup`, userController.signUpFunction)
    /**
	 * @api {post} /api/v1/users/signup Signup user
	 * @apiVersion 0.0.1
	 * @apiGroup Create
	 *
     * @apiParam {string} userName User name of user. (body params)(required)
     * @apiParam {string} firstName First name of user. (body params)(required)
     * @apiParam {string} lastName Last name of user. (body params)(required)
     * @apiParam {string} email Email of user. (body params)(required)
     * @apiParam {string} password Password of user. (body params)(required)
     * @apiParam {number} mobileNumber Mobile number of user. (body params)(required)
     * @apiParam {string} countryCode Country code of user. (body params)(required)
     * @apiParam {boolean} isAdmin Boolean value if singup as an admin then true else false. (body params)(required)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
            "error": false,
            "message": "User created Successfully",
            "status": 200,
            "data": {
                "userId": "rxicHSIHY",
                "userName": "kranthi2",
                "firstName": "kranthi",
                "lastName": "n",
                "mobileNumber": 2222222222,
                "countryCode": "91",
                "isAdmin": false,
                "_id": "5e8776e8d18627510c512cb8",
                "email": "kranthi@gmail.com",
                "__v": 0
            }
        }
    }
    
	 * @apiErrorExample {json} Error-Response:
	 * {
	    "error": true,
	    "message": "Failed to create new User.",
	    "status": 500,
	    "data": null
	   }
	*/

    app.post(`${baseUrl}/logout/:userId`, auth.isAuthorized, userController.logout)
    /**
    * @api {post} /api/v1/users/logout/:userId Logout user by authToken
    * @apiVersion 0.0.1
    * @apiGroup Read
    *
    * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
    * @apiParam {String} userId UserId of active user (body params)
    * 
    *  @apiSuccessExample {json} Success-Response:
    *  {
           error: false, 
           message: "Logged Out Successfully", 
           status: 200, 
           data: null
       }
    
    * @apiErrorExample {json} Error-Response:
    *   {
            error: true,
            message: "Failed to logout",
            status: 404,
            data: null
        }
    */

    app.post(`${baseUrl}/forgotpassword`, userController.forgotPassword)
    /**
	 * @api {post} /api/v1/users/forgotPassword Recover password by user email
	 * @apiVersion 0.0.1
	 * @apiGroup Edit
	 *
	 * @apiParam {String} email email of the user passed as the Body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
            error: false, 
            message: "email send successfully to reset Password", 
            status: 200, 
            data: {
                n: 1
                nModified: 1
                ok: 1
            }
        }
	  
	 * @apiErrorExample {json} Error-Response:
	 * {
	        "error": true,
	        "message": "Failed to Find User Details.",
	        "status": 500,
	        "data": null
	   }
	*/

    app.get(`${baseUrl}/view/all`, userController.getAllUsers)
    /**
	 * @api {get} /api/v1/users/view/all Get all users
	 * @apiVersion 0.0.1
	 * @apiGroup Read
	 *
	 *
	 * @apiSuccessExample {json} Success-Response:
	 *  {
            "error": false,
            "message": "User Details Found Successfully",
            "status": 200,
            "data": [
                {
                    "userId": "k0K20rqOG",
                    "userName": "abhi2",
                    "firstName": "abhi",
                    "lastName": "av",
                    "password": "$2b$10$7YpKC5Mm/9oXqZPMx3VQqut.f9l.Vqr3U5P0Nyb0VibYzGJm1M41C",
                    "mobileNumber": 9999999999,
                    "countryCode": "91",
                    "isAdmin": true,
                    "email": "abhi@gmail.com"
                }
            ]
        }
        
     * @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find User Details",
	    "status": 500,
	    "data": null
	   }
	*/

    app.get(`${baseUrl}/:userId`, auth.isAuthorized, userController.getUserByUserId)
    /**
     * @api {get} /api/v1/users/:userId Get a single user
     * @apiVersion 0.0.1
     * @apiGroup Read
     *
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * @apiParam {String} userId The userId should be passed as the URL parameter
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "User Details Found Successfully",
            "status": 200,
            "data": {
                "userId": "k0K20rqOG",
                "userName": "abhi2",
                "firstName": "abhi",
                "lastName": "av",
                "password": "$2b$10$7YpKC5Mm/9oXqZPMx3VQqut.f9l.Vqr3U5P0Nyb0VibYzGJm1M41C",
                "mobileNumber": 9999999999,
                "countryCode": "91",
                "isAdmin": true,
                "email": "abhi@gmail.com"
            }
        }
    * @apiErrorExample {json} Error-Response:
    * {
        "error": true,
        "message": "Failed to Find User.",
        "status": 500,
        "data": null
    }
    */
    app.post(`${baseUrl}/:userId/delete`, userController.deleteUser);
    /**
     * @api {post} /api/v1/users/:userId/delete Delete User
     * @apiGroup Delete 
     * @apiVersion 0.0.1
     * 
     * @apiParam {string} authToken authToken of the user. (query params/body params/header)(required)
     * @apiParam {string} userId User Id of the user (body params)(required)
     * 
     * 
     * 
     * @apiSuccessExample {object} Success-Response:
     * {
            "error": false,
            "message": "User Deleted Successfully",
            "status": 200,
            "data": {
                "userId": "k0K20rqOG",
                "userName": "abhi2",
                "firstName": "abhi",
                "lastName": "av",
                "password": "$2b$10$7YpKC5Mm/9oXqZPMx3VQqut.f9l.Vqr3U5P0Nyb0VibYzGJm1M41C",
                "mobileNumber": 9999999999,
                "countryCode": "91",
                "isAdmin": true,
                "email": "abhi@gmail.com"
            }
        }
     * @apiErrorExample {json} Error-Response:
     * {
            "error": true,
            "message": "User not found",
            "status": 404,
            "data": null
        }
    */

}

module.exports = {
    setRouter: setRouter
}