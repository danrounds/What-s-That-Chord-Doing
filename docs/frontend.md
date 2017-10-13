# [![What's That Chord Doing?](img/logo.png)](http://what-s-that-chord-doing.herokuapp.com)

_What's That Chord Doing_? is a single-page app made with React and Redux.

### Dependencies:

* React
* Babel
* React DOM
* React Router 3
* React Redux 
* Redux Thunk
* [React Responsive](https://github.com/contra/react-responsive), for media queries
* [Vexflow](https://github.com/0xfe/vexflow/), for notation
* [Soundfont-player](https://github.com/danigb/soundfont-player), for our audio

[Hand-coded music logic](../js/musicLogic/README.md) is integral to the 
app&#8212;it's the reason we hear audio, see musical notes, and have any game 
logic.

[Vexflow](https://github.com/0xfe/vexflow/) can be coerced into displaying 
nice-looking (and correct) musical notation, and 
[Soundfont-player](https://github.com/danigb/soundfont-player) is a pretty 
straightforward way to play MIDI data, in the browser.

Everything else is React, Redux, or extension modules.
