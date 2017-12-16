import React from 'react';
import { connect } from 'react-redux';

export class KeyboardNavLessonListOverlay extends React.Component {
    constructor() {
        super();
        this.thing = (
            <div>
              use&nbsp;
              <span className="keyHint lesson-nav-hint">w</span>&nbsp;
              <span className="keyHint lesson-nav-hint">a</span>&nbsp;
              <span className="keyHint lesson-nav-hint">s</span>&nbsp;
              <span className="keyHint lesson-nav-hint">d</span>&nbsp;
              /&nbsp;
              <span className="keyHint lesson-nav-hint">↑</span>&nbsp;
              <span className="keyHint lesson-nav-hint">←</span>&nbsp;
              <span className="keyHint lesson-nav-hint">↓</span>&nbsp;
              <span className="keyHint lesson-nav-hint">→</span>&nbsp;
              and&nbsp;
              <span className="keyHint lesson-nav-hint">Enter</span>&nbsp;
              /&nbsp;
              <span className="keyHint lesson-nav-hint">Space</span>&nbsp;
              <br/>to navigate lessons menu
            </div>);
    }

    render(props) {
        return (
            <div className="lesson-nav-keyboard-hints">
              {this.props.displayKeyboardShortcuts && this.thing}
            </div>
        );
    }
}

export default connect((state) => ({
  displayKeyboardShortcuts: state.ui.displayKeyboardShortcuts
}))(KeyboardNavLessonListOverlay);
