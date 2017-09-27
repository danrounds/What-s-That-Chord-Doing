import apiReducer from '../apiReducer';
import * as actions from '../../actions/apiActions';

const initialState = {
    authToken: null,
    name: 'null',
    highScores: [],
    lastHighScoreAccessed: null,
    myScores: {},
    error: null,
    pending: null,
};

const myScores = {
    'name': 'joey',
    'scores': {
        'allChordsInv': {
            'totalClicks': 33,
            'nAnsweredRight': 13,
            'nQuestionNumber': 20,
            'winRatio': 0.3
        },
        'easyMajor': {
            'totalClicks': 22,
            'nAnsweredRight': 14,
            'nQuestionNumber': 20,
            'winRatio': 0.4
        }
    }
};

const highScores = [
    {
        'name': 'seofij',
        'scores': {
            'intermediateMinor': {
                'totalClicks': 4127,
                'nAnsweredRight': 210,
                'nQuestionNumber': 1000,
                'winRatio': 1
            }
        }
    },
    {
        'name': 'jake',
        'scores': {
            'intermediateMinor': {
                'totalClicks': 123466,
                'nAnsweredRight': 1245,
                'nQuestionNumber': 1291,
                'winRatio': 0.9612403100775194
            }
        }
    },
    {
        'name': 'aseos25DSDfj_',
        'scores': {
            'intermediateMinor': {
                'totalClicks': 433,
                'nAnsweredRight': 90,
                'nQuestionNumber': 100,
                'winRatio': 0.9
            }
        }
    }
];

const stateWithScores = {
    name: 'joey',
    lastHighScoreAccessed: 'hardMajor',
    pending: false,
    error: false,
    myScores: {
        'name': 'joey',
        'scores': {
            'allChordsInv': {
                'totalClicks': 22,
                'nAnsweredRight': 3,
                'nQuestionNumber': 10,
                'winRatio': 0.3
            },
            'easyMajor': {
                'totalClicks': 12,
                'nAnsweredRight': 4,
                'nQuestionNumber': 10,
                'winRatio': 0.4
            }
        }
    },

    highScores: [
        {
            'name': 'ijijijij',
            'scores': {
                'intermediateMinor': {
                    'totalClicks': 47,
                    'nAnsweredRight': 10,
                    'nQuestionNumber': 10,
                    'winRatio': 1
                }
            }
        },
        {
            'name': 'bobby4',
            'scores': {
                'intermediateMinor': {
                    'totalClicks': 12346,
                    'nAnsweredRight': 124,
                    'nQuestionNumber': 129,
                    'winRatio': 0.9612403100775194
                }
            }
        },
        {
            'name': 'aseofj_',
            'scores': {
                'intermediateMinor': {
                    'totalClicks': 43,
                    'nAnsweredRight': 9,
                    'nQuestionNumber': 10,
                    'winRatio': 0.9
                }
            }
        }
    ]
};

describe('apiReducer -- the syncronous bits', () => {
    let state;
    beforeEach(() => state = apiReducer(initialState, {}));

    it('should have a consistent initial state', () => {
        expect(state).toMatchSnapshot();
    });

    // log-in/log-off actions:
    it('should pend while we wait for log-in status', () => {
        state = apiReducer(initialState, actions.logInPending());
        expect(state).toMatchSnapshot();
    });

    it('should tell us when login-in succeeds', () => {
        state = apiReducer(initialState, actions.logInSuccess('jerry', 'some_string_of_token_or_other2DFS3'));
        expect(state).toMatchSnapshot();
    });

    it('should tell us when login-in fails', () => {
        state = apiReducer(initialState, actions.logInFailure(401));
        expect(state).toMatchSnapshot();
    });

    it('should log off', () => {
        state = apiReducer(stateWithScores, actions.logOff());
        expect(state).toMatchSnapshot();
    });


    // GET my-scores actions:
    it('should pend while we wait to GET my-scores', () => {
        state = apiReducer(stateWithScores, actions.getMyScoresPending());
        expect(state).toMatchSnapshot();
    });

    it('should tell us when we successfully GET my-scores', () => {
        state = apiReducer(stateWithScores, actions.getMyScoresSuccess(myScores));
        expect(state).toMatchSnapshot();
    });

    it('should tell us when we fail to GET my-scores', () => {
        state = apiReducer(stateWithScores, actions.getMyScoresFailure('here\'s an error'));
        expect(state).toMatchSnapshot();
    });


    // PUT my-scores actions:
    it('should tell us when we PUT our updated scores', () => {
        state = apiReducer(stateWithScores, actions.updateMyScoresSuccess());
        expect(state).toMatchSnapshot();
    });

    it('should tell us when we fail to PUT our updated scores', () => {
        state = apiReducer(stateWithScores, actions.updateMyScoresFailure(400));
        expect(state).toMatchSnapshot();
    });


    // GET high-scores actions:
    it('should pend while we wait to GET high-scores', () => {
        state = apiReducer(stateWithScores, actions.getHighScoresPending());
        expect(state).toMatchSnapshot();
    });

    it('should tell us when we successfully GET high-scores', () => {
        state = apiReducer(stateWithScores, actions.getHighScoresSuccess(highScores, 'easyMajor'));
        expect(state).toMatchSnapshot();
    });

    it('should tell us when we fail to GET high-scores', () => {
        state = apiReducer(stateWithScores, actions.getHighScoresFailure(500));
        expect(state).toMatchSnapshot();
    });

    // POST register actions (account creation):
    it('should pend while we wait on account creation (POST)', () => {
        state = apiReducer(initialState, actions.makeUserAccountPending());
        expect(state).toMatchSnapshot();
    });

    it('should tell us when successfully make an account (POST)', () => {
        state = apiReducer(initialState, actions.makeUserAccountSuccess('franklin3', 'auth_token_goes_here'));
        expect(state).toMatchSnapshot();
    });

    it('should tell us when fail to make an account (POST)', () => {
        state = apiReducer(initialState, actions.makeUserAccountFailure(409));
        expect(state).toMatchSnapshot();
    });

    // no CHANGE_PASSWORD* endpoints, but we haven't incorporated that functionality into the client

});
