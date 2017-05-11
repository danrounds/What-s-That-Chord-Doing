import React from 'react';
import {connect} from 'react-redux';
import Vex from 'vexflow';

export class Staves extends React.Component {

    constructor(props) {
        super(props);
        this.drawMusic = this.drawMusic.bind(this);
        this.vf = null;
    }

    getAccidental(i) {
        let note = this.props.notes[i].split('/')[0];
        let symbol = (note[note.length - 1]);
        if (symbol === '#')
            return '#';
        else if (symbol === 'b')
            return 'b';
        else
            return 'n';
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

        if (this.props.notes.length) {
            const keyManager = new VF.KeyManager(this.props.keySignature);

            const trebleNotes = [
                new VF.StaveNote({clef: 'treble', keys: ['Eb/3', 'G/3', 'Bb/3'], duration: 'w' }),
            ];

            // const trebleNotes = [
            //     new VF.StaveNote({clef: 'treble', keys: this.props.notes , duration: 'w' }),
            // ];

            const accidentalIndices = this.props.accidentals;
            let bassNotes;
            let [i, j, k] = accidentalIndices;
            switch(accidentalIndices.length) {

            case 1:
                bassNotes = [
                    new VF.StaveNote({clef: 'bass', keys: this.props.notes, duration: 'w' })
                        .addAccidental(i, new VF.Accidental(this.getAccidental(i)))
                ];
                break;

            case 2:
                bassNotes = [
                    new VF.StaveNote({clef: 'bass', keys: this.props.notes, duration: 'w' })
                        .addAccidental(i, new VF.Accidental(this.getAccidental(i)))
                        .addAccidental(j, new VF.Accidental(this.getAccidental(j)))
                ];
                break;

            case 3:
                bassNotes = [
                    new VF.StaveNote({clef: 'bass', keys: this.props.notes, duration: 'w' })
                        .addAccidental(0, new VF.Accidental(this.getAccidental(i)))
                        .addAccidental(1, new VF.Accidental(this.getAccidental(j)))
                        .addAccidental(2, new VF.Accidental(this.getAccidental(k)))
                ];
                break;

            default:
                bassNotes = [
                    new VF.StaveNote({clef: 'bass', keys: this.props.notes, duration: 'w' }),
                ];
            }

            const trebleVoice = new VF.Voice({num_beats: 1,  beat_value: 1});
            const bassVoice = new VF.Voice({num_beats: 1,  beat_value: 1});
            trebleVoice.addTickables(trebleNotes);
            bassVoice.addTickables(bassNotes);

            // Format and justify the notes to 400 pixels.
            const formatter = new VF.Formatter().joinVoices([trebleVoice]).format([trebleVoice], 400);
            const formatter2 = new VF.Formatter().joinVoices([bassVoice]).format([bassVoice], 400);

            // Render voices
            trebleVoice.draw(context, treble);
            bassVoice.draw(context, bass);
        }
    }

    componentWillReceiveProps() {
        this.drawMusic();
    }

    componentDidMount() {
        this.drawMusic();
    }

    render() {
        return (<div id="staves"></div>);
    }
}

const mapStateToProps = (state, props) => ({
    chord: state.chord,
    notes: state.notes,
    accidentals: state.accidentalIndices,
    keySignature: state.keyNameNotation
});

export default connect(mapStateToProps)(Staves);
