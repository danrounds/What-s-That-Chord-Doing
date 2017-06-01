import React from 'react';
import {connect} from 'react-redux';
import Soundfont from 'soundfont-player';

const ac = new AudioContext();

export class Audio extends React.Component {
    constructor(props) {
        super(props);
        this.playSounds = this.playSounds.bind(this);
        this.instrument = Soundfont.instrument(ac, 'acoustic_grand_piano');
        // this.notes = this.processNotes();
    }

    playSounds() {
        this.instrument.then(piano => {
            for (let i of this.props.notes) {
                piano.play(i).stop(ac.currentTime + 0.68);
            }
        });
    }
    componentDidUpdate() {
        if (!this.props.guessN || this.props.answeredCorrectly)
            this.playSounds();
    }

    render() {
        return (<button onClick={this.playSounds}>Play audio again</button>);
    }
}

const mapStateToProps = (state, props) => {
    let notes;
    if (state.notes.bass === null || state.notes.treble === []) {
        notes = [];
    } else {
        notes = state.notes.treble.map((val) => val.split('/').join(''));
        notes.unshift(state.notes.bass.split('/').join(''));
    }

    return {
        notes,
        guessN: state.guessN,
        answeredCorrectly: state.answeredCorrectly
    };
};

export default connect(mapStateToProps)(Audio);
