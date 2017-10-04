const _scoreTypes = ['easyMajor','easyMajorInv','easyMinor','easyMinorInv',
                    'intermediateMinor','intermediateMinorInv','hardMajor',
                    'hardMajorInv','hardMinor','hardMinorInv','allChords',
                    'allChordsInv'];

function _makeName(name=[], length=5) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
    for(let i = 0; i < length; i++) {
        name.push(possible[Math.floor(Math.random() * possible.length)]);
    }
    return name.join('');
}
const _makePassword = () => _makeName(undefined, 7);

function _makeScore() {
    const totalClicks = Math.floor(Math.random() * 300);
    const nAnsweredRight = Math.floor(Math.random() * 180) + 10;
    const nQuestionNumber = Math.floor(nAnsweredRight * 1.2) + 10;
    const winRatio = nAnsweredRight / nQuestionNumber;
    // /\ winRatio won't submit for PUT endpoints. The server takes care of that

    return { totalClicks, nAnsweredRight, nQuestionNumber, winRatio };
}

function generateAccount() {
    const scores = {};
    for (let el of _scoreTypes) {
        scores[el] = _makeScore();
    }
    return {
        name: _makeName(),
        password: _makePassword(),
        scores,
    };
}

function generateHighScores() {
    const scoreType = _scoreTypes[Math.floor(Math.random() * _scoreTypes.length)];
    const highScores = [];

    for (let i = 0; i < 30; i++) {
        let scores = {};
        scores[scoreType] = _makeScore();
        highScores.push({
            name: _makeName(),
            password: _makePassword(), // Our schema wants this, really badly
            scores,
        });
    }
    return highScores;
}

function generateReplacementScore() {
    const scores = {};
    const scoreType = _scoreTypes[Math.floor(Math.random() * _scoreTypes.length)];
    scores[scoreType] = _makeScore();
    return { scores };
}

module.exports = { generateAccount, generateReplacementScore, generateHighScores, };
