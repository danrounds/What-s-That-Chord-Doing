const noteNameTables = {
    flatDblFlat: [
        'Bbb/2','Bb/2','Cb/3','C/3','Db/3','Ebb/3','Eb/3','Fb/3','F/3','Gb/3',
        'G/3','Ab/3','Bbb/3','Bb/3','Cb/4','C/4','Db/4','Ebb/4','Eb/4','Fb/4',
        'F/4','Gb/4','G/4','Ab/4','Bbb/4','Bb/4','Cb/5','C/5','Db/5','Ebb/5',
        'Eb/5','Fb/5','F/5','Gb/5','G/5','Ab/5','Bbb/5','Bb/5','Cb/6','C/6',
        'Db/6','Ebb/6','Eb/6','Fb/6','F/6','Gb/6'
    ],

    flatEnharmonic: [
        'A/2','Bb/2','Cb/3','C/3','Db/3','D/3','Eb/3','Fb/3','F/3','Gb/3','G/3',
        'Ab/3','A/3','Bb/3','Cb/4','C/4','Db/4','D/4','Eb/4','Fb/4','F/4',
        'Gb/4','G/4','Ab/4','A/4','Bb/4','Cb/5','C/5','Db/5','D/5','Eb/5',
        'Fb/5','F/5','Gb/5','G/5','Ab/5','A/5','Bb/5','Cb/6','C/6','Db/6','D/6',
        'Eb/6','Fb/6','F/6','Gb/6','G/6'
    ],

    flatChromatic:  [
        'A/2','Bb/2','B/2','C/3','Db/3','D/3','Eb/3','E/3','F/3','Gb/3','G/3',
        'Ab/3','A/3','Bb/3','B/3','C/4','Db/4','D/4','Eb/4','E/4','F/4','Gb/4',
        'G/4','Ab/4','A/4','Bb/4','B/4','C/5','Db/5','D/5','Eb/5','E/5','F/5',
        'Gb/5','G/5','Ab/5','A/5','Bb/5','B/5','C/6','Db/6','D/6','Eb/6','E/6',
        'F/6','Gb/6','G/6'
    ],

    sharpChromatic: [
        'A/2','A#/2','B/2','C/3','C#/3','D/3','D#/3','E/3','F/3','F#/3','G/3',
        'G#/3','A/3','A#/3','B/3','C/4','C#/4','D/4','D#/4','E/4','F/4','F#/4',
        'G/4','G#/4','A/4','A#/4','B/4','C/5','C#/5','D/5','D#/5','E/5','F/5',
        'F#/5','G/5','G#/5','A/5','A#/5','B/5','C/6','C#/6','D/6','D#/6','E/6',
        'F/6','F#/6'
    ],

    sharpEnharmonic: [
        'A/2','A#/2','B/2','B#/2','C#/3','D/3','D#/3','E/3','E#/3','F#/3','G/3',
        'G#/3','A/3','A#/3','B/3','B#/3','C#/4','D/4','D#/4','E/4','E#/4',
        'F#/4','G/4','G#/4','A/4','A#/4','B/4','B#/4','C#/5','D/5','D#/5','E/5',
        'E#/5','F#/5','G/5','G#/5','A/5','A#/5','B/5','B#/5','C#/6','D/6',
        'D#/6','E/6','E#/6','F#/6'
    ]
};

