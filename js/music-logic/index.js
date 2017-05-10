const keyMaps = {
    flatEnharmonic: [
        'A/2','Bb/2','Cb/3','C/3','Db/3','D/3','Eb/3','Fb/2','F/3','Gb/3','G/3',
        'Ab/3','A/3','Bb/3','Cb/3','C/4','Db/4','D/4','Eb/4','Fb/4','F/4','Gb/4',
        'G/4','Ab/4','A/4','Bb/4','Cb/4','C/5','Db/5','D/5','Eb/5','Fb/5','F/5',
        'Gb/5'
    ],
    flatChromatic:  [
        'A/2','Bb/2','B/2','C/3','Db/3','D/3','Eb/3','E/3','F/3','Gb/3','G/3',
        'Ab/3','A/3','Bb/3','B/3','C/4','Db/4','D/4','Eb/4','E/4','F/4','Gb/4',
        'G/4','Ab/4','A/4','Bb/4','B/4','C/5','Db/5','D/5','Eb/5','E/5','F/5','Gb/5'
    ],
    sharpChromatic: [
        'A/2','A#/2','B/2','C/3','C#/3','D/3','D#/3','E/3','F/3','F#/3','G/3',
        'G#/3','A/3','A#/3','B/3','C/4','C#/4','D/4','D#/4','E/4','F/4','F#/4',
        'G/4','G#/4','A/4','A#/4','B/4','C/5','C#/5','D/5','D#/5','E/5','F/5','F#/5'
    ],
    sharpEnharmonic: [
        'A/2','A#/2','B/2','B#/3','C#/3','D/3','D#/3','E/3','E#/3','F#/3','G/3',
        'G#/3','A/3','A#/3','B/3','B#/4','C#/4','D/4','D#/4','E/4','E#/4','F#/4',
        'G/4','G#/4','A/4','A#/4','B/4','B#/5','C#/5','D/5','D#/5','E/5','E#/5',
        'F#/5'
    ]
};

