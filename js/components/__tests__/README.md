# Component tests

### Strategy

Component testing is almost exclusively snapshot-based. Different renderers are used based on how deep our comparisons needs to be, whether we need to update component state, &c.

### What we're testing

* Basic rendering:
  * `GameModeText`
  * `KeyboardNavLessonListOverlay`
  * `KeyboardShortcutsOnOff`
  * `KofN`
  * `LessonsNavigator`
  * `Next`
  * `PlayAudio`
  * `StartNewGame`
  * `Status`

* Connected components
  Here, we're still just testing rendering, but the components desperately want a store, unless we use the shallow renderer. Solution: Use the shallow renderer.  
  * `Game`
  * `Home`
  * `NavBar`
  * `Scores`
  * `WhatIsThis`

* More elaborate components:
  Still just basic rendering tests, but the components are either more subtle, or we're being careful to try a bunch of permutations of our state.
  * `AnswerEntry`
  * `Staves`
  * `LogInOrRegister`

### Tests still to be written:

* Audio (webaudio/MIDI) tests. These should use the `web-audio-test-api`:
  
  Mock data, for the event that audio tests actually get written (for `PlayAudio` component):
~~~~js-code-follows~~~~
const props = {
    introChordSequence: [[ "F#3","C#5","F#5","A#5",],
                         ["B3","B4","D#5","F#5",],
                         ["C#4","G#4","C#5","F5",],
                         ["F#3","A#4","C#5","F#5",]],
    answer: ["B3","F#4","B4","D#5",]
};
~~~~
