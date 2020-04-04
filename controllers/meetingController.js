const mongoose = require('mongoose')
const shortid = require('shortid')
const responseLib = require('./../libs/responseLib');
const timeLib = require('./../libs/timeLib')
const checkLib = require('./../libs/checkLib')

const MeetingModel = mongoose.model('Meeting')


let createMeeting = (req, res) => {
    let validateRequest = () => {
        return new Promise((resolve, reject) => {
            if (req.body.title && req.body.inviter &&
                req.body.invitee && req.body.location && req.body.purpose) {
                resolve(req);
            } else {
                let apiResponse = responseLib.generate(true, 'Some required fields of meeting are missing.', 400, null);
                reject(apiResponse);
            }
        })
    };
    let saveMeeting = () => {
        return new Promise((resolve, reject) => {
            let newMeeting = new MeetingModel({
                meetingId: shortid.generate(),
                title: req.body.title,
                inviter: req.body.inviter,
                invitee: req.body.invitee,
                purpose: req.body.purpose,
                start: req.body.start,
                end: req.body.end,
                location: req.body.location,
                inviterEmail: req.body.inviterEmail,
                inviteeEmail: req.body.inviteeEmail,
                timestamp: timeLib.now()
            });
            newMeeting.save((err, result) => {
                if (err) {
                    let apiResponse = responseLib.generate(true, 'Falied to save the meeting.', 500, null);
                    reject(apiResponse);
                } else {
                    let createdMeeting = result.toObject();
                    resolve(createdMeeting);
                }
            })
        })
    };
    validateRequest(req, res)
        .then(saveMeeting)
        .then((resolve) => {
            let apiResponse = responseLib.generate(false, 'Meeting created Successfully', 200, resolve);
            res.send(apiResponse)
        }).catch(err => res.send(err));
};



let getMeetingsByInviterAndInvitee = (req, res) => {
    let validateRequest = () => {
        return new Promise((resolve, reject) => {
            if (checkLib.isEmpty(req.query.inviter) || checkLib.isEmpty(req.query.invitee)) {
                let apiResponse = responseLib.generate(true, 'Some parameters missing', 400, null);
                reject(apiResponse);
            } else {
                resolve();
            }
        })
    }
    let findMeetings = () => {
        return new Promise((resolve, reject) => {
            let findQuery = { $and: [{ inviter: req.query.inviter }, { invitee: req.query.invitee }] };
            MeetingModel.find(findQuery)
                .select('-_id -__v')
                .lean()
                .exec((err, result) => {
                    if (err) {
                        let apiResponse = responseLib.generate(true, 'Failed to Find meetings for selected user', 500, null);
                        reject(apiResponse);
                    } else if (checkLib.isEmpty(result)) {
                        let apiResponse = responseLib.generate(true, 'No meetings found for selected user', 404, null);
                        reject(apiResponse);
                    } else {
                        resolve(result);
                    }
                })
        });
    }
    validateRequest()
        .then(findMeetings)
        .then((resolve) => {
            let response = responseLib.generate(false, 'Meeting found Successfully', 200, resolve);
            res.send(response);
        }).catch((err) => res.send(err));
}


let updateMeeting = (req, res) => {
    let findMeetings = () => {
        return new Promise((resolve, reject) => {
            MeetingModel.findOne({
                meetingId: req.params.meetingId
            }, (err, result) => {
                if (err) {
                    let apiResponse = responseLib.generate(true, 'error finding meeting', 500, null);
                    reject(apiResponse)
                } else if (checkLib.isEmpty(result)) {
                    let apiResponse = responseLib.generate(true, 'failed to find meeting', 404, null);
                    reject(apiResponse);
                } else {
                    resolve(result);
                }
            })
        })
    }
    let update = (result) => {
        return new Promise((resolve, reject) => {
            let options = req.body
            MeetingModel.update({
                meetingId: req.params.meetingId
            }, options, (err, updateResult) => {
                if (err) {
                    let apiResponse = responseLib.generate(true, 'failed to update meeting', 500, null);
                    reject(apiResponse);
                } else if (checkLib.isEmpty(updateResult)) {
                    let apiResponse = responseLib.generate(true, 'error finding meeting', 404, null);
                    reject(apiResponse);
                } else {
                    let updatedMeeting = req.body;
                    resolve(updateResult);
                }
            })
        })
    }
    findMeetings()
        .then(update)
        .then((resolve) => {
            let apiResponse = responseLib.generate(false, 'Meeting updated Successfully', 200, resolve);
            res.send(apiResponse)
        }).catch((err) => res.send(err));
}


