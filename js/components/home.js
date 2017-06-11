import React from 'react';
import {Link} from 'react-router';

export default class Home extends React.Component {
    render() {
        return(
            <div>
              <h2>Game modes:</h2>
              <ul>
                <li><Link to="/easy-major">easy major</Link></li>
                <li><Link to="/hard-major">hard major</Link></li>
                <li><Link to="/easy-minor">easy minor</Link></li>
                <li><Link to="/intermediate-minor">intermediate minor</Link></li>
                <li><Link to="/hard-minor">hard minor</Link></li>
                <li><Link to="/all-chords">all chords</Link></li>
                <li><Link to="/easy-major-inv">easy major, inversions</Link></li>
                <li><Link to="/hard-major-inv">hard major, inversions</Link></li>
                <li><Link to="/easy-minor-inv">easy minor, inversions</Link></li>
                <li><Link to="/intermediate-minor-inv">intermediate minor, inversions</Link></li>
                <li><Link to="/hard-minor-inv">hard minor, inversions</Link></li>
                <li><Link to="/all-chords-inv">all chords, inversions</Link></li>
              </ul>
            </div>
        );
    }
}