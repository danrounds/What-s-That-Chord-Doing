import React from 'react';
import {Link} from 'react-router';
import ReactDOM from 'react-dom';

export default class LessonsNavigator extends React.Component {
    constructor(props) {
        super(props);
        this.focusKey = this.focusKey.bind(this);
        this.handleKey = this.handleKey.bind(this);
        this.onDifficultyClick = this.onDifficultyClick.bind(this);
        this.updateDisplayArray = this.updateDisplayArray.bind(this);

        // FOLLOWING VARIABLES are for keyboard navigation through our lesson
        // list:
        this.currentLinkI = 0;  // this is our index into displayArray
        this.displayArray = ['a','f','m'];
        // displayArray ends up containing ref string values for the elements
        // we currently are displaying. 'a','f','m' are the refs for Easy,
        // Novice, Difficult "buttons"  We always want them displayed.
        //
        // The following ref strings are dynamically added and removed from
        // displayArray:
        this.easyRefs = ['b','c','d','e'];           // refs for easy lessons
        this.noviceRefs = ['g','h','i','j','k','l']; // refs for novice lessons
        this.difficultRefs = ['n','o'];              // refs for difficult ...

        this.state = {};
        this.state.displayEasy = false;
        this.state.displayNovice = false;
        this.state.displayDifficult = false;
    }

    clickLink() {
        ReactDOM.findDOMNode(this.refs[this.displayArray[this.currentLinkI]]).click();
    }

    focusMouse(link) {
        ReactDOM.findDOMNode(link.target).focus();
    }

    focusKey(link) {
        ReactDOM.findDOMNode(this.refs[this.displayArray[this.currentLinkI]]).focus();
    }

    handleKey(e) {
        if (['ArrowDown','ArrowRight','s','d','S','D'].indexOf(e.key) !== -1)
            this.currentLinkI = (this.currentLinkI + 1) % this.displayArray.length;
        else if (['ArrowUp','ArrowLeft','w','a','W','A'].indexOf(e.key) !== -1)
            this.currentLinkI = (this.currentLinkI -1 === -1) ? this.displayArray.length - 1 : this.currentLinkI - 1;
        else if (e.key === ' ')
            this.clickLink();
        this.focusKey();
    }

    onDifficultyClick(e) {
        let difficulty = e.target.innerText;
        if (difficulty === 'Easy') {
            this.updateDisplayArray(this.easyRefs, !this.state.displayEasy);
            this.setState({displayEasy: !this.state.displayEasy});
        } else if (difficulty === 'Novice') {
            this.updateDisplayArray(this.noviceRefs, !this.state.displayNovice);
            this.setState({displayNovice: !this.state.displayNovice});
        } else if (difficulty === 'Difficult') {
            this.updateDisplayArray(this.difficultRefs, !this.state.displayDifficult);
            this.setState({displayDifficult: !this.state.displayDifficult});
        }
    }

    updateDisplayArray(addition, add) {
        for (let el of addition) {
            if (add) {
                this.displayArray.push(el);
            } else {
                this.displayArray.splice(this.displayArray.indexOf(el), 1);
            }
        }
        this.displayArray.sort();
    }

    componentDidMount() {
        this.focusKey();
    }

    render() {
        return (
            <div ref="main" className="game" onKeyDown={this.handleKey} onMouseLeave={this.focusKey}>
              <h2 className="modes-primary">Game modes:</h2>
              <a ref="a" className="difficultyLvl" href="javascript:this.onDifficultyClick" onClick={this.onDifficultyClick}>Easy</a>
              <div className="easy-container">
                {this.state.displayEasy && (
                  <ul className="miniLessonList">
                    <li><Link ref="b" className="nav-link" to="/easy-major" onMouseOver={this.focusMouse}>easy major</Link></li>
                    <li><Link ref="c" className="nav-link" to="/easy-major-inv" onMouseOver={this.focusMouse}>easy major, inversions</Link></li>
                    <li><Link ref="d" className="nav-link" to="/easy-minor" onMouseOver={this.focusMouse}>easy minor</Link></li>
                    <li><Link ref="e" className="nav-link" to="/easy-minor-inv" onMouseOver={this.focusMouse}>easy minor, inversions</Link></li>
                  </ul>)
                }
              </div>
              <a ref="f" className="difficultyLvl" href="javascript:this.onDifficultyClick"onClick={this.onDifficultyClick}>Novice</a>
              <div className="novice-container">
                {this.state.displayNovice && (
                  <ul className="miniLessonList">
                    <li><Link ref="g" className="nav-link" to="/intermediate-minor" onMouseOver={this.focusMouse}>intermediate minor</Link></li>
                    <li><Link ref="h" className="nav-link" to="/intermediate-minor-inv" onMouseOver={this.focusMouse}>intermediate minor, inversions</Link></li>
                    <li><Link ref="i" className="nav-link" to="/hard-major" onMouseOver={this.focusMouse}>hard major</Link></li>
                    <li><Link ref="j" className="nav-link" to="/hard-major-inv" onMouseOver={this.focusMouse}>hard major, inversions</Link></li>
                    <li><Link ref="k" className="nav-link" to="/hard-minor" onMouseOver={this.focusMouse}>hard minor</Link></li>
                    <li><Link ref="l" className="nav-link" to="/hard-minor-inv" onMouseOver={this.focusMouse}>hard minor, inversions</Link></li>
                  </ul>)
                }
              </div>
              <a ref="m" className="difficultyLvl" href="javascript:this.onDifficultyClick" onClick={this.onDifficultyClick}>Difficult</a>
              <div className="difficult-container">
                {this.state.displayDifficult && (
                  <ul className="miniLessonList">
                    <li><Link ref="n" className="nav-link" to="/all-chords" onMouseOver={this.focusMouse}>all chords</Link></li>
                    <li><Link ref="o" className="nav-link" to="/all-chords-inv" onMouseOver={this.focusMouse}>all chords, inversions</Link></li>
                  </ul>)
              }
              </div>
            </div>
    );
}
}
