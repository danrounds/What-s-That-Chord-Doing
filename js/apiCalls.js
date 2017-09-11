import fetch from 'isomorphic-fetch';
import btoa from 'btoa';   // delete this

const token_ = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU5YjVmMGY0MjhmYTE3MWRiNzg4MzgyMCJ9.yalTBvUlq6paFLdaD1JLbixHmIzutA-N8Tin9Ez17cA';
const accountsUrl = 'http://localhost:8081/accounts/';
const userScoreUrl = 'http://localhost:8081/my-scores/';
const highScoreUrl = 'http://localhost:8081/high-scores/';
const scores_ = {                // delete, once you have tests
    scores: {
        intermediateMinor: {
			      totalClicks: 12346,
			      nAnsweredRight: 124,
			      nQuestionNumber: 129,
        }
    }
};

function testResponse(response) {
    if (response.ok)
        return response.json();
    else
        throw response.status;
}

function postReqLogIn(name='bobby4', password='abc123') {
    const payload = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
    };
    return fetch(accountsUrl+'log-in', payload)
        .then(response => testResponse(response));
}

function getReqUserScores(token=token_) {
    return fetch(userScoreUrl, { headers: { Authorization: 'Bearer '+ token } })
        .then(response => testResponse(response));
}

function putReqUserScores(token=token_, scores=scores_) {
    const payload = {
        method: 'PUT',
        headers: {
            Authorization: 'Bearer '+ token,
            'Content-type': 'application/json',
        },
        body: JSON.stringify(scores),
    };
    return fetch(userScoreUrl, payload)
        .then(response => testResponse(response));
}

function getReqHighScores(gameType='intermediateMinor') {
    return fetch(highScoreUrl+gameType)
        .then(response => testResponse(response));
}

//////

function postReqAccount(name='bobby4', password='abc123') {
    const payload = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
    };
    return fetch(accountsUrl, payload)
        .then(response => testResponse(response));
}

function putReqAccountPassword(token=token_, name='bobby4', password='abc123') {
    const payload = {
        method: 'PUT',
        headers: {
            Authorization: 'Bearer '+ token,
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
    };
    return fetch(accountsUrl, payload)
        .then(response => testResponse(response));
}

function deleteReqAccount(token=token_, name='bobby4', password='abc123') {
    const payload = {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer '+ token,
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ name }),
    };
    return fetch(accountsUrl+name, payload)
        .then(response => testResponse(response));
}

export { postReqLogIn, getReqUserScores, getReqHighScores, postReqAccount,
         putReqUserScores, putReqAccountPassword, deleteReqAccount };
