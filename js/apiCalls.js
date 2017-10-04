import fetch from 'isomorphic-fetch';

const url = window.location.origin;
const accountsUrl = url+'/accounts/';
const userScoreUrl = url+'/my-scores/';
const highScoreUrl = url+'/high-scores/';

function testResponse(response) {
    if (response.ok)
        return response.json();
    else
        throw response.status;
}

function postReqLogIn(name, password) {
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

function getReqUserScores(token) {
    return fetch(userScoreUrl, { headers: { Authorization: 'Bearer '+ token } })
        .then(response => testResponse(response));
}

function putReqUserScores(token, scores) {
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

function getReqHighScores(gameType) {
    return fetch(highScoreUrl+gameType)
        .then(response => testResponse(response));
}

//////

function postReqAccount(name, password) {
    const payload = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
    };
    return fetch(accountsUrl+'register', payload)
        .then(response => testResponse(response));
}

function putReqAccountPassword(token, name, password) {
    const payload = {
        method: 'PUT',
        headers: {
            Authorization: 'Bearer '+ token,
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
    };
    return fetch(accountsUrl+'change-password', payload)
        .then(response => testResponse(response));
}

function deleteReqAccount(token, name, password) {
    const payload = {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer '+ token,
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ name }),
    };
    return fetch(accountsUrl, payload)
        .then(response => testResponse(response));
}

export { postReqLogIn, getReqUserScores, getReqHighScores, postReqAccount,
         putReqUserScores, putReqAccountPassword, deleteReqAccount };
