import React from 'react';
import {connect} from 'react-redux';
import Soundfont from 'soundfont-player';

const ac = new AudioContext();

export class Audio extends React.Component {
    // componentDidMount() {
    //     Soundfont.instrument(ac, 'acoustic_grand_piano').then(function (piano) {
    //         for (let i of this.props.notes)
    //             piano.play(i).stop(ac.currentTime + 0.68);

    //         piano.schedule(ac.currentTime + 0.7, [
    //             {time: 0, note: 'F4'},
    //             {time: 0, note: 'A4'},
    //             {time: 0, note: 'C5'},
    //             {time: 0, note: 'F5'}
    //         ]);

    //         piano.play(['C4', 'E4', 'G4']);

    //         piano.schedule(ac.currentTime, ['C4', 'E4', 'G4', 'C5']).stop(ac.currentTime + 0.5);
    //         piano.schedule(ac.currentTime + 0.7, ['F4', 'A4', 'C5', 'F5'], {duration: 0.5});
    //         piano.schedule(ac.currentTime + 1.4, ['G4', 'B4', 'D5', 'F5'], {duration: 0.5});


        // });

    //     Soundfont.instrument(ac, 'clarinet').then(function(clarinet) {
    //         clarinet.play('E4');
    //     });

    //     Soundfont.instrument(ac, 'clarinet').then(function(clarinet) {
    //         clarinet.play('G4');
    //     });
    // }

    constructor(props) {
        super(props);
        this.playSounds = this.playSounds.bind(this);
    }

    playSounds() {
        Soundfont.instrument(ac, 'acoustic_grand_piano')
            .then(piano => {
                for (let i of this.props.notes) {
                    piano.play(i).stop(ac.currentTime + 0.68);
                }
            });
    }

    componentWillReceiveProps() {
        this.playSounds();
    }

    render() {
        return (<button onClick={this.playSounds}>Play audio again </button>);
    }
}

const mapStateToProps = (state, props) => ({
    chord: state.chord,
    notes: state.notes
});

export default connect(mapStateToProps)(Audio);