const keysCharacteristics = {
    'A': {
        displacement: 0,
        majorMap: noteNameTables.sharpChromatic,
        minorMap: noteNameTables.flatChromatic,
        neapolMap: noteNameTables.flatChromatic
    },

    'A#': {
        displacement: 1
    },

    'Bb': {
        displacement: 1,
        majorMap: noteNameTables.flatChromatic,
        minorMap: noteNameTables.flatEnharmonic,
        neapolMap: noteNameTables.sharpChromatic
    },

    'B': {
        displacement: 2,
        majorMap: noteNameTables.sharpChromatic,
        minorMap: noteNameTables.sharpChromatic,
        neapolMap: noteNameTables.sharpChromatic
    },

    'C': {
        displacement: 3,
        majorMap: noteNameTables.flatChromatic,
        minorMap: noteNameTables.flatChromatic,
        neapolMap: noteNameTables.flatChromatic
    },

    'C#': {
        displacement: 4,
        majorMap: noteNameTables.sharpEnharmonic,
        minorMap: noteNameTables.sharpEnharmonic,
        neapolMap: noteNameTables.sharpChromatic
    },

    'Db': {
        displacement: 4,
        majorMap: noteNameTables.flatChromatic,
        minorMap: noteNameTables.flatDblFlat,
        neapolMap: noteNameTables.sharpChromatic
    },

    'D': {
        displacement: 5,
        majorMap: noteNameTables.sharpChromatic,
        minorMap: noteNameTables.flatChromatic,
        neapolMap: noteNameTables.flatChromatic
    },

    'D#': {
        displacement: 6
    },

    'Eb': {
        displacement: 6,
        majorMap: noteNameTables.flatChromatic,
        minorMap: noteNameTables.flatEnharmonic,
        neapolMap: noteNameTables.flatEnharmonic
    },

    'E': {
        displacement: 7,
        majorMap: noteNameTables.sharpChromatic,
        minorMap: noteNameTables.sharpChromatic,
        neapolMap: noteNameTables.sharpChromatic
    },

    'F': {
        displacement: 8,
        majorMap: noteNameTables.flatChromatic,
        minorMap: noteNameTables.flatChromatic,
        neapolMap: noteNameTables.flatChromatic
    },

    'F#': {
        displacement: 9,
        majorMap: noteNameTables.sharpEnharmonic,
        minorMap: noteNameTables.sharpEnharmonic,
        neapolMap: noteNameTables.flatChromatic
    },

    'Gb': {
        displacement: 9,
        majorMap: noteNameTables.flatEnharmonic,
        minorMap: noteNameTables.flatDblFlat,
        neapolMap: noteNameTables.flatChromatic
    },

    'G': {
        displacement: 10,
        majorMap: noteNameTables.sharpChromatic,
        minorMap: noteNameTables.flatChromatic,
        neapolMap: noteNameTables.flatChromatic
    },

    'G#': {
        displacement: 11
    },

    'Ab': {
        displacement: 11,
        majorMap: noteNameTables.flatChromatic,
        minorMap: noteNameTables.flatEnharmonic,
        neapolMap: noteNameTables.sharpChromatic
    }
};

const chordTypeAndDisplacement = {
    'i': {chordType: 'minor', displacement: 0, enharmonically: 'minorMap'},
    'I': {chordType: 'major', displacement: 0, enharmonically: 'majorMap'},
    '♭II': {chordType: 'major', displacement: 1, enharmonically: 'neapolMap'},
    'ii°': {chordType: 'diminished', displacement: 2, enharmonically: 'minorMap'},
    'ii': {chordType: 'minor' , displacement: 2, enharmonically: 'majorMap'},
    '♭III': {chordType: 'major', displacement: 3, enharmonically: 'minorMap'},
    '♭III+': {chordType: 'augmented', displacement: 3, enharmonically: 'minorMap'},
    'iii': {chordType: 'minor', displacement: 4, enharmonically: 'majorMap'},
    'iv': {chordType: 'minor', displacement: 5, enharmonically: 'minorMap'},
    'IV': {chordType: 'major', displacement: 5, enharmonically: 'majorMap'},
    'v': {chordType: 'minor', displacement: 7, enharmonically: 'minorMap'},
    'V': {chordType: 'major', displacement: 7, enharmonically: 'majorMap'},
    '♭VI': {chordType: 'major', displacement: 8, enharmonically: 'minorMap'},
    'vi': {chordType: 'minor', displacement: 9, enharmonically: 'majorMap'},
    '♭VII': {chordType: 'major', displacement: 10, enharmonically: 'minorMap'},
    'vii°':{chordType: 'diminished', displacement: 11, enharmonically: 'majorMap'}
};
const _chords = Object.keys(chordTypeAndDisplacement);

const chordVoicings = {
    // bass: [root, 3rd, 5th]
    // treble: [5th, root, 3rd], [root, 3rd, 5th], [3rd, 5th, root]

    diminished: {
        bass: [0,3,6],
        treble: [ [6,12,15], [12,15,18], [15,18,24] ]
    },

    minor: {
        bass: [0,3,7],
        treble: [ [7,12,15], [12,15,19], [15,19,24] ]
    },

    major: {
        bass: [0,4,7],
        treble: [ [7,12,16], [12,16,19], [16,19,24] ]
    },

    augmented: {
        bass: [0,4,8],
        treble: [ [8,12,16], [12,16,20], [16,20,24] ]
    }
};

const accidentalMap = {
    root: [ [1], [0], [2] ],
    third: [ [2], [1], [0] ],
    fifth: [ [0], [2], [1] ],
    rootAndThird: [ [1,2], [0,1], [0,2] ],
    rootAndFifth: [ [0,1], [0,2], [1,2] ],
    thirdAndFifth: [ [0,2], [1,2], [0,1] ],
    rootThirdAndFifth: [ [0,1,2], [0,1,2], [0,1,2] ]
};

