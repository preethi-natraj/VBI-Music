# VBI-Music

---
## Requirements

For development, you will only need Node.js and a node global package, NPM, installed in your environement.

### Node
- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands. Node version used in this project is 12.18.0

      $ sudo apt install nodejs

## Install

    $ git clone https://github.com/preethi-natraj/VBI-Music.git
    $ cd VBI-Music
    $ npm install

## Running the project

    $ npm start


## API's 



1(a). To login default user: /api/login

    METHOD: POST

    BODY: {
        "identifier": "preethi@gmail.com",
        "password": "test@123"
    }

    RESPONSE: {
        "session": {
            "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTYxNDYyYTIwYzJjYzE1N2NjYzQ3MDIiLCJlbWFpbCI6InByZWV0aGlAZ21haWwuY29tIiwiaWF0IjoxNjMzODgzOTI4LCJleHAiOjE2MzM4ODc1Mjh9.UWR6dhG158Q1OHln-41CU05qHz6yyRuFhEncX_uTanE",
            "validity": 0,
            "specialMessage": null
        },
        "data": {
            "_id": "6161462a20c2cc157ccc4702",
            "email": "preethi@gmail.com",
            "password": "test@123"
        },
        "status": {
            "code": 200,
            "status": "Success",
            "message": "User Successfully logged in"
        }
    }

2(a). To list the songs: /api/list/songs

    METHOD: GET

    BODY: none

    RESPONSE:{
        "session": {
            "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTYxNDYyYTIwYzJjYzE1N2NjYzQ3MDIiLCJlbWFpbCI6InByZWV0aGlAZ21haWwuY29tIiwiaWF0IjoxNjMzODgzODk4LCJleHAiOjE2MzM4ODc0OTh9.dDBOuL2KR1XQUfOFQB2uF1R9rFQrKsMjc2ZoeA8faXk",
            "validity": 0,
            "specialMessage": null
        },
        "data": [
            {
                "_id": "6161490cda559b1e7f1f9b24",
                "singers": [
                    "Kim",
                    "cold play"
                ],
                "songTitle": "Universe",
                "album": "BTS"
            },
            {
                "_id": "6161490cda559b1e7f1f9b24",
                "singers": [
                    "Kim",
                    "cold play"
                ],
                "songTitle": "Universe",
                "album": "Morning Melodies"
            },
            {
                "_id": "6161496bb6e2fb1f030a083c",
                "singers": [
                    "Kim",
                    "Jin",
                    "Jungkook"
                ],
                "songTitle": "Idol"
            },
            {
                "_id": "6161499bd2a4461f3bf6ce94",
                "singers": [
                    "Kim",
                    "Jhope",
                    "RM"
                ],
                "songTitle": "Butter",
                "album": "Morning Melodies"
            }
        ],
        "status": {
            "code": 200,
            "status": "Success",
            "message": "Songs are listed successfully"
        }
    }

2(b). To search a song in the list: /api/list/songs?search="song name"  
    
    METHOD: GET

    BODY: none  

    PARAMS: search = id

    RESPONSE: {
        "session": {
            "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTYxNDYyYTIwYzJjYzE1N2NjYzQ3MDIiLCJlbWFpbCI6InByZWV0aGlAZ21haWwuY29tIiwiaWF0IjoxNjMzODc4OTI2LCJleHAiOjE2MzM4ODI1MjZ9.zG2BAxZCgwQVEUV2gwwiP7xi0sWcfjTfqVjJtUsbeuo",
            "validity": 0,
            "specialMessage": null
    },
    "data": [
        {
            "_id": "6161496bb6e2fb1f030a083c",
            "singers": [
                "Kim",
                "Jin",
                "Jungkook"
            ],
            "songTitle": "Idol"
        }
    ],
    "status": {
        "code": 200,
        "status": "Success",
        "message": "Songs are listed successfully"
    }
  }

