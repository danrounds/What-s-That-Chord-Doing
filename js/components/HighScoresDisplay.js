import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';
import ScoresTable from './ScoresTable';

export class HighScoresDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.clickBigButton = this.clickBigButton.bind(this);
        this.bigButtonIsSeleted = this.bigButtonIsSelected.bind(this);
        this.isTriggered = this.isTriggered.bind(this);
        this.trigger = this.trigger.bind(this);
    }

    bigButtonIsSelected(selected) {
        if (selected === this.state.showButtonSubset)
            return { backgroundColor: 'orange' };
        return {};
    }

    clickBigButton(buttonType) {
        this.setState({ showButtonSubset: buttonType });
        if (buttonType === 'major')
            this.trigger('easyMajor', false);
        else if (buttonType === 'minor')
            this.trigger('easyMinor', false);
        else
            this.trigger('allChords', false);
    }

    isTriggered(buttonQual) {
        let check;
        if (this.props.api.lastHighScoreAccessed)
            check = this.props.api.lastHighScoreAccessed;
        else if (this.state.mode)
            check = this.state.mode + (this.state.inversions ? 'Inv' : '');
        else
            check = this.props.gameType + (this.props.inv ? 'Inv' : '');

        return (buttonQual === check) ? { backgroundColor: 'lime' } : {};
    }

    trigger(mode, inversions) {
        this.setState({ mode, inversions });
        this.props.dispatch(actions.getHighScores(mode + (inversions ? 'Inv' : '')));
    }

    componentDidMount(gT=this.props.gameType) {
        this.props.dispatch(actions.getHighScores(
            this.props.gameType + (this.props.inv ? 'Inv' : '')));

        if (/Minor/.test(gT))
            this.setState({ showButtonSubset: 'minor' });
        else if (/Major/.test(gT))
            this.setState({ showButtonSubset: 'major' });
        else
            this.setState({ showButtonSubset: 'all' });
    }

    render() {
        return (
            <div>

              Chord subsets
              <button onClick={() => this.clickBigButton('major')} style={this.bigButtonIsSelected('major')}>Major</button>
              <button onClick={() => this.clickBigButton('minor')} style={this.bigButtonIsSelected('minor')}>Minor</button>
              <button onClick={() => this.clickBigButton('all')} style={this.bigButtonIsSelected('all')}>All our chords</button>

              {this.state.showButtonSubset === 'major' ? (
                  <div>
                    <button onClick={() => this.trigger('easyMajor', false)} style={this.isTriggered('easyMajor')}>Easy</button>
                    <button onClick={() => this.trigger('easyMajor', true)} style={this.isTriggered('easyMajorInv')}>Easy, inversions</button>
                    <button onClick={() => this.trigger('hardMajor', false)} style={this.isTriggered('hardMajor')}>Hard</button>
                    <button onClick={() => this.trigger('hardMajor', true)} style={this.isTriggered('hardMajorInv')}>Hard, inversions</button>
                  </div>
              ) : null}

              {this.state.showButtonSubset === 'minor' ? (
                  <div>
                    <button onClick={() => this.trigger('easyMinor', false)} style={this.isTriggered('easyMinor')}>Easy</button>
                    <button onClick={() => this.trigger('easyMinor', true)}  style={this.isTriggered('easyMinorInv')}>Easy, inversions</button>
                    <button onClick={() => this.trigger('intermediateMinor', false)} style={this.isTriggered('intermediateMinor')}>Intermediate</button>
                    <button onClick={() => this.trigger('intermediateMinor', true)} style={this.isTriggered('intermediateMinorInv')}>Intermediate, inversions</button>
                    <button onClick={() => this.trigger('hardMinor', false)} style={this.isTriggered('hardMinor')}>Hard</button>
                    <button onClick={() => this.trigger('hardMinor', true)} style={this.isTriggered('hardMinorInv')}>Hard, inversions</button>
                  </div>
              ) : null}

              {this.state.showButtonSubset === 'all' ? (
                  <div>
                    <button onClick={() => this.trigger('allChords', false)} style={this.isTriggered('allChords')}>All our chords</button>
                    <button onClick={() => this.trigger('allChords', true)} style={this.isTriggered('allChordsInv')}>All our chord, inversions</button>
                  </div>
              ) : null}

              <ScoresTable tableType="highScore"/>

            </div>
        );
    }

}

const mapStateToProps = (state, props) => {
    let lastHighScore, inv;
    if (state.api.lastHighScoreAccessed) {
        lastHighScore = state.api.lastHighScoreAccessed.split('Inv');
        inv = lastHighScore.length === 2;
        lastHighScore = lastHighScore[0];
    }

    return {
        gameType: lastHighScore || state.game.gameType || 'allChords',
        inv: inv || state.game.inversions,
        api: state.api || { highScores: [] },
    };
};

export default connect(mapStateToProps)(HighScoresDisplay);
