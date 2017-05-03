import React from 'react';
import {connect} from 'react-redux';
import Vex from 'vexflow';

export class Staves extends React.Component {

    constructor(props) {
        super(props);
        this.drawMusic = this.drawMusic.bind(this);
        this.vf = null;
    }

    drawMusic() {
        try {
            const staves = document.getElementById('staves');
            staves.removeChild(staves.childNodes[0]);
        } catch(err) { ;  }

        const VF = Vex.Flow;
        var div = document.getElementById("staves");
        var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

        // Configure the rendering context.
        renderer.resize(500, 300);
        var context = renderer.getContext();
        context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

        // Create a stave of width 400 at position 10, 40 on the canvas.
        const treble = new VF.Stave(10, 40, 400);
        treble.addClef('treble');
        treble.setContext(context).draw();

        const bass = new VF.Stave(10, 145, 400);
        bass.addClef('bass');
        bass.setContext(context).draw();

        if (this.props.notes.length) {
            const trebleNotes = [
                new VF.StaveNote({clef: "treble", keys: ['c/4', 'e/4', 'g/4'], duration: "w" }),
            ];

            const bassNotes = [
                new VF.StaveNote({clef: "bass", keys: ['c/2', 'c/3'], duration: "w" }),
            ];

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
    notes: state.notes
});

export default connect(mapStateToProps)(Staves);
