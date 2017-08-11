import fetch from 'isomorphic-fetch';
import btoa from 'btoa';   // delete this

const accountsUrl = 'http://localhost:8081/accounts/';
const userScoreUrl = 'http://localhost:8081/my-scores/';
const highScoreUrl = 'http://localhost:8081/high-scores/';
const scores_ = {                // delete, once you have tests
    scores: {
        intermediateMinor: {
			      totalClicks: 1234,
			      nAnsweredRight: 124,
			      nQuestionNumber: 127,
        }
    }
};

function getReqUserScores(name='joel27', password='abc123') {
    return fetch(userScoreUrl, {
        headers: { Authorization: 'Basic '+ btoa(name + ':' + password)}
    })
        .then(response => response.json());
}

function putReqUserScores(name='joel27', password='abc123', scores=scores_) {
    return fetch(userScoreUrl, {
        method: 'PUT',
        headers: {
            Authorization: 'Basic '+ btoa(name + ':' + password),
            'Content-type': 'application/json',
        },
        body: JSON.stringify(scores)
    })
        .then(response => response);
}

function getReqHighScores(gameType='intermediateMinor') {
    return fetch(highScoreUrl+gameType)
        .then(response => response.json());
}

//////

function postReqAccount(name='joel29', password='abc123') {
    return fetch(accountsUrl, {
        method: 'POST',
        headers: {
            Authorization: 'Basic '+ btoa(name + ':' + password),
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ name, password })
    })
        .then(response => response);
}

function putReqAccountPassword(name='joel29', password='abc123') {
    return fetch(accountsUrl, {
        method: 'PUT',
        headers: {
            Authorization: 'Basic '+ btoa(name + ':' + password),
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ name, password })
    })
        .then(response => response);
}

function deleteReqAccount(name='joel29', password='abc123') {
    return fetch(accountsUrl+name, {
        method: 'DELETE',
        headers: {
            Authorization: 'Basic '+ btoa(name + ':' + password),
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ name })
    })
        .then(response => response)
        .then(___ => console.log(___.ok));
}

export { getReqUserScores, getReqHighScores, postReqAccount,
         putReqUserScores, putReqAccountPassword, deleteReqAccount };
