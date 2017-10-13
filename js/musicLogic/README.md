# Music logic

This is module that does all the "heavy lifting" to provide appropriate notes,
key-names, roman numerals, etc, to our music notation library, MIDI library,
and for our game logic.

The biggest things that it does are generates random chords and associated note 
data. It does this painstakingly, because the music notation library is utterly
literal about displaying enharmonic notes&#8212;that is, if we didn't carefully
manage these data, our display component would be completely screwed up.

The heart of the module is the `chordGetter` module, and its `init` and 
`getChord` methods. Everything else is subordinate methods or subordinate 
datatypes.

-DR, 2017
