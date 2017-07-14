import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';

import NavBar from './nav-bar';
import InvisiblePlayAudio from './play-audio';

export class WhatIsThis extends React.Component {
    // playIntroChords, &c are lifted right out of PlayAudio component. If our
    // method of playing music changes, this functions will need updating, too.
    constructor(props) {
        super(props);
        this.playIntroChords = this.playIntroChords.bind(this);
        this.playIntroChordsAndPrompt = this.playIntroChordsAndPrompt.bind(this);
        this.playPrompt = this.playPrompt.bind(this);
        this.whatDoesItDo = (
            <div className="what-is-it-section">
              <h1 className="what-is-this-h">What does it do?</h1>
              <p>If you've played music, you've heard of the <em>I-IV-V</em> chord progression.</p>
              <p>Or maybe you've <a className="what-is-link" href="https://www.youtube.com/watch?v=oOlDewpCfZQ"
                                    target="_blank" rel="noopener noreferrer">
                                    seen the video on the ubiquitous I-IV-vi-V chord progression.</a></p>
              <p>This app teaches you to hear that <em>I-IV-V</em>... or <em>vii°</em>... <em>♭II</em> ...</p>
            </div>
        );

        this.howDoesItWork = (
            <div className="what-is-it-section">
              <h1 className="what-is-this-h">How does it work?</h1>
              <p>This explains the basic mechanics of the game&#8212;what you'll hear and why.</p>
              <p><em>If you're not sure what a "function ear trainer" is, check out the <span className="italic">Why This Game</span> section, below.</em></p>
              <p><em>First,</em> you'll hear a four chord intro (<em>I-IV-V-I</em>), which will unambiguously establish a key:</p>
              <div className="btn-container"><button className="what-is-this-btn" onClick={this.playIntroChords}>Press to hear the intro</button></div>
              <p><em>After a brief pause, you'll hear a fifth chord:</em> the actual, prompted question that you're to answer:</p>
              <div className="btn-container"><button className="what-is-this-btn" onClick={this.playPrompt}>Press to hear the prompt</button></div>
              <p><em>This is what it'll actually sound like, in-game:</em></p>
              <div className="btn-container"><button className="what-is-this-btn" onClick={this.playIntroChordsAndPrompt}>Press to hear the intro and prompt</button></div>
              <p><em>Now, you pick the roman numeral of the chord you've just heard.</em> It'll be hard, at first!</p>
            </div>
        );
        this.whyThisGame = (
            <div className="what-is-it-section" id="why">
              <h1 className="what-is-this-h">Why this game?</h1>
              <p>
                <a className="what-is-link" href="http://tonedear.com/ear-training/chord-identification"
                   target="_blank" rel="noopener noreferrer">Conventional chord training apps</a>
                &nbsp;are useful, but they have a problem: <em>They ignore musical context.</em>
              </p>
              <p>
                They have you identify chords based on their "chord quality"&#8212;<em>major, minor, diminished, add6, etc.</em>
              </p>
              <p>
                Again, <span className="italic">this is useful</span>, but we're ignoring part of how people actually hear music.
              </p>
              <p>
                When we listen to music, we automatically relate chords and notes to the context of a key (whether we know what a key is or not). A C&nbsp;major chord in the key of C&nbsp;Major sounds very different than a C&nbsp;Major chord in F#&nbsp;minor.
              </p>
              <p>
                <a className="what-is-link"href="http://www.harding.edu/gclayton/color/images/simultcontr/ch03%20perceiving%20color162.png"
                   target="_blank" rel="noopener noreferrer">Something very similar happens in the way we perceive color.</a>
              </p>
              <p>
                The <a className="what-is-link" href="https://www.youtube.com/watch?v=WZ6qEomjWM4"
                       target="_blank" rel="noopener noreferrer">I-IV-vi-V chord progression sounds familiar</a> precisely because of contextual hearing.
              </p>
              <p>
                Even though songs that use this progression aren't always (or even usually) in the same key, we still hear them as "the same," in some sense, <span className="italic">precisely</span> because our hearing is contextual.
              </p>
            </div>);
    }

    playIntroChords() {
        // This plays a chord progression (I-IV-V-I) to introduce
        // our key
        let timeOffset = 0;
        this.props.instrument.then(piano => {
            piano.stop();
            for (let chord of this.props.introChordSequence) {
                for (let i of chord) {
                    piano.play(i, this.props.ac.currentTime + timeOffset, {duration: 0.68});
                }
                timeOffset += 0.68;
            }
        });
    }

    playIntroChordsAndPrompt() {
        // This plays a chord progression (I-IV-V-I) to introduce our key and
        // then plays the question prompt (playPrompt())
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
        // This plays the actual "question" chord.
        this.props.instrument.then(piano => {
            for (let i of this.props.answer) {
                piano.play(i, this.props.ac.currentTime + timeOffset, {duration: 0.68});
            }
        });
    }

    componentDidMount() {
        this.props.dispatch(actions.startNewGame('easyMajor', true));
        this.current.focus();
    }

    render() {
        return (
            <div tabIndex="1" ref={(current) => this.current = current}>
              <NavBar parent="WhatIs"/>
              <div className="what-is-this">
                {this.whatDoesItDo}
                {this.howDoesItWork}
                {this.whyThisGame}
              </div>
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

export default connect(mapStateToProps)(WhatIsThis);
