import React from 'react';
import {connect} from 'react-redux';
import Soundfont from 'soundfont-player';

export class Audio extends React.Component {
    // This component plays audio--when the button is pressed, when we advance
    // to a new question, and when the player has answered a question correctly
    constructor(props) {
        super(props);
        this.playPrompt = this.playPrompt.bind(this);
        this.playIntroChordsAndPrompt = this.playIntroChordsAndPrompt.bind(this);
    }

    playIntroChordsAndPrompt() {
        // This plays a chord progression (I-IV-V-I or i-iv-V-i) to introduce
        // our key and then plays the question prompt (playPrompt())
        let timeOffset = 0;
        this.props.instrument.then(piano => {
            piano.stop();
            for (let chord of this.props.introChordSequence) {
                for (let i of chord) {
                    piano.play(i, this.props.ac.currentTime + timeOffset, {duration: 0.68});
                }
                timeOffset += 0.68;
            }
            this.playPrompt(3.5);
        });
    }

    playPrompt(timeOffset=0) {
        // This plays the actual "question" chord. It also plays after the
        // player has made a correct guess
        this.props.instrument.then(piano => {
            for (let i of this.props.answer) {
                piano.play(i, this.props.ac.currentTime + timeOffset, {duration: 0.68});
            }
        });
    }

    playSounds() {
        if (this.props.answeredCorrectly)
            this.playPrompt();
        else if (!this.props.guessN)
            this.playIntroChordsAndPrompt();
    }

    componentDidMount() {
        this.playSounds();
    }

    componentDidUpdate() {
        this.playSounds();
    }

    render() {
        return (<button onClick={this.playIntroChordsAndPrompt}>Play audio again
                </button>);
    }
}

const mapStateToProps = (state, props) => {
    const processNotes = (val) => val.split('/').join('');
    let notes = state.notes;

    return {
        answer: notes.bass ? [notes.bass, ...notes.treble].map(
            processNotes) : [],
        introChordSequence: state.introChordSequence.map(
            (array) => array.map(processNotes)),
        guessN: state.guessN,
        answeredCorrectly: state.answeredCorrectly
    };
};

export default connect(mapStateToProps)(Audio);
