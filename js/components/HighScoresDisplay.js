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

    bigButtonIsSelected(selected) {
        return selected === this.state.showButtonSubset ? 'big-btn big-btn-selected' : 'big-btn';
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

        return (buttonQual === check) ? 'small-btn small-btn-selected' : 'small-btn';
    }

    trigger(mode, inversions) {
        this.setState({ mode, inversions });
        this.props.dispatch(actions.getHighScores(mode + (inversions ? 'Inv' : '')));
    }

    render() {
        return (
            <div>

              <div className="scores-btn-div">
                <h1 className="scores-h-txt">Chord subsets</h1>
                <div className="big-btn-div">
                  <button onClick={() => this.clickBigButton('major')} className={this.bigButtonIsSelected('major')}>Major</button>
                  <button onClick={() => this.clickBigButton('minor')} className={this.bigButtonIsSelected('minor')}>Minor</button>
                  <button onClick={() => this.clickBigButton('all')} className={this.bigButtonIsSelected('all')}>All our chords</button>
                </div>

                {this.state.showButtonSubset === 'major' && (
                    <div className="small-btns small-btns-major">
                      <button onClick={() => this.trigger('easyMajor', false)} className={this.isTriggered('easyMajor')}>Easy</button>
                      <button onClick={() => this.trigger('easyMajor', true)} className={this.isTriggered('easyMajorInv')}>Easy<br/>inversions</button>
                      <button onClick={() => this.trigger('hardMajor', false)} className={this.isTriggered('hardMajor')}>Hard</button>
                      <button onClick={() => this.trigger('hardMajor', true)} className={this.isTriggered('hardMajorInv')}>Hard<br/>inversions</button>
                    </div>
                )}

                {this.state.showButtonSubset === 'minor' && (
                    <div className="small-btns small-btns-minor">
                      <button onClick={() => this.trigger('easyMinor', false)} className={this.isTriggered('easyMinor')}>Easy</button>
                      <button onClick={() => this.trigger('easyMinor', true)}  className={this.isTriggered('easyMinorInv')}>Easy<br/>inversions</button>
                      <button onClick={() => this.trigger('intermediateMinor', false)} className={this.isTriggered('intermediateMinor')}>Intermediate</button>
                      <button onClick={() => this.trigger('intermediateMinor', true)} className={this.isTriggered('intermediateMinorInv')}>Intermediate<br/>inversions</button>
                      <button onClick={() => this.trigger('hardMinor', false)} className={this.isTriggered('hardMinor')}>Hard</button>
                      <button onClick={() => this.trigger('hardMinor', true)} className={this.isTriggered('hardMinorInv')}>Hard<br/> inversions</button>
                    </div>
                )}

                {this.state.showButtonSubset === 'all' && (
                    <div className="small-btns small-btns-all">
                      <button onClick={() => this.trigger('allChords', false)} className={this.isTriggered('allChords')}>All our chords</button>
                      <button onClick={() => this.trigger('allChords', true)} className={this.isTriggered('allChordsInv')}>All our chords<br/>inversions</button>
                    </div>
                )}
              </div>
              <ScoresTable tableType="highScore" />

            </div>
        );
    }

}

const mapStateToProps = (state) => {
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
