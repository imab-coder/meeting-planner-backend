define({ "api": [
  {
    "group": "Create",
    "version": "0.0.1",
    "type": "post",
    "url": "/api/v1/meeting/create",
    "title": "Create Meeting",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the meeting (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "purpose",
            "description": "<p>Purpose of the meeting (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "start",
            "description": "<p>Start date-time of meeting (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "end",
            "description": "<p>End date-time of meeting (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "location",
            "description": "<p>Location of the meeting (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "inviter",
            "description": "<p>userId of the Admin who created meeting (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "invitee",
            "description": "<p>userId of normal user for whom meeting created (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "inviterEmail",
            "description": "<p>email address of the Admin who created meeting (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "inviteeEmail",
            "description": "<p>email address of normal user for whom meeting created (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token(body param/header/query param) of the admin who created meeting (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n        \"error\": false,\n        \"message\": \"Meeting created\",\n        \"status\": 200,\n        \"data\": {\n            \"meetingId\": \"lAdjqAr5U\",\n            \"title\": \"test1\",\n            \"inviter\": \"abhi2\",\n            \"invitee\": \"kranthi2\",\n            \"purpose\": \"testing purpose1\",\n            \"start\": \"2020-04-03T17:56:38.000Z\",\n            \"end\": \"2020-04-05T16:00:05.000Z\",\n            \"location\": \"bangalore\",\n            \"inviterEmail\": \"abhi@gmail.com\",\n            \"inviteeEmail\": \"kranthi@gmail.com\",\n            \"timestamp\": \"2020-04-03T17:56:38.000Z\"\n        }\n    }",
          "type": "object"
        }
      ]
    },
    "filename": "routes/meetings.js",
    "groupTitle": "Create",
    "name": "PostApiV1MeetingCreate"
  },
  {
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "Signup user",
    "version": "0.0.1",
    "group": "Create",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userName",
            "description": "<p>User name of user. (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name of user. (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last name of user. (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email of user. (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password of user. (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Mobile number of user. (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "countryCode",
            "description": "<p>Country code of user. (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isAdmin",
            "description": "<p>Boolean value if singup as an admin then true else false. (body params)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"User created Successfully\",\n           \"status\": 200,\n           \"data\": {\n               \"userId\": \"rxicHSIHY\",\n               \"userName\": \"kranthi2\",\n               \"firstName\": \"kranthi\",\n               \"lastName\": \"n\",\n               \"mobileNumber\": 2222222222,\n               \"countryCode\": \"91\",\n               \"isAdmin\": false,\n               \"_id\": \"5e8776e8d18627510c512cb8\",\n               \"email\": \"kranthi@gmail.com\",\n               \"__v\": 0\n           }\n       }\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t    \"error\": true,\n\t    \"message\": \"Failed to create new User.\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "Create",
    "name": "PostApiV1UsersSignup"
  },
  {
    "group": "Delete",
    "version": "0.0.1",
    "type": "post",
    "url": "/api/v1/meeting/delete/:meetingId",
    "title": "Delete Meeting",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingId",
            "description": "<p>Meeting Id of the meeting which is to be deleted</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of the admin who delete the meeting</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"error\":false,\n      \"message\":\"Meeting deleted\",\n      \"status\":200,\n      \"data\":{\n              \"meetingId\":\"xnRqTIECP\",\n              \"title\":\"test\",\n              \"inviter\":\"test\",\n              \"invitee\":\"test\",\n              \"purpose\":\"For Testing purpose\",\n              \"start\":\"2020-03-28T11:00:12.000Z\",\n              \"end\":\"2020-03-28T12:00:12.000Z\",\n              \"location\":\"Bangalore\",\n              \"inviterEmail\":\"abhi@gmail.com\",\n              \"inviteeEmail\":\"kranthi@gmail.com\",\n              \"timestamp\":\"2020-03-28T06:41:27.000Z\"\n            }\n      }",
          "type": "object"
        }
      ]
    },
    "filename": "routes/meetings.js",
    "groupTitle": "Delete",
    "name": "PostApiV1MeetingDeleteMeetingid"
  },
  {
    "type": "post",
    "url": "/api/v1/users/:userId/delete",
    "title": "Delete User",
    "group": "Delete",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query params/body params/header)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id of the user (body params)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"error\": false,\n            \"message\": \"User Deleted Successfully\",\n            \"status\": 200,\n            \"data\": {\n                \"userId\": \"k0K20rqOG\",\n                \"userName\": \"abhi2\",\n                \"firstName\": \"abhi\",\n                \"lastName\": \"av\",\n                \"password\": \"$2b$10$7YpKC5Mm/9oXqZPMx3VQqut.f9l.Vqr3U5P0Nyb0VibYzGJm1M41C\",\n                \"mobileNumber\": 9999999999,\n                \"countryCode\": \"91\",\n                \"isAdmin\": true,\n                \"email\": \"abhi@gmail.com\"\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n            \"error\": true,\n            \"message\": \"User not found\",\n            \"status\": 404,\n            \"data\": null\n        }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "Delete",
    "name": "PostApiV1UsersUseridDelete"
  },
  {
    "type": "post",
    "url": "/api/v1/users/forgotPassword",
    "title": "Recover password by user email",
    "version": "0.0.1",
    "group": "Edit",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user passed as the Body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           error: false, \n           message: \"email send successfully to reset Password\", \n           status: 200, \n           data: {\n               n: 1\n               nModified: 1\n               ok: 1\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t        \"error\": true,\n\t        \"message\": \"Failed to Find User Details.\",\n\t        \"status\": 500,\n\t        \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "Edit",
    "name": "PostApiV1UsersForgotpassword"
  },
  {
    "group": "Edit",
    "version": "0.0.1",
    "type": "put",
    "url": "/api/v1/meeting/update/:meetingId",
    "title": "Update meeting",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetingId",
            "description": "<p>Meeting ID of the meeting</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the meeting (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "purpose",
            "description": "<p>Purpose of the meeting (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "start",
            "description": "<p>Start date-time of meeting (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "end",
            "description": "<p>End date-time of meeting (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "location",
            "description": "<p>Location of the meeting (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "inviter",
            "description": "<p>userId of the Admin who created meeting (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "invitee",
            "description": "<p>userId of normal user for whom meeting created (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "inviterEmail",
            "description": "<p>email address of the Admin who created meeting (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "inviteeEmail",
            "description": "<p>email address of normal user for whom meeting created (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token(body param/header/query param) of the admin who created meeting (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"error\":false,\n      \"message\":\"Meeting updated\",\n      \"status\":200,\n      \"data\":{\n          \"n\":1,\n          \"nModified\":1,\n          \"ok\":1\n        }\n    }",
          "type": "object"
        }
      ]
    },
    "filename": "routes/meetings.js",
    "groupTitle": "Edit",
    "name": "PutApiV1MeetingUpdateMeetingid"
  },
  {
    "group": "Read",
    "version": "0.0.1",
    "type": "get",
    "url": "/api/v1/meeting/getByInvitee/:inviteeId",
    "title": "Get Meetings by invitee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization(body param/header/query param) Token of the admin (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "inviteeId",
            "description": "<p>User ID of normal user for whom meetings created (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http stataus code, result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"error\":false,\n      \"message\":\"Meeting found\",\n      \"status\":200,\n      \"data\":[\n              {\n                \"meetingId\":\"xnRqTIECP\",\n                \"title\":\"test\",\n                \"inviter\":\"test\",\n                \"invitee\":\"test\",\n                \"purpose\":\"For Testing purpose\",\n                \"start\":\"2020-03-28T11:00:12.000Z\",\n                \"end\":\"2020-03-28T12:00:12.000Z\",\n                \"location\":\"Bangalore\",\n                \"inviterEmail\":\"abhi@gmail.com\",\n                \"inviteeEmail\":\"kranthi@gmail.com\",\n                \"timestamp\":\"2020-03-28T06:41:27.000Z\"\n              }\n            ]\n          }",
          "type": "object"
        }
      ]
    },
    "filename": "routes/meetings.js",
    "groupTitle": "Read",
    "name": "GetApiV1MeetingGetbyinviteeInviteeid"
  },
  {
    "group": "Read",
    "version": "0.0.1",
    "type": "get",
    "url": "/api/v1/meeting/getByInviter/:inviterId",
    "title": "Get Meetings by inviter",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization(body param/header/query param) Token of the admin (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "inviterId",
            "description": "<p>User ID of admin who created meeting (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http stataus code, result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"error\":false,\n      \"message\":\"Meeting found\",\n      \"status\":200,\n      \"data\":[\n              {\n                \"meetingId\": \"lAdjqAr5U\",\n                \"title\": \"test1\",\n                \"inviter\": \"abhi2\",\n                \"invitee\": \"kranthi2\",\n                \"purpose\": \"testing purpose1\",\n                \"start\": \"2020-04-03T17:56:38.000Z\",\n                \"end\": \"2020-04-05T16:00:05.000Z\",\n                \"location\": \"bangalore\",\n                \"inviterEmail\": \"abhi@gmail.com\",\n                \"inviteeEmail\": \"kranthi@gmail.com\",\n                \"timestamp\": \"2020-04-03T17:56:38.000Z\"\n            }\n          ]\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "routes/meetings.js",
    "groupTitle": "Read",
    "name": "GetApiV1MeetingGetbyinviterInviterid"
  },
  {
    "group": "Read",
    "version": "0.0.1",
    "type": "get",
    "url": "/api/v1/meeting/getByInviterAndInvitee",
    "title": "Get Meetings by combination of inviter and invitee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization(body param/header/query param) Token of the admin (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "inviter",
            "description": "<p>userId of admin who created meeting (query param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "invitee",
            "description": "<p>userId of normal user for whom meeting created (query param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http stataus code, result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"error\":false,\n      \"message\":\"Meeting found\",\n      \"status\":200,\n      \"data\":[\n              {\n                \"meetingId\": \"lAdjqAr5U\",\n                \"title\": \"test1\",\n                \"inviter\": \"abhi2\",\n                \"invitee\": \"kranthi2\",\n                \"purpose\": \"testing purpose1\",\n                \"start\": \"2020-04-03T17:56:38.000Z\",\n                \"end\": \"2020-04-05T16:00:05.000Z\",\n                \"location\": \"bangalore\",\n                \"inviterEmail\": \"abhi@gmail.com\",\n                \"inviteeEmail\": \"kranthi@gmail.com\",\n                \"timestamp\": \"2020-04-03T17:56:38.000Z\",\n              },\n              {\n                \"meetingId\":\"CSNuqYFDp\",\n                \"title\":\"test\",\n                \"inviter\":\"test\",\n                \"invitee\":\"test\",\n                \"purpose\":\"test purpose\",\n                \"start\":\"2020-04-03T17:56:38.000Z\",\n                \"end\":\"2020-04-05T16:00:05.000Z\",\n                \"location\":\"Hyderabad\",\n                \"inviterEmail\":\"abhi@gmail.com\",\n                \"inviteeEmail\":\"kranthi@gmail.com\",\n                \"timestamp\":\"2020-04-03T17:56:38.000Z\"\n              }\n            ]\n          }",
          "type": "object"
        }
      ]
    },
    "filename": "routes/meetings.js",
    "groupTitle": "Read",
    "name": "GetApiV1MeetingGetbyinviterandinvitee"
  },
  {
    "type": "get",
    "url": "/api/v1/users/:userId",
    "title": "Get a single user",
    "version": "0.0.1",
    "group": "Read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>The userId should be passed as the URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"User Details Found Successfully\",\n           \"status\": 200,\n           \"data\": {\n               \"userId\": \"k0K20rqOG\",\n               \"userName\": \"abhi2\",\n               \"firstName\": \"abhi\",\n               \"lastName\": \"av\",\n               \"password\": \"$2b$10$7YpKC5Mm/9oXqZPMx3VQqut.f9l.Vqr3U5P0Nyb0VibYzGJm1M41C\",\n               \"mobileNumber\": 9999999999,\n               \"countryCode\": \"91\",\n               \"isAdmin\": true,\n               \"email\": \"abhi@gmail.com\"\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n        \"error\": true,\n        \"message\": \"Failed to Find User.\",\n        \"status\": 500,\n        \"data\": null\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "Read",
    "name": "GetApiV1UsersUserid"
  },
  {
    "type": "get",
    "url": "/api/v1/users/view/all",
    "title": "Get all users",
    "version": "0.0.1",
    "group": "Read",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"User Details Found Successfully\",\n           \"status\": 200,\n           \"data\": [\n               {\n                   \"userId\": \"k0K20rqOG\",\n                   \"userName\": \"abhi2\",\n                   \"firstName\": \"abhi\",\n                   \"lastName\": \"av\",\n                   \"password\": \"$2b$10$7YpKC5Mm/9oXqZPMx3VQqut.f9l.Vqr3U5P0Nyb0VibYzGJm1M41C\",\n                   \"mobileNumber\": 9999999999,\n                   \"countryCode\": \"91\",\n                   \"isAdmin\": true,\n                   \"email\": \"abhi@gmail.com\"\n               }\n           ]\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Failed To Find User Details\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "Read",
    "name": "GetApiV1UsersViewAll"
  },
  {
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "Login user",
    "version": "0.0.1",
    "group": "Read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user passed as the body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user passed as the body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Login Successful\",\n           \"status\": 200,\n           \"data\": {\n               \"authToken\": \"XqS7SVZnP-Y6dA1cK080EYyXZ6J7PcYLtOU\",\n               \"userDetails\": {\n                   \"userId\": \"k0K20rqOG\",\n                   \"userName\": \"abhi2\",\n                   \"firstName\": \"abhi\",\n                   \"lastName\": \"av\",\n                   \"mobileNumber\": 9999999999,\n                   \"countryCode\": \"91\",\n                   \"isAdmin\": true,\n                   \"email\": \"abhi@gmail.com\"\n               }\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t    \"error\": true,\n\t    \"message\": \"Login Failed\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "Read",
    "name": "PostApiV1UsersLogin"
  },
  {
    "type": "post",
    "url": "/api/v1/users/logout/:userId",
    "title": "Logout user by authToken",
    "version": "0.0.1",
    "group": "Read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>UserId of active user (body params)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n          error: false, \n          message: \"Logged Out Successfully\", \n          status: 200, \n          data: null\n      }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n          error: true,\n          message: \"Failed to logout\",\n          status: 404,\n          data: null\n      }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "Read",
    "name": "PostApiV1UsersLogoutUserid"
  }
] });
