# Music logic

This is the module that does all the "heavy lifting" to provide appropriate 
notes, key-names, roman numerals, etc, to our music notation library, MIDI 
library, and for our game logic.

The biggest thing it does, is generates random chords and associated note data.
It does this painstakingly, because the music notation library (Vexflow) is 
utterly literal about displaying enharmonic notes&#8212;that is, if we didn't
carefully manage these data, our display component would be completely screwed 
up.

The heart of the module is the `chordGetter` object, and its `init` and 
`getChord` methods. Everything else is subordinate methods or subordinate 
datatypes.

The module is general enough that it could be slotted into another (non-web-app)
music game or be slightly modified to generate chord voicings, on demand. As it
is, the only access points to `chordGetter` in our codebase are the
[`START_NEW_GAME` and `GET_NEXT_QUESTION` actions](../actions/gameActions.js).

-DR, 2017
