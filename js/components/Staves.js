import React from 'react';
import {connect} from 'react-redux';
import Vex from 'vexflow';

export class Staves extends React.Component {
    // This is the music-notation display component.
    //
    // This is the ugliest of our components; VexFlow is very "low level",
    // in terms of the abstractions it uses for representing musical objects.
    // The code here has to wrangle with that complexity.
    constructor() {
        super();
        this.drawMusic = this.drawMusic.bind(this);
    }

    componentDidMount() {
        this.drawMusic();
    }

    shouldComponentUpdate(nextProps) {
        return !nextProps.guessN || nextProps.answeredCorrectly;
    }

    componentDidUpdate() {
        this.drawMusic();
    }

    deleteCanvas() {
        try {
            const staves = document.getElementById('staves');
            staves.removeChild(staves.childNodes[0]);
        } catch(err) {;}        // Can't remove something if it doesn't exist
    }

    drawMusic() {
        this.deleteCanvas();

        const VF = Vex.Flow;
        const div = this.stavesDiv;
        const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

        // Configure the rendering context.
        renderer.resize(500, 220);

        const context = renderer.getContext();
        context.setFont('Arial', 10, '').setBackgroundFillStyle('eed');

        // Create a stave of width 400 at position 0, 0 (x, y) on the canvas.
        const treble = new VF.Stave(0, 20, 400);
        treble.addClef('treble').addKeySignature(this.props.keySignature);
        treble.setContext(context).draw();

        const bass = new VF.Stave(0, 125, 400);
        bass.addClef('bass').addKeySignature(this.props.keySignature);
        bass.setContext(context).draw();

        if (this.props.answeredCorrectly) {            
            const trebleNotes = this.defineTrebleNotes(VF);
            const bassNote = this.defineBassNote(VF);

            const trebleVoice = new VF.Voice({num_beats: 1,  beat_value: 1});
            const bassVoice = new VF.Voice({num_beats: 1,  beat_value: 1});
            trebleVoice.addTickables(trebleNotes);
            bassVoice.addTickables(bassNote);

            // Format and justify the notes to 400 pixels.
            const formatter = new VF.Formatter().joinVoices([trebleVoice]).format([trebleVoice], 400);
            const formatter2 = new VF.Formatter().joinVoices([bassVoice]).format([bassVoice], 400);

            // Render voices
            trebleVoice.draw(context, treble);
            bassVoice.draw(context, bass);
        }
    }

    defineBassNote(VF) {
        // This defines our bass note and accompanying accidental (if
        // applicable)
        if (this.props.accidentals.bassAccidental) {
            return [
                new VF.StaveNote({clef: 'bass', keys: [this.props.notes.bass], duration: 'w' })
                    .addAccidental(0, new VF.Accidental(this.getAccidental()))
            ];
        } else {
            return [
                new VF.StaveNote({clef: 'bass', keys: [this.props.notes.bass], duration: 'w' })
            ];
        }
    }

    defineTrebleNotes(VF) {
        // This defines our treble notes and accompanying accidentals (if
        // applicable)
        const accidentalIndices = this.props.accidentals;
        let [i, j, k] = accidentalIndices.trebleIndices;

        switch(accidentalIndices.trebleIndices.length) {
        case 1:
            return [
                new VF.StaveNote({clef: 'treble', keys: this.props.notes.treble, duration: 'w' })
                    .addAccidental(i, new VF.Accidental(this.getAccidental(i)))
            ];

        case 2:
            return  [
                new VF.StaveNote({clef: 'treble', keys: this.props.notes.treble, duration: 'w' })
                    .addAccidental(i, new VF.Accidental(this.getAccidental(i)))
                    .addAccidental(j, new VF.Accidental(this.getAccidental(j)))
            ];

        case 3:
            return [
                new VF.StaveNote({clef: 'treble', keys: this.props.notes.treble, duration: 'w' })
                    .addAccidental(i, new VF.Accidental(this.getAccidental(i)))
                    .addAccidental(j, new VF.Accidental(this.getAccidental(j)))
                    .addAccidental(k, new VF.Accidental(this.getAccidental(k)))
            ];

        default:
            return [
                new VF.StaveNote({clef: 'treble', keys: this.props.notes.treble, duration: 'w' }),
            ];
        }
    }

    getAccidental(i) {
        const notes = i !== undefined ? this.props.notes.treble[i] : this.props.notes.bass;
        const note = notes.split('/')[0];
        const symbol = (note[note.length - 1]);

        return function(symbol, note) {
            return { '#':'#', 'b': note.length === 3 ? 'bb' : 'b' }[symbol] || 'n';
        }(symbol, note);
    }

    render() {
        return (<div ref={(div) => this.stavesDiv = div} id="staves"></div>);
    }
}

const mapStateToProps = (state) => ({
    notes: state.game.notes,
    accidentals: state.game.accidentals,
    keySignature: state.game.keyNameNotation,
    guessN: state.game.guessN,
    answeredCorrectly: state.game.answeredCorrectly
});

export default connect(mapStateToProps)(Staves);
