import React from 'react';
import {connect} from 'react-redux';

import NavBar from './NavBar';

export class Scores extends React.Component {
    render() {
        return (
            <NavBar/>
        );
    }
}

const mapStateToProps = (state, props) => ({
    api: state.api,
});

export default connect(mapStateToProps)(Scores);
