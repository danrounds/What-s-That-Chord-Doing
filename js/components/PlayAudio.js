import React from 'react';
import {connect} from 'react-redux';

export class PlayAudio extends React.Component {
    // This component plays audio--when the buttons are pressed, when we advance
    // to a new question, and when the player has answered a question correctly
    constructor(props) {
        super(props);
        this.replayPrompt = this.replayPrompt.bind(this);
        this.playIntroChordsAndPrompt = this.playIntroChordsAndPrompt.bind(this);
        this.showKeyboardShortcuts = this.props.displayKeyboardShortcuts;
        // /\ this is kept as a "last state" variable, and compared to props
        // in the event that it changes
    }

    componentDidMount() {
        this.playSounds();
    }

    shouldComponentUpdate(nextProps) {
        return ([',','.',' '].indexOf(nextProps.keyPress) !== -1)
            || this.props.questionNumber !== nextProps.questionNumber
            || this.props.gameNumber !== nextProps.gameNumber
            || this.props.displayKeyboardShortcuts !== nextProps.displayKeyboardShortcuts;
    }

    componentDidUpdate() {
        if (this.showKeyboardShortcuts !== this.props.displayKeyboardShortcuts)
            this.showKeyboardShortcuts = this.props.displayKeyboardShortcuts;
        else
            this.playSounds();
    }

    playIntroChordsAndPrompt() {
        // This plays a chord progression (I-IV-V-I or i-iv-V-i) to introduce
        // our key and then plays the question prompt
        let timeOffset = 0;

        // Prompt (I-IV-V-I)
        this.props.instrument.then(piano => {
            piano.stop();
            for (let chord of this.props.introChordSequence) {
                for (let i of chord) {
                    piano.play(i, this.props.ac.currentTime + timeOffset, {duration: 0.68});
                }
                timeOffset += 0.68;
            }
            // Question chord
            this.props.instrument.then(piano => {
                for (let i of this.props.answer) {
                    piano.play(i, this.props.ac.currentTime + timeOffset, {duration: 0.68});
                }
            });
        });
    }

    replayPrompt(null_, null__, timeOffset=0) {
        // This replays the actual "question" chord. It also plays after the
        // player has made a correct guess.
        // Weird function signature is due to a quirk of our version of React,
        // in which superfluous (for our purposes) arguments are sent to
        // functions called by React with onClick. Documented: 
        // https://github.com/facebook/react/issues/8354
        this.props.instrument.then(piano => {
            piano.stop();
            for (let i of this.props.answer) {
                piano.play(i, this.props.ac.currentTime + timeOffset, {duration: 0.68});
            }
        });
    }

    playSounds() {
        if (!this.props.keyPress) {
            if (this.props.answeredCorrectly)
                this.replayPrompt();
            else if (!this.props.guessN)
                this.playIntroChordsAndPrompt();
        } else if (this.props.keyPress === ',') {
            this.playIntroChordsAndPrompt();
        } else if (this.props.keyPress === '.') {
            this.replayPrompt();
        }
    }

    render() {
        return (
            <div className="play-audio-div">
              <button onClick={this.playIntroChordsAndPrompt}>
                Play intro & chord again<br/>
                {this.props.displayKeyboardShortcuts
                    && <div className="keyHint miniKeyHintDiv">,</div>}
              </button>
              <button onClick={this.replayPrompt}>
                Play chord again<br/>
                {this.props.displayKeyboardShortcuts
                    && <div className="keyHint miniKeyHintDiv">.</div>}
              </button>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    const processNotes = (val) => val.split('/').join('');
    let notes = state.game.notes;

    return {
        keyPress: state.game.keyValue,
        displayKeyboardShortcuts: state.game.displayKeyboardShortcuts,
        gameNumber: state.game.gameNumber,
        answer: notes.bass ? [notes.bass, ...notes.treble].map(
            processNotes) : [],
        introChordSequence: state.game.introChordSequence.map(
            (array) => array.map(processNotes)),
        guessN: state.game.guessN,
        answeredCorrectly: state.game.answeredCorrectly,
        questionNumber: state.game.questionNumber,
    };
};

export default connect(mapStateToProps)(PlayAudio);
