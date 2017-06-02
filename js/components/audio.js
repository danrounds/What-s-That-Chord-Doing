import React from 'react';
import {connect} from 'react-redux';
import Soundfont from 'soundfont-player';

const ac = new AudioContext();

export class Audio extends React.Component {
    constructor(props) {
        super(props);
        this.playPrompt = this.playPrompt.bind(this);
        this.playIntroChordsAndPrompt = this.playIntroChordsAndPrompt.bind(this);
        this.instrument = Soundfont.instrument(ac, 'acoustic_grand_piano');
    }

    playIntroChordsAndPrompt() {
        let timeOffset = 0;
        console.log('we are we here, now?');
        console.log(this.props.answeredCorrectly);
        console.log(!this.props.guessN);
        this.instrument.then(piano => {
            for (let chord of this.props.introChordSequence) {
                for (let i of chord) {
                    piano.play(i, ac.currentTime + timeOffset, {duration: 0.68});
                }
                timeOffset += 0.68;
            }
            this.playPrompt(3.5);
        });
    }

    playPrompt(timeOffset=0) {
        this.instrument.then(piano => {
            for (let i of this.props.answer) {
                // piano.play(i).stop(ac.currentTime + 0.68);
                piano.play(i, ac.currentTime + timeOffset, {duration: 0.68});

            }
        });

    }

    componentDidUpdate() {
        if (this.props.answeredCorrectly) {
            this.playPrompt();
        } else if (!this.props.guessN) {
            this.playIntroChordsAndPrompt();
        }
    }

    render() {
        return (<button onClick={this.playIntroChordsAndPrompt}>Play audio again</button>);
    }
}

const mapStateToProps = (state, props) => {
    const processNotes = (val) => val.split('/').join('');

    let notes = state.notes;
    if (notes.bass === null || notes.treble === []) {
        notes = [];
    } else {
        notes = [notes.bass, ...notes.treble].map(processNotes);
    }

    return {
        answer: notes,
        introChordSequence: state.introChordSequence.map(
            (array) => array.map(processNotes)),
        guessN: state.guessN,
        answeredCorrectly: state.answeredCorrectly
    };
};

export default connect(mapStateToProps)(Audio);