const keysCharacteristics = {
    'A': {
        displacement: 0,
        majorMap: keyMaps.sharpChromatic,
        minorMap: keyMaps.flatChromatic,
        neapolMap: keyMaps.flatChromatic
    },
    'A#': {
        displacement: 1
    },
    'Bb': {
        displacement: 1,
        majorMap: keyMaps.flatChromatic,
        minorMap: keyMaps.flatEnharmonic,
        neapolMap: keyMaps.sharpChromatic
    },
    'B': {
        displacement: 2,
        majorMap: keyMaps.sharpChromatic,
        minorMap: keyMaps.sharpChromatic,
        neapolMap: keyMaps.sharpChromatic
    },
    'C': {
        displacement: 3,
        majorMap: keyMaps.flatChromatic,
        minorMap: keyMaps.flatChromatic,
        neapolMap: keyMaps.flatChromatic
    },
    'C#': {
        displacement: 4,
        majorMap: keyMaps.sharpEnharmonic,
        minorMap: keyMaps.sharpEnharmonic,
        neapolMap: keyMaps.sharpChromatic
    },
    'Db': {
        displacement: 4,
        majorMap: keyMaps.flatChromatic,
        minorMap: keyMaps.flatEnharmonic,
        neapolMap: keyMaps.sharpChromatic
    },
    'D': {
        displacement: 5,
        majorMap: keyMaps.sharpChromatic,
        minorMap: keyMaps.flatChromatic,
        neapolMap: keyMaps.flatChromatic
    },
    'D#': {
        displacement: 6
    },
    'Eb': {
        displacement: 6,
        majorMap: keyMaps.flatChromatic,
        minorMap: keyMaps.flatEnharmonic,
        neapolMap: keyMaps.flatEnharmonic
    },
    'E': {
        displacement: 7,
        majorMap: keyMaps.sharpChromatic,
        minorMap: keyMaps.sharpChromatic,
        neapolMap: keyMaps.sharpChromatic
    },
    'F': {
        displacement: 8,
        majorMap: keyMaps.flatChromatic,
        minorMap: keyMaps.flatChromatic,
        neapolMap: keyMaps.flatChromatic
    },
    'F#': {
        displacement: 9,
        majorMap: keyMaps.sharpChromatic,
        minorMap: keyMaps.sharpEnharmonic,
        neapolMap: keyMaps.sharpChromatic
    },
    'Gb': {
        displacement: 9,
        majorMap: keyMaps.flatEnharmonic
    },
    'G': {
        displacement: 10,
        majorMap: keyMaps.sharpChromatic,
        minorMap: keyMaps.flatChromatic,
        neapolMap: keyMaps.flatChromatic
    },
    'G#': {
        displacement: 11
    },
    'Ab': {
        displacement: 11,
        majorMap: keyMaps.flatChromatic,
        minorMap: keyMaps.flatEnharmonic,
        neapolMap: keyMaps.sharpChromatic
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
    diminished: [0,3,6],
    minor: [0,3,7],
    major: [0,4,7],
    augmented: [0,4,8]
};

const accidentalMap = {
    root: [0],
    third: [1],
    fifth: [2],
    rootAndThird: [0,1],
    rootAndFifth: [0,2],
    thirdAndFifth: [1,2],
    rootThirdAndFifth: [0,1,2]
};

const chordSets = {
    easyMajor: ['I','ii','iii','IV','V','vi','vii°'],
    hardMajor: ['I','♭II','ii','iii','iv','IV','V','♭VI','vi','♭VII','vii°'],
    easyMinor: ['i','ii°','♭III','iv','V','♭VI','♭VII'],
    intmd8Minor: ['i','ii°','♭III','iv','V','♭VI','vi','♭VII','vii°'],
    // hardMinor: ['i','ii°','ii','♭III','♭III+','iv','v','V','♭VI','vi','♭VII','vii°'],
    hardMinor: ['i','♭II','ii°','ii','♭III','♭III+','iv','v','V','♭VI','vi','♭VII','vii°'],
    all: ['I','i','♭II','ii','ii°','iii','♭III','♭III+','iv','v','V','♭VI','vi','♭VII','vii°']
};

const keys = {
    major: ['A','Bb','B','C','C#','Db','D','Eb','E','F','F#','Gb','G'],
    // minor: ['A','Bb','B','C','C#','D','Eb','E','F','F#','G']
    minor: ['A','Bb','B','C','C#','D','Eb','E','F','F#','G','Ab']
};

const chordGetter = {
    init(gameType) {
        this.ourChordSubset = chordSets[gameType];

        const [major, minor] = [keys.major, keys.minor];
        this.ourSubsetOfKeys = {
            easyMajor: major, hardMajor: major, easyMinor: minor,
            hardMinor: minor, all: major
        }[gameType];
        
        console.log(this.ourSubsetOfKeys + ' our subset of keys');

        this.pickKey(this.ourSubsetOfKeys, gameType);

        console.log(this.keyNameReadable);
        console.log(this.keyNameNotation);
    },

    getRandom: function(array) {
        return array[Math.floor(Math.random() * array.length)];
    },

    pickKey(keySubset, gameType) {
        this.currentKey = this.getRandom(keySubset);
        if (['easyMajor', 'hardMajor', 'all'].indexOf(gameType) !== -1) {
            this.keyNameReadable = this.currentKey + ' Major';
            this.keyNameNotation = this.currentKey;
            this.tonality = 'major';
        } else {
            this.keyNameReadable = this.currentKey + ' minor';
            this.keyNameNotation = this.currentKey;
            this.tonality = 'minor';
        }
        this.keyDisplacement = keysCharacteristics[this.currentKey]['displacement'];
    },

    getChord() {
        this.currentChordNumeral = this.getRandom(this.ourChordSubset);
        let {chordType, displacement, enharmonically} = chordTypeAndDisplacement[this.currentChordNumeral];

        console.log(`enharmonically:::::::::: ${enharmonically}`);
        const noteNameMap = keysCharacteristics[this.currentKey][enharmonically];
        console.log(this.keyNameReadable);
        console.log(this.currentChordNumeral);

        this.chordNotes = [];
        chordVoicings[chordType].map(val => {
            // console.log(`noteNameMap: ${noteNameMap}`);
            this.chordNotes.push(noteNameMap[this.keyDisplacement + val + displacement]);
        });

        this.accidentalIndices = this.getAccidentals() || [];

        console.log(`chordNotes: ${this.chordNotes}`);
        console.log(`accidentals: `+this.accidentalIndices);
    },

    getAccidentals() {
        if (this.tonality === 'major') {
            return this.processMajorAccidentals(this);
        } else {
            return this.processMinorAccidentals(this);
        }
    },

    processMajorAccidentals(that) {
        return {
            'i': accidentalMap.third,
            'iv': accidentalMap.third,
            'v': accidentalMap.third,

            '♭III': accidentalMap.rootAndFifth,
            '♭III+': accidentalMap.rootAndFifth,
            '♭VI': accidentalMap.rootAndFifth,
            // root and fifth

            'ii°': accidentalMap.fifth,
            // fifth
            
            '♭VII': accidentalMap.root,
            // root

            '♭II': function() {
                if (['Db','Gb'].indexOf(that.currentKey) !== -1)
                    return accidentalMap.rootThirdAndFifth;
                else
                    return accidentalMap.rootAndFifth;
            }()
            // varies
        }[this.currentChordNumeral];
    },

    processMinorAccidentals(that) {
        return {
            'ii': accidentalMap.fifth,
            '♭III+': accidentalMap.fifth,
            // fifth

            'V': accidentalMap.third,
            // third
            
            'vi': accidentalMap.rootAndFifth,
            // root and fifth
            
            'vii°': accidentalMap.root,
            // root

            '♭II': function() {
                if (['Db','Gb','Ab'].indexOf(that.currentKey) !== -1)
                    return accidentalMap.rootAndThird;
                else
                    return accidentalMap.root;
            }()
            // varies
        }[this.currentChordNumeral];
    }
};

export default chordGetter;
chordGetter.init('all');
