import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import * as actions from '../actions';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        // this.focus = this.focus.bind(this);
        this.focusKey = this.focusKey.bind(this);
        this.handleKey = this.handleKey.bind(this);
        this.currentLinkN = 0;
    }

    focusMouse(link) {
        ReactDOM.findDOMNode(link.target).focus();
    }

    focusKey(link) {
        ReactDOM.findDOMNode(this.refs['_' + this.currentLinkN]).focus();
    }

    handleKey(e) {
        if (['ArrowDown','ArrowRight','s','d','S','D'].indexOf(e.key) !== -1)
            this.currentLinkN = (this.currentLinkN + 1) % 12;
        else if (['ArrowUp','ArrowLeft','w','a','W','A'].indexOf(e.key) !== -1)
            this.currentLinkN = (this.currentLinkN - 1 === -1) ? 11 : this.currentLinkN - 1;
        this.focusKey();
    }

    componentDidMount() {
        this.focusKey();
        this.props.instrument.then(piano => {
            piano.stop();
        });
    }

    render(props) {
        return(
            <div ref="main" className="game" onKeyDown={this.handleKey} onMouseLeave={this.focusKey}>
              <h2 className="modes-primary">Game modes:</h2>
              <ul>
                <li><Link ref="_0" className="nav-link" to="/easy-major" onMouseOver={this.focusMouse}>easy major</Link></li>
                <li><Link ref="_1" className="nav-link" to="/hard-major" onMouseOver={this.focusMouse}>hard major</Link></li>
                <li><Link ref="_2" className="nav-link" to="/easy-minor" onMouseOver={this.focusMouse}>easy minor</Link></li>
                <li><Link ref="_3" className="nav-link" to="/intermediate-minor" onMouseOver={this.focusMouse}>intermediate minor</Link></li>
                <li><Link ref="_4" className="nav-link" to="/hard-minor" onMouseOver={this.focusMouse}>hard minor</Link></li>
                <li><Link ref="_5" className="nav-link" to="/all-chords" onMouseOver={this.focusMouse}>all chords</Link></li>
                <li><Link ref="_6" className="nav-link" to="/easy-major-inv" onMouseOver={this.focusMouse}>easy major, inversions</Link></li>
                <li><Link ref="_7" className="nav-link" to="/hard-major-inv" onMouseOver={this.focusMouse}>hard major, inversions</Link></li>
                <li><Link ref="_8" className="nav-link" to="/easy-minor-inv" onMouseOver={this.focusMouse}>easy minor, inversions</Link></li>
                <li><Link ref="_9" className="nav-link" to="/intermediate-minor-inv" onMouseOver={this.focusMouse}>intermediate minor, inversions</Link></li>
                <li><Link ref="_10" className="nav-link" to="/hard-minor-inv" onMouseOver={this.focusMouse}>hard minor, inversions</Link></li>
                <li><Link ref="_11" className="nav-link" to="/all-chords-inv" onMouseOver={this.focusMouse}>all chords, inversions</Link></li>
              </ul>
            </div>
        );
    }
}
