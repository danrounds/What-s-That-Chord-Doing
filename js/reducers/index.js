import * as actions from '../actions/';
import chordGetter from '../music-logic/';

const initialState = {
    chord: '',
    notes: { bass: null, treble: [] },
    keyNameNotation: 'C'
};


export const reducer = (state=initialState, action) => {

    switch(action.type) {
    case actions.START_NEW_GAME:
        // console.log(chordGetter);

        var {keyNameReadable, keyNameNotation} = chordGetter.init('all');
        var {currentChordNumeral, bassNote, trebleNotes, accidentals} = chordGetter.getChord();
        // using `var`, because we're using the same variables repeatedly in
        // this switch block, and the object destructuring syntax requires a
        // let/const/var prefix. This is the only one that will work.
        // console.log(currentChordNumeral);

        return {
            // keyNameReadable,
            keyNameNotation,
            chord: currentChordNumeral,
            notes: {bass: bassNote, treble: trebleNotes},
            accidentals
        };

    case actions.COMPARE_TO_ACTUAL:
        // console.log(action.guess);

        var {currentChordNumeral, bassNote, trebleNotes, accidentals} = chordGetter.getChord();
        // console.log(currentChordNumeral);
        // console.log(trebleNotes);
        // console.log('key ::: '+state.keyNameNotation);

        return {
            // keyNameReadable: state.keyNameReadable,
            keyNameNotation: state.keyNameNotation,
            chord: currentChordNumeral,
            notes: {bass: bassNote, treble: trebleNotes},
            accidentals
        };

    case actions.GET_NEXT_QUESTION:
        var {currentChordNumeral, bassNote, trebleNotes, accidentals} = chordGetter.getChord();
        return {
            // keyNameReadable: state.keyNameReadable,
            keyNameNotation: state.keyNameNotation,
            chord: currentChordNumeral,
            // notes: trebleNotes,
            notes: {bass: bassNote, treble: trebleNotes},
            accidentals
        };

    default:
        // console.log('we here');
        return state;
    }


};

