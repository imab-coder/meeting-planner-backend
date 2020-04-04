const express = require('express')
const appConfig = require('./../config/appConfig')
const meetingController = require('./../controllers/meetingController')
const auth = require('./../middlewares/auth')

let setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/meeting`;

    app.post(`${baseUrl}/create`, auth.isAuthorized, meetingController.createMeeting)
    /**
   * @apiGroup Create
   * @apiVersion 0.0.1
   * @api {post} /api/v1/meeting/create Create Meeting
   * 
   * @apiParam {string} title Title of the meeting (body param) (required)
   * @apiParam {string} purpose Purpose of the meeting (body param) (required)
   * @apiParam {date} start Start date-time of meeting (body param) (required)
   * @apiParam {date} end End date-time of meeting (body param) (required)
   * @apiParam {string} location Location of the meeting (body param) (required)
   * @apiParam {string} inviter userId of the Admin who created meeting (body param) (required)
   * @apiParam {string} invitee userId of normal user for whom meeting created (body param) (required)
   * @apiParam {string} inviterEmail email address of the Admin who created meeting (body param) (required)
   * @apiParam {string} inviteeEmail email address of normal user for whom meeting created (body param) (required)
   * @apiParam {string} authToken Authorization Token(body param/header/query param) of the admin who created meeting (body param) (required)
   * 
   * 
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
        "error": false,
        "message": "Meeting created",
        "status": 200,
        "data": {
            "meetingId": "lAdjqAr5U",
            "title": "test1",
            "inviter": "abhi2",
            "invitee": "kranthi2",
            "purpose": "testing purpose1",
            "start": "2020-04-03T17:56:38.000Z",
            "end": "2020-04-05T16:00:05.000Z",
            "location": "bangalore",
            "inviterEmail": "abhi@gmail.com",
            "inviteeEmail": "kranthi@gmail.com",
            "timestamp": "2020-04-03T17:56:38.000Z"
        }
    }
    */

    app.get(`${baseUrl}/getByInviterAndInvitee`, auth.isAuthorized, meetingController.getMeetingsByInviterAndInvitee);
    /**
   * @apiGroup Read
   * @apiVersion 0.0.1
   * @api {get} /api/v1/meeting/getByInviterAndInvitee  Get Meetings by combination of inviter and invitee
   * 
   * @apiParam {string} authToken Authorization(body param/header/query param) Token of the admin (body param) (required)
   * @apiParam {string} inviter userId of admin who created meeting (query param) (required)
   * @apiParam {string} invitee userId of normal user for whom meeting created (query param) (required)
   * @apiSuccess {object} myResponse shows error status, message, http stataus code, result
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
      "error":false,
      "message":"Meeting found",
      "status":200,
      "data":[
              {
                "meetingId": "lAdjqAr5U",
                "title": "test1",
                "inviter": "abhi2",
                "invitee": "kranthi2",
                "purpose": "testing purpose1",
                "start": "2020-04-03T17:56:38.000Z",
                "end": "2020-04-05T16:00:05.000Z",
                "location": "bangalore",
                "inviterEmail": "abhi@gmail.com",
                "inviteeEmail": "kranthi@gmail.com",
                "timestamp": "2020-04-03T17:56:38.000Z",
              },
              {
                "meetingId":"CSNuqYFDp",
                "title":"test",
                "inviter":"test",
                "invitee":"test",
                "purpose":"test purpose",
                "start":"2020-04-03T17:56:38.000Z",
                "end":"2020-04-05T16:00:05.000Z",
                "location":"Hyderabad",
                "inviterEmail":"abhi@gmail.com",
                "inviteeEmail":"kranthi@gmail.com",
                "timestamp":"2020-04-03T17:56:38.000Z"
              }
            ]
          }
   */

    app.put(`${baseUrl}/update/:meetingId`, auth.isAuthorized, meetingController.updateMeeting);
    /**
   * @apiGroup Edit
   * @apiVersion 0.0.1
   * @api {put} /api/v1/meeting/update/:meetingId Update meeting
   * 
   * @apiParam {string} meetingId Meeting ID of the meeting
   * @apiParam {string} title Title of the meeting (body param) (required)
   * @apiParam {string} purpose Purpose of the meeting (body param) (required)
   * @apiParam {date} start Start date-time of meeting (body param) (required)
   * @apiParam {date} end End date-time of meeting (body param) (required)
   * @apiParam {string} location Location of the meeting (body param) (required)
   * @apiParam {string} inviter userId of the Admin who created meeting (body param) (required)
   * @apiParam {string} invitee userId of normal user for whom meeting created (body param) (required)
   * @apiParam {string} inviterEmail email address of the Admin who created meeting (body param) (required)
   * @apiParam {string} inviteeEmail email address of normal user for whom meeting created (body param) (required)
   * @apiParam {string} authToken Authorization Token(body param/header/query param) of the admin who created meeting (body param) (required)
   * 
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
      "error":false,
      "message":"Meeting updated",
      "status":200,
      "data":{
          "n":1,
          "nModified":1,
          "ok":1
        }
    }
   */

    app.post(`${baseUrl}/delete/:meetingId`, auth.isAuthorized, meetingController.deleteMeeting);
    /**
   * @apiGroup Delete
   * @apiVersion 0.0.1
   * @api {post} /api/v1/meeting/delete/:meetingId Delete Meeting
   * 
   * @apiParam {string} meetingId Meeting Id of the meeting which is to be deleted
   * @apiParam {string} authToken Authorization Token of the admin who delete the meeting
   * 
   * 
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
      "error":false,
      "message":"Meeting deleted",
      "status":200,
      "data":{
              "meetingId":"xnRqTIECP",
              "title":"test",
              "inviter":"test",
              "invitee":"test",
              "purpose":"For Testing purpose",
              "start":"2020-03-28T11:00:12.000Z",
              "end":"2020-03-28T12:00:12.000Z",
              "location":"Bangalore",
              "inviterEmail":"abhi@gmail.com",
              "inviteeEmail":"kranthi@gmail.com",
              "timestamp":"2020-03-28T06:41:27.000Z"
            }
      }
   */

    app.get(`${baseUrl}/getByInvitee/:inviteeId`, auth.isAuthorized, meetingController.getMeetingsByInvitee);
    /**
   * @apiGroup Read
   * @apiVersion 0.0.1
   * @api {get} /api/v1/meeting/getByInvitee/:inviteeId Get Meetings by invitee
   * 
   * @apiParam {string} authToken Authorization(body param/header/query param) Token of the admin (body param) (required)
   * @apiParam {string} inviteeId User ID of normal user for whom meetings created (body param) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http stataus code, result
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
      "error":false,
      "message":"Meeting found",
      "status":200,
      "data":[
              {
                "meetingId":"xnRqTIECP",
                "title":"test",
                "inviter":"test",
                "invitee":"test",
                "purpose":"For Testing purpose",
                "start":"2020-03-28T11:00:12.000Z",
                "end":"2020-03-28T12:00:12.000Z",
                "location":"Bangalore",
                "inviterEmail":"abhi@gmail.com",
                "inviteeEmail":"kranthi@gmail.com",
                "timestamp":"2020-03-28T06:41:27.000Z"
              }
            ]
          }
   */

    app.get(`${baseUrl}/getByInviter/:inviterId`, auth.isAuthorized, meetingController.getMeetingsByInviter);
    /**
   * @apiGroup Read
   * @apiVersion 0.0.1
   * @api {get} /api/v1/meeting/getByInviter/:inviterId Get Meetings by inviter
   * 
   * @apiParam {string} authToken Authorization(body param/header/query param) Token of the admin (body param) (required)
   * @apiParam {string} inviterId User ID of admin who created meeting (body param) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http stataus code, result
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
      "error":false,
      "message":"Meeting found",
      "status":200,
      "data":[
              {
                "meetingId": "lAdjqAr5U",
                "title": "test1",
                "inviter": "abhi2",
                "invitee": "kranthi2",
                "purpose": "testing purpose1",
                "start": "2020-04-03T17:56:38.000Z",
                "end": "2020-04-05T16:00:05.000Z",
                "location": "bangalore",
                "inviterEmail": "abhi@gmail.com",
                "inviteeEmail": "kranthi@gmail.com",
                "timestamp": "2020-04-03T17:56:38.000Z"
            }
          ]
        }
   */


}

module.exports = {
    setRouter: setRouter
}