const chordSets = {
    easyMajor: ['I','ii','iii','IV','V','vi','vii°'],
    hardMajor: ['I','♭II','ii','iii','iv','IV','V','♭VI','vi','♭VII','vii°'],
    easyMinor: ['i','ii°','♭III','iv','V','♭VI','♭VII'],
    intmd8Minor: ['i','ii°','♭III','iv','V','♭VI','vi','♭VII','vii°'],
    hardMinor: ['i','♭II','ii°','ii','♭III','iv','v','V','♭VI','vi','♭VII','vii°'],
    all: ['i','I','♭II','ii°','ii','♭III','iii','iv','IV','v','V','♭VI','vi','♭VII','vii°']
};

const keys = {
    major: ['A','Bb','B','C','C#','Db','D','Eb','E','F','F#','Gb','G','Ab'],
    minor: ['A','Bb','B','C','C#','D','Eb','E','F','F#','G','Ab']
};

const chordGetter = {
    init(gameType, inversionsBool) {
        // Our init function (obviously)
        //
        // Designed to be called externally. Called with gameType ===
        // ['easyMajor','hardMajor','easyMinor','intmd8Minor','hardMinor','all']
        // --i.e. one of the keys from `chordSets`
        //
        // This establishes a key for us and sets up the relevant note-name
        // tables, and a displacement for indexing said tables
 
        this.ourChordSubset = chordSets[gameType];
        this.inversions = inversionsBool;

        const [major, minor] = [keys.major, keys.minor];
        this.ourSubsetOfKeys = {
            easyMajor: major, hardMajor: major, easyMinor: minor,
            hardMinor: minor, all: major
        }[gameType];
        
        this.pickKey(this.ourSubsetOfKeys, gameType);
        return {
            keyNameReadable: this.keyNameReadable,
            keyNameNotation: this.keyNameNotation,
            introChordSequence: this.getIntroProgression()
        };
    },

    getIntroProgression() {
        // This generates the chord progression we play before each question to
        // establish our key. It only needs to be used by our MIDI library, so
        // we don't care about enharmonically-correct  note names
        let progression = this.tonality === 'major' ?
                //[  I or i ],[ IV or iv ],[    V     ],[  I or i  ]
                [[0,19,24,28],[5,17,21,24],[7,14,19,23],[0,16,19,24]] : // major
                [[0,19,24,27],[5,17,20,24],[7,14,19,23],[0,15,19,24]];  // minor

        let chords = [];
        for (let chord of progression) {
            let notes = [];
            chord.map(val => {
                notes.push(noteNameTables.sharpChromatic[this.keyDisplacement + val]);
            });
            chords.push(notes);
        }
        return chords;
    },

    getChord() {
        // Designed to be called externally (after the init function has been
        // called). Returns the chord numeral (string), chord notes (array),
        // and an array of which indices of our chord note array are accidentals
        // --which we need because VexFlow won't otherwise display accidentals

        this.currentChordNumeral = this.getRandom(this.ourChordSubset);

        const {chordType, displacement, enharmonically} = chordTypeAndDisplacement[this.currentChordNumeral];
        const chord = chordVoicings[chordType];

        const [inversion, bassNote] = this.getBassNote(chord);
        const [trebleVoicesIndex, trebleNotes] = this.getTrebleNotes(chord);

        return {
            currentChordNumeral: this.currentChordNumeral,
            bassNote,
            trebleNotes,
            inversion,
            // accidentalIndices: this.getAccidentals(inversion, trebleVoicesIndex)
            accidentals: this.getAccidentals(inversion, trebleVoicesIndex)
        };
    },

    getBassNote(chord) {
        const {chordType, displacement, enharmonically} = chordTypeAndDisplacement[this.currentChordNumeral];
        const noteNameMap = keysCharacteristics[this.currentKey][enharmonically];

        const i = this.inversions ? this.getIndex(chord['bass']) : 0;
        const offset = chord['bass'][i];
        return [
            i,
            noteNameMap[this.keyDisplacement + offset + displacement]
        ];
    },

    getTrebleNotes(chord) {
        const {chordType, displacement, enharmonically} = chordTypeAndDisplacement[this.currentChordNumeral];
        const noteNameMap = keysCharacteristics[this.currentKey][enharmonically];
        let i = this.getIndex(chord['treble']);

        const trebleNotes = [];
        chord = chordVoicings[chordType]['treble'][i];
        chord.map(val => {
            trebleNotes.push(noteNameMap[this.keyDisplacement + val + displacement]);
        });
        return [i, trebleNotes];
    },

    pickKey(keySubset, gameType) {
        this.currentKey = this.getRandom(keySubset);
        if (['easyMajor', 'hardMajor', 'all'].indexOf(gameType) !== -1) {
            this.keyNameReadable = this.currentKey + ' Major';
            this.keyNameNotation = this.currentKey;
            this.tonality = 'major';
        } else {
            this.keyNameReadable = this.currentKey + ' minor';
            this.keyNameNotation = this.currentKey + 'm';
            this.tonality = 'minor';
        }
        this.keyDisplacement = keysCharacteristics[this.currentKey]['displacement'];
    },

    getAccidentals(inversion, i) {
        if (this.tonality === 'major') {
            return this.processMajorAccidentals(this, inversion, i);
        } else {
            return this.processMinorAccidentals(this, inversion, i);
        }
    },

    processMajorAccidentals(that, inversion, i) {
        return {
            bassAccidental: this.processMajorBassAccidental(inversion),
            trebleIndices: this.processMajorTrebleAccidentals(that, i)
        };
    },

    processMajorTrebleAccidentals(that, i) {
        try {
            return {
                'i': accidentalMap.third,
                'iv': accidentalMap.third,
                'v': accidentalMap.third,
                '♭III': accidentalMap.rootAndFifth,
                '♭III+': accidentalMap.rootAndFifth,
                '♭VI': accidentalMap.rootAndFifth,
                'ii°': accidentalMap.fifth,
                '♭VII': accidentalMap.root,

                '♭II': function() {
                    if (['Ab','Db','Gb'].indexOf(that.currentKey) !== -1)
                        return accidentalMap.rootThirdAndFifth;
                    else
                        return accidentalMap.rootAndFifth;
                }()
            }[this.currentChordNumeral][i];
        } catch(e) {
            return [];
        }
    },

    processMajorBassAccidental(inversion) {
        if (['i','iv','v'].indexOf(this.currentChordNumeral) !== -1) {
            if (inversion === 1)
                return true;

        } else if (['♭III','♭III+','♭VI'].indexOf(this.currentChordNumeral) !== -1) {
            if ([0,2].indexOf(inversion) !== -1)
                return true;

        } else if (this.currentChordNumeral === 'ii°') {
            if (inversion === 2)
                return true;
        
        } else if (this.currentChordNumeral === '♭VII') {
            if (inversion === 0)
                return true;

        } else if (this.currentChordNumeral === '♭II') {
            if (['Ab','Db','Gb'].indexOf(this.currentKey) !== -1)
                return true;        // ([0,1,2])
            else {
                if ([0,2].indexOf(inversion) !== -1)
                    return true;
            }
        }
        return false;
    },
    
    processMinorAccidentals(that, inversion, i) {
        return {
            bassAccidental: this.processMinorBassAccidental(inversion),
            trebleIndices: this.processMinorTrebleAccidentals(that, i)
        };
    },

    processMinorTrebleAccidentals(that, i) {
        try {
            return {
                'ii': accidentalMap.fifth,
                '♭III+': accidentalMap.fifth,
                'V': accidentalMap.third,
                'vi': accidentalMap.rootAndFifth,
                'vii°': accidentalMap.root,

                '♭II': function() {
                    if (['Bb','Ab'].indexOf(that.currentKey) !== -1)
                        return accidentalMap.rootThirdAndFifth;
                    else
                        return accidentalMap.root;
                }()
            }[this.currentChordNumeral][i];
        } catch(e) {
            return [];
        }
    },

    processMinorBassAccidental(inversion) {
        if (['ii','♭III+'].indexOf(this.currentChordNumeral) !== -1) {
            if (inversion === 2)
                return true;

        } else if (this.currentChordNumeral === 'V') {
            if (inversion === 1)
                return true;

        } else if (this.currentChordNumeral === 'vi') {
            if ([0,2].indexOf(inversion) !== -1)
                return true;

        } else if (this.currentChordNumeral === 'vii°') {
            if (inversion === 0)
                return true;

        } else if (this.currentChordNumeral === '♭II') {
            if (inversion === 0)
                return true;
            else if (['Bb','Ab'].indexOf(this.currentKey) !== -1) {
                return true;
            }
        }
        return false;
    },

    getRandom(array) {
        return array[Math.floor(Math.random() * array.length)];
    },

    getIndex(array) {
        return Math.floor(Math.random() * array.length);
    }
};

export default chordGetter;
// chordGetter.init('all', true);
