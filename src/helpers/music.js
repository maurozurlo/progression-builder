//Intervals
export const intervalNames = ['I (T)', 'II (SD)', 'III (T)', 'IV (SD)', 'V (D)', 'VI (T)', 'VII (D)'];

//Modes
export const modeNames = ["Ionian (Major)", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian"];
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
  return note += modes[mode][interval][1];
}

const checkifHigherThanTwelve = (val) => {
  if (val > 11) {
    val -= 12;
  }
  return val;
}


export default {
  intervalNames,
  modeNames,
  toneNames,
  calculateChord
}