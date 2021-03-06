//Intervals
export const intervalNames = ['I (T)', 'II (SD)', 'III (T)', 'IV (SD)', 'V (D)', 'VI (T)', 'VII (D)'];

//Modes
export const modeNames = ["Ionian (Major)", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian (Minor)", "Locrian"];
//Modes are saved as multidimensional arrays, where each interval has two values:
//[0] Semitones from the root
//[1] Quality of the chord
const major = [[0, ''], [2, 'm'], [4, 'm'], [5, ''], [7, ''], [9, 'm'], [11, 'dim']];
const dorian = [[0, 'm'], [2, 'm'], [3, ''], [5, ''], [7, 'm'], [9, 'dim'], [10, '']];
const phrygian = [[0, 'm'], [1, ''], [3, ''], [5, 'm'], [7, 'dim'], [8, ''], [10, 'm']];
const lydian = [[0, ''], [2, ''], [4, 'm'], [6, 'dim'], [7, ''], [9, 'm'], [11, 'm']];
const myxolydian = [[0, ''], [2, 'm'], [4, 'dim'], [5, ''], [7, 'm'], [9, 'm'], [10, '']];
const aeolian = [[0, 'm'], [2, 'dim'], [3, ''], [5, 'm'], [7, 'm'], [8, ''], [10, '']];
const locrian = [[0, 'dim'], [1, ''], [3, 'm'], [5, 'm'], [6, ''], [8, ''], [10, 'm']];
//Saving the all mode arrays in a bigger array for further use
const modes = [major, dorian, phrygian, lydian, myxolydian, aeolian, locrian];

//Chromatic scale / Note names
export const toneNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const calculateChord = (key, mode, interval) => {
  let tone = toneNames.findIndex((element) => element === key);
  let note = toneNames[checkifHigherThanTwelve(tone + modes[mode][interval][0])];
  return `${note}${modes[mode][interval][1]}`;
}

export const getChordInScale = (key, mode) => {
  let list = [];

  modes[mode].map(interval => {
    let tone = toneNames.findIndex((element) => element === key);
    let note = toneNames[checkifHigherThanTwelve(tone + interval[0])];
    return list.push(`${note}${interval[1]} `);
  })
  return list;
}

export const getNotesInChord = (chord) =>{
  let list = [];
  //Intervals
  const majorChord = [0,4,7];
  const minorChord = [0,3,7];
  const dimChord = [0,3,6,9];
  //Get Tonic of chord
  let toneInWords = chord[0];
  let isSharp = false;
  if(chord[1] === '#'){
    toneInWords += '#';
    isSharp = true;
  };
  //Get quality of the chord
  let qualityNotes = [];
  //This ternary checks if the Chord is sharp, in which case we should look for the third character of the string and not the second
  let arrayIndex = isSharp ? 2 : 1;
     switch(chord[arrayIndex]){
    case undefined:
      qualityNotes = majorChord;
      break;
    case 'm':
      qualityNotes = minorChord;
      break;
    case 'd':
      qualityNotes = dimChord;
      break;
    default:
      qualityNotes = majorChord;
  }
  //Get array value of root
  let tone = toneNames.findIndex((element) => element === toneInWords);
  //Map through the intervals to get the note names in a list
  qualityNotes.forEach(interval => {
    list.push(toneNames[checkifHigherThanTwelve(tone + interval)]);
  });
  //Get all the notes and turn them into a string
  let formattedString = '';
  //Map through the list of notes and only add a space if it's not the last note of the list
  list.forEach((note, i) => {
    i !== list.length-1 ? formattedString += `${note} ` : formattedString += `${note}`;
  })
  //Return the string
  return formattedString;
}

const checkifHigherThanTwelve = (val) => {
  if (val > 11) {
    val -= 12;
  }
  return val;
}

export const getIndexOfNote = (val) =>{
  let tone = toneNames.findIndex((element) => element === val);
  return tone;
}

export default {
  intervalNames,
  modeNames,
  toneNames,
  calculateChord,
  getChordInScale,
  getNotesInChord
}