let deleteMeeting = (req, res) => {
    
    let deleteThisMeeting = (result) => {
        return new Promise((resolve, reject) => {
            MeetingModel.findOneAndRemove({
                meetingId: req.params.meetingId
            }, (err, deleteResult) => {
                if (err) {
                    let apiResponse = responseLib.generate(true, 'Failed to delete meeting', 500, null);
                    reject(apiResponse);
                } else if (checkLib.isEmpty(deleteResult)) {
                    let apiResponse = responseLib.generate(true, 'Meeting not found', 404, null);
                    reject(apiResponse);
                } else {
                    resolve(deleteResult);
                }
            })
        })
    }
    deleteThisMeeting()
        .then((resolve) => {
            let apiResponse = responseLib.generate(false, 'Meeting deleted Successfully', 200, resolve);
            res.send(apiResponse)
        }).catch((err) => res.send(err));
}




let getMeetingsByInvitee = (req, res) => {
    let validateRequest = () => {
        return new Promise((resolve, reject) => {
            if (checkLib.isEmpty(req.params.inviteeId)) {
                let apiResponse = responseLib.generate(true, 'parameters missing', 403, null);
                reject(apiResponse);
            } else {
                resolve();
            }
        })
    }
    let findMeetings = () => {
        return new Promise((resolve, reject) => {
            MeetingModel.find({ invitee: req.params.inviteeId })
                .select('-_id -__v')
                .lean()
                .exec((err, result) => {
                    if (err) {
                        let apiResponse = responseLib.generate(true, 'Failed to Find meeting for selected user', 500, null);
                        reject(apiResponse);
                    } else if (checkLib.isEmpty(result)) {
                        let apiResponse = responseLib.generate(true, 'No meetings found for selected user', 404, null);
                        reject(apiResponse);
                    } else {
                        resolve(result);
                    }
                })
        })
    }
    validateRequest()
        .then(findMeetings)
        .then((resolve) => {
            let apiResponse = responseLib.generate(false, 'Meeting found Successfully', 200, resolve);
            res.send(apiResponse);
        }).catch((err) => res.send(err));
}



let getMeetingsByInviter = (req, res) => {
    let validateRequest = () => {
        return new Promise((resolve, reject) => {
            if (checkLib.isEmpty(req.params.inviterId)) {
                let apiResponse = responseLib.generate(true, 'parameters missing', 403, null);
                reject(apiResponse);
            } else {
                resolve();
            }
        })
    }
    let findMeetings = () => {
        return new Promise((resolve, reject) => {
            MeetingModel.find({ inviter: req.params.inviterId })
                .select('-_id -__v')
                .lean()
                .exec((err, result) => {
                    if (err) {
                        let apiResponse = responseLib.generate(true, 'Failed to Find meeting for selected user', 500, null);
                        reject(apiResponse);
                    } else if (checkLib.isEmpty(result)) {
                        let apiResponse = responseLib.generate(true, 'No meetings found for selected user', 404, null);
                        reject(apiResponse);
                    } else {
                        resolve(result);
                    }
                })
        })
    }
    validateRequest()
        .then(findMeetings)
        .then((resolve) => {
            let apiResponse = responseLib.generate(false, 'Meeting found Succesfully', 200, resolve);
            res.send(apiResponse);
        }).catch((err) => res.send(err));
}



module.exports = {
    createMeeting: createMeeting,
    getMeetingsByInviterAndInvitee: getMeetingsByInviterAndInvitee,
    updateMeeting: updateMeeting,
    deleteMeeting: deleteMeeting,
    getMeetingsByInvitee: getMeetingsByInvitee,
    getMeetingsByInviter: getMeetingsByInviter
}