3(a). To create a playlist: /api/playlist

    METHOD: POST

    BODY: {
      "name": "My play",
      "songIds": [{
          "songId": "6161490cda559b1e7f1f9b24"
        },
        {
          "songId": "6161496bb6e2fb1f030a083c"
        }
      ]
    }

    RESPONSE: {
        "session": {
            "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTYxNDYyYTIwYzJjYzE1N2NjYzQ3MDIiLCJlbWFpbCI6InByZWV0aGlAZ21haWwuY29tIiwiaWF0IjoxNjMzODc4OTI2LCJleHAiOjE2MzM4ODI1MjZ9.zG2BAxZCgwQVEUV2gwwiP7xi0sWcfjTfqVjJtUsbeuo",
            "validity": 0,
            "specialMessage": null
        },
        "data": {
            "_id": "616303b5b8c54967de30ca2c",
            "userId": "6161462a20c2cc157ccc4702",
            "songIds": [
                {
                    "date": "2021-10-10T15:15:20.710Z",
                    "_id": "616303b5b8c54967de30ca2d",
                    "songId": "6161490cda559b1e7f1f9b24"
                },
                {
                    "date": "2021-10-10T15:15:20.710Z",
                    "_id": "616303b5b8c54967de30ca2e",
                    "songId": "6161496bb6e2fb1f030a083c"
                }
            ],
            "name": "My play",
            "created_at": "2021-10-10T15:16:05.379Z",
            "updated_at": "2021-10-10T15:16:05.379Z"
        },
        "status": {
            "code": 200,
            "status": "Success",
            "message": "Song added to the play list successfully"
        }
    }

4(a). To update a playlist: /playlist

    METHOD: PUT

    BODY: {
        "name": "My playlist",
        "songIds": [
            {
                "songId": "6161499bd2a4461f3bf6ce94"
            }
        ]
    }

    RESPONSE: {
        "session": {
            "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTYxNDYyYTIwYzJjYzE1N2NjYzQ3MDIiLCJlbWFpbCI6InByZWV0aGlAZ21haWwuY29tIiwiaWF0IjoxNjMzODczNzQ2LCJleHAiOjE2MzM4NzczNDZ9._1nlnre8-WqM0_HS8vJTXV5gml9l7rRB3NaQVJCgHWE",
            "validity": 0,
            "specialMessage": null
        },
        "data": {
            "_id": "6162f4ba47c50254704308db",
            "userId": "6161462a20c2cc157ccc4702",
            "songIds": [
                {
                    "date": "2021-10-10T14:11:59.308Z",
                    "_id": "6162f4ba47c50254704308dc",
                    "songId": "6161490cda559b1e7f1f9b24"
                },
                {
                    "date": "2021-10-10T14:11:59.308Z",
                    "_id": "6162f4ba47c50254704308dd",
                    "songId": "6161496bb6e2fb1f030a083c"
                },
                {
                    "date": "2021-10-10T14:34:18.289Z",
                    "_id": "6162fa3ea2aabd5b53b3ea51",
                    "songId": "6161499bd2a4461f3bf6ce94"
                }
            ],
            "name": "My playlist",
            "created_at": "2021-10-10T14:12:10.958Z",
            "updated_at": "2021-10-10T14:35:42.681Z"
        },
        "status": {
            "code": 200,
            "status": "Success",
            "message": "Song added to the play list successfully"
        }
    }

5. To list the playlist(GET): /api/playlist

5(a). To list a particulate playlist of the user: /api/playlist?playlistId="playlistId"

5(b). To shuffle songs in playlist: /api/playlist?shuffle=true

    METHOD: GET

    BODY: none

    PARAMS: shuffle = true, playlistId = 6162f4ba47c50254704308db

    RESPONSE: {
        "session": {
            "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTYxNDYyYTIwYzJjYzE1N2NjYzQ3MDIiLCJlbWFpbCI6InByZWV0aGlAZ21haWwuY29tIiwiaWF0IjoxNjMzODczNzQ2LCJleHAiOjE2MzM4NzczNDZ9._1nlnre8-WqM0_HS8vJTXV5gml9l7rRB3NaQVJCgHWE",
            "validity": 0,
            "specialMessage": null
        },
        "data": [
            {
                "_id": "6162f4ba47c50254704308db",
                "playlist": "My playlist",
                "songs": [
                    {
                        "_id": "6161490cda559b1e7f1f9b24",
                        "singers": [
                            "Kim",
                            "cold play"
                        ],
                        "songTitle": "Universe",
                        "genre": "Melody",
                        "created_at": "2021-10-10T14:11:59.308Z"
                    },
                    {
                        "_id": "6161496bb6e2fb1f030a083c",
                        "singers": [
                            "Kim",
                            "Jin",
                            "Jungkook"
                        ],
                        "songTitle": "Idol",
                        "genre": "Rap",
                        "created_at": "2021-10-10T14:11:59.308Z"
                    },
                    {
                        "_id": "6161499bd2a4461f3bf6ce94",
                        "singers": [
                            "Kim",
                            "Jhope",
                            "RM"
                        ],
                        "songTitle": "Butter",
                        "genre": "Rap",
                        "created_at": "2021-10-10T14:34:18.289Z"
                    }
                ]
            }
        ],
        "status": {
            "code": 200,
            "status": "Success",
            "message": "Songs are listed successfully"
        }
    }