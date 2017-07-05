import React from 'react';
import {connect} from 'react-redux';

export class PlayAudio extends React.Component {
    // This component plays audio--when the buttons are pressed, when we advance
    // to a new question, and when the player has answered a question correctly
    constructor(props) {
        super(props);
        this.playPrompt = this.playPrompt.bind(this);
        this.playIntroChordsAndPrompt = this.playIntroChordsAndPrompt.bind(this);
        this.showKeyboardShortcuts = this.props.displayKeyboardShortcuts;
        // /\ this is kept as a "last state" variable, and compared to props
        // in the event that it changes
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
            this.playPrompt(null, null, 3.5);
        });
    }

    playPrompt(null_, null__, timeOffset=0) {
        // This plays the actual "question" chord. It also plays after the
        // player has made a correct guess.
        // Weird function signature is due to a quirk of our version of React,
        // in which superfluous (for our purposes) arguments are sent to
        // functions called by React with onClick. Documented: 
        // https://github.com/facebook/react/issues/8354
        this.props.instrument.then(piano => {
            for (let i of this.props.answer) {
                piano.play(i, this.props.ac.currentTime + timeOffset, {duration: 0.68});
            }
        });
    }

    playSounds() {
        if (!this.props.keyPress) {
            if (this.props.answeredCorrectly)
                this.playPrompt();
            else if (!this.props.guessN)
                this.playIntroChordsAndPrompt();
        } else if (this.props.keyPress === ',') {
            this.playIntroChordsAndPrompt();
        } else if (this.props.keyPress === '.') {
            this.playPrompt();
        }
    }

    componentDidMount() {
        this.playSounds();
    }

    componentDidUpdate() {
        if (this.showKeyboardShortcuts !== this.props.displayKeyboardShortcuts)
            this.showKeyboardShortcuts = this.props.displayKeyboardShortcuts;
        else
            this.playSounds();
    }

    render() {
        const miniKeyHintStyleDiv = {
            border: '1px solid green',
            borderRadius: '2px',
            backgroundColor: 'green',
            fontSize: '10px',
            fontWeight: 'bold',
            color:'white',
            margin: 'auto',
            width: '10px'
        };

        return (
            <div>
              <button onClick={this.playIntroChordsAndPrompt}>
                Play intro & chord again<br/>
                {this.props.displayKeyboardShortcuts ? <div style={miniKeyHintStyleDiv}>,</div> : null}
              </button>
              <button onClick={this.playPrompt}>
                Play chord again<br/>
                {this.props.displayKeyboardShortcuts ? <div style={miniKeyHintStyleDiv}>.</div> : null}
              </button>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    const processNotes = (val) => val.split('/').join('');
    let notes = state.notes;

    return {
        keyPress: state.keyValue,
        displayKeyboardShortcuts: state.displayKeyboardShortcuts,
        answer: notes.bass ? [notes.bass, ...notes.treble].map(
            processNotes) : [],
        introChordSequence: state.introChordSequence.map(
            (array) => array.map(processNotes)),
        guessN: state.guessN,
        answeredCorrectly: state.answeredCorrectly
    };
};

export default connect(mapStateToProps)(PlayAudio);