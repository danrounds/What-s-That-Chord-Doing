import React from 'react';
import {connect} from 'react-redux';
import Vex from 'vexflow';

export class Staves extends React.Component {

    constructor(props) {
        super(props);
        this.drawMusic = this.drawMusic.bind(this);
        this.vf = null;
    }

    symbolToAccidental(note, symbol) {
        if (symbol === '#')
            return '#';
        else if (symbol === 'b') {
            if (note.length == 3)
                return 'bb';
            return 'b';
        } else
            return 'n';
    }

    getBassAccidental() {
        let note = this.props.notes.bass.split('/')[0];
        let symbol = (note[note.length - 1]);
        return this.symbolToAccidental(note, symbol);
    }

    getTrebleAccidental(i) {
        let note = this.props.notes.treble[i].split('/')[0];
        let symbol = (note[note.length - 1]);
        return this.symbolToAccidental(note, symbol);
    }

    drawMusic() {
        try {
            const staves = document.getElementById('staves');
            staves.removeChild(staves.childNodes[0]);
        } catch(err) { ;  }

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

        if (this.props.notes.treble.length) {

            const accidentalIndices = this.props.accidentals;
            let trebleNotes;
            let [i, j, k] = accidentalIndices.trebleIndices;

            switch(accidentalIndices.trebleIndices.length) {
            case 1:
                trebleNotes = [
                    new VF.StaveNote({clef: 'treble', keys: this.props.notes.treble, duration: 'w' })
                        .addAccidental(i, new VF.Accidental(this.getTrebleAccidental(i)))
                ];
                break;

            case 2:
                trebleNotes = [
                    new VF.StaveNote({clef: 'treble', keys: this.props.notes.treble, duration: 'w' })
                        .addAccidental(i, new VF.Accidental(this.getTrebleAccidental(i)))
                        .addAccidental(j, new VF.Accidental(this.getTrebleAccidental(j)))
                ];
                break;

            case 3:
                trebleNotes = [
                    new VF.StaveNote({clef: 'treble', keys: this.props.notes.treble, duration: 'w' })
                        .addAccidental(i, new VF.Accidental(this.getTrebleAccidental(i)))
                        .addAccidental(j, new VF.Accidental(this.getTrebleAccidental(j)))
                        .addAccidental(k, new VF.Accidental(this.getTrebleAccidental(k)))
                ];
                break;

            default:
                trebleNotes = [
                    new VF.StaveNote({clef: 'treble', keys: this.props.notes.treble, duration: 'w' }),
                ];
            }

            let bassNote;
            if (this.props.accidentals.bassAccidental) {
                bassNote = [
                    new VF.StaveNote({clef: 'bass', keys: [this.props.notes.bass], duration: 'w' })
                        .addAccidental(0, new VF.Accidental(this.getBassAccidental()))
                ];
            } else {
                bassNote = [
                    new VF.StaveNote({clef: 'bass', keys: [this.props.notes.bass], duration: 'w' })
                ];
            }
            
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

    componentWillReceiveProps() {
        let ans = this.props.answeredCorrectly;
        let ans2 = this.props.guessN;
        this.drawMusic();
        console.log(this.props);
        return ans + ans2;
    }

    componentWillUpdate() {
        this.drawMusic();
        console.log(this.props);
    }

    // componentDidMount() {
    //     this.drawMusic();
    //     console.log(this.props);
    // }

    render() {
        return (<div id="staves"></div>);
    }
}

const mapStateToProps = (state, props) => ({
    chord: state.chord,
    notes: Object.assign({}, {bass: state.notes.bass, treble: [...state.notes.treble]}),
    accidentals: Object.assign(
        {},
        {
            bassAccidental: state.accidentals.bassAccidental,
            trebleIndices: [...state.accidentals.trebleIndices]
        }
    ),
    keySignature: state.keyNameNotation,
    answeredCorrectly: state.answeredCorrectly
});

export default connect(mapStateToProps)(Staves);

