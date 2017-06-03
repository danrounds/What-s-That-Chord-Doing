import React from 'react';
import {connect} from 'react-redux';
import Vex from 'vexflow';

export class Staves extends React.Component {
    constructor(props) {
        super(props);
        this.drawMusic = this.drawMusic.bind(this);
    }

    deleteCanvas() {
        try {
            const staves = document.getElementById('staves');
            staves.removeChild(staves.childNodes[0]);
        } catch(err) { ; }
    }

    drawMusic() {
        this.deleteCanvas();

        const VF = Vex.Flow;
        const div = document.getElementById('staves');
        const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

        // Configure the rendering context.
        renderer.resize(500, 300);

        const context = renderer.getContext();
        context.setFont('Arial', 10, '').setBackgroundFillStyle('eed');

        // Create a stave of width 400 at position 10, 40 on the canvas.
        const treble = new VF.Stave(10, 40, 400);
        treble.addClef('treble').addKeySignature(this.props.keySignature);
        treble.setContext(context).draw();

        const bass = new VF.Stave(10, 145, 400);
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
                    .addAccidental(i, new VF.Accidental(this.getAccidental(0)))
                    .addAccidental(j, new VF.Accidental(this.getAccidental(1)))
                    .addAccidental(k, new VF.Accidental(this.getAccidental(2)))
            ];

        default:
            return [
                new VF.StaveNote({clef: 'treble', keys: this.props.notes.treble, duration: 'w' }),
            ];
        }
    }

    getAccidental(i) {
        const notes = i ?  this.props.notes.treble[i] : this.props.notes.bass;
        const note = notes.split('/')[0];
        const symbol = (note[note.length - 1]);

        return function(symbol, note) {
            return { '#':'#', 'b': note.length === 3 ? 'bb' : 'b' }[symbol] || 'n';
        }(symbol, note);
    }

    componentDidUpdate() {
        this.drawMusic();
    }

    render() {
        return (<div id="staves"></div>);
    }
}

const mapStateToProps = (state, props) => ({
    notes: state.notes,
    accidentals: state.accidentals,
    keySignature: state.keyNameNotation,
    answeredCorrectly: state.answeredCorrectly
});

export default connect(mapStateToProps)(Staves);

