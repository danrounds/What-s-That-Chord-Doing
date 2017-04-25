import React from 'react';
import Soundfont from 'soundfont-player';

const ac = new AudioContext();

export default class Audio extends React.Component {
    componentDidMount() {
        Soundfont.instrument(ac, 'acoustic_grand_piano').then(function (piano) 
                                                              piano.play('C4'));

        Soundfont.instrument(ac, 'clarinet').then(function(clarinet) {
            clarinet.play('E4');
        });

        Soundfont.instrument(ac, 'clarinet').then(function(clarinet) {
            clarinet.play('G4');
        });
        

    }

    render() {
        return (<button>Play audio again </button>);
    }
}
