# What's That Chord Doing API

## General info

Our endpoints send and receive account- and scores-related data.

Endpoints accept and return JSON as request data. Authenticated endpoints want [JSON Web Tokens](https://jwt.io/introduction/), which our [`POST /accounts/register`](#post-accountsregister) and [`POST /accounts/log-in`](#post-accountslog-in) endpoints return to us.

### Request data types:

#### `gameType` is one of the following:
        
    "easyMajor", "easyMajorInv", "easyMinor", "easyMinorInv", "intermediateMinor",
    "intermediateMinorInv", "hardMajor", "hardMajorInv", "hardMinor", "hardMinorInv", 
    "allChords", "allChordsInv"

#### `score` takes the form:
```javascript
{
    "name": {String},
    "scores": {
        gameType: {
            "totalClicks": {Number},
            "nAnsweredRight": {Number},
            "nQuestionNumber": {Number},
            *"winRatio": {Number}
        }
    }
}
```

##### `name`s are letters, numbers, and underscores

##### `password`s are at least six characters in length

__*We don't include `winRatio` in `PUT` requests; it's calculated by the server and returned by GET requests__

----------------------------------------------------------------------------

## Accounts endpoints

### GET /accounts

Returns all the (non-password) data associated with an account. [Data is of type `score`.](#score-takes-the-form) Identical to [`GET /my-scores` endpoint](#get-my-scores)

__Authenticated__

__success__ => `score`, `200` status

__error__ => `404`, `401`, `500` status code

### POST /accounts/log-in

Log in endpoint; (obviously) for existing accounts.

__request body__ => `{ "name": {String}, "password": {String} }`

__success__ => JWT token, `201` status code

__error__ => `404`, `401`, `500` status code

### POST /accounts/register

Creates an [account](#names-are-letters-numbers-and-underscores) and returns the relevant JWT.

__request body__ => `{ "name": {String}, "password": {String} }`

__success__ => JWT token, `200` success

__error__ => `400`, `409`, `500` status code

### PUT /accounts/change-password

Change an account [password](#passwords-are-at-least-six-characters-in-length).

__Authenticated__

__request body__ => `{ "name": {String}, "newPassword": {String} }`

__success__ => `204` status code

__error__ => `400`, `500` status code

### DELETE /accounts

Deletes an account and associated data.

__Authenticated__

__success__ => `200` status

__error__ `404`, `500` status

----------------------------------------------------------------------------

## Scores endpoints

### GET /my-scores

Returns all the (non-password) data associated with an account. [Data is of type `score`.](#score-takes-the-form) Identical to [`GET /accounts` endpoint](#get-accounts)

__Authenticated__

__success__ => `score`, `200` status

__error__ => `404`, `401`, `500` status code

### PUT /my-scores

Updates a [specific `gameType`'s](#gametype-is-one-of-the-following) scores'. Submit only one `gameType`, at once.

__Authenticated__

__body__ => [`score`, with updated data](#score-takes-the-form)

__success__ => `200` status code

__error__ => `400`, `304`, `500` status code

### GET /high-scores/:gameType

__success__ => an [array of `score`s](#score-takes-the-form) of the [given `:gameType`](#gametype-is-one-of-the-following), ordered by win percentage.

__error__ => `500` status

-DR, 2017
