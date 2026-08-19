import { ProgressionTemplate, Genre } from '../types/music';

export const genreProgressions: Record<Genre, ProgressionTemplate[]> = {
  blues12: [
    {
      id: 'blues-standard',
      name: 'Standard 12-bar',
      genre: 'blues12',
      degrees: [0, 0, 0, 0, 3, 3, 0, 0, 4, 3, 0, 4],
    },
    {
      id: 'blues-quick-change',
      name: 'Quick change',
      genre: 'blues12',
      degrees: [0, 3, 0, 0, 3, 3, 0, 0, 4, 3, 0, 0],
    },
    {
      id: 'blues-jazzy',
      name: 'Jazzy turnaround',
      genre: 'blues12',
      degrees: [0, 3, 0, 4, 3, 3, 0, 4, 4, 3, 0, 4],
    },
    {
      id: 'blues-minor',
      name: 'Minor blues',
      genre: 'blues12',
      degrees: [0, 0, 0, 0, 3, 3, 0, 0, 4, 3, 0, 4],
    },
  ],
  jazz: [
    { id: 'jazz-ii-V-I', name: 'ii - V - I', genre: 'jazz', degrees: [1, 4, 0] },
    {
      id: 'jazz-rhythm-changes',
      name: 'Rhythm changes A',
      genre: 'jazz',
      degrees: [0, 5, 1, 4],
    },
    {
      id: 'jazz-turnaround',
      name: 'I - vi - ii - V',
      genre: 'jazz',
      degrees: [0, 5, 1, 4],
    },
    {
      id: 'jazz-modal',
      name: 'Modal vamp',
      genre: 'jazz',
      degrees: [1, 1, 1, 1],
    },
    {
      id: 'jazz-descending-ii-Vs',
      name: 'Descending ii-Vs',
      genre: 'jazz',
      degrees: [1, 4, 0, 5, 1, 4, 0],
    },
  ],
  punk: [
    { id: 'punk-I-IV-V', name: 'I - IV - V', genre: 'punk', degrees: [0, 3, 4] },
    {
      id: 'punk-I-V-vi-IV',
      name: 'I - V - vi - IV',
      genre: 'punk',
      degrees: [0, 4, 5, 3],
    },
    {
      id: 'punk-vi-IV-I-V',
      name: 'vi - IV - I - V',
      genre: 'punk',
      degrees: [5, 3, 0, 4],
    },
    {
      id: 'punk-three-chord',
      name: 'Three chord thrash',
      genre: 'punk',
      degrees: [0, 3, 0, 4],
    },
  ],
  reggae: [
    {
      id: 'reggae-one-drop',
      name: 'One drop I - V',
      genre: 'reggae',
      degrees: [0, 4],
    },
    {
      id: 'reggae-classic',
      name: 'I - IV - V - IV',
      genre: 'reggae',
      degrees: [0, 3, 4, 3],
    },
    {
      id: 'reggae-minor',
      name: 'i - VII - VI',
      genre: 'reggae',
      degrees: [0, 6, 5],
    },
    {
      id: 'reggae-skank-prog',
      name: 'I - vi - IV - V',
      genre: 'reggae',
      degrees: [0, 5, 3, 4],
    },
  ],
  metal: [
    { id: 'metal-i-VII', name: 'i - VII (power)', genre: 'metal', degrees: [0, 6] },
    {
      id: 'metal-phrygian',
      name: 'Phrygian i - II',
      genre: 'metal',
      degrees: [0, 1],
    },
    {
      id: 'metal-i-VI-VII',
      name: 'i - VI - VII',
      genre: 'metal',
      degrees: [0, 5, 6],
    },
    {
      id: 'metal-riff-loop',
      name: 'i - iv - VII - v',
      genre: 'metal',
      degrees: [0, 3, 6, 4],
    },
  ],
  ambient: [
    { id: 'ambient-static', name: 'Static I', genre: 'ambient', degrees: [0] },
    {
      id: 'ambient-I-IV',
      name: 'I - IV drift',
      genre: 'ambient',
      degrees: [0, 3],
    },
    {
      id: 'ambient-modal-drift',
      name: 'Modal drift',
      genre: 'ambient',
      degrees: [0, 1, 0, 3],
    },
    {
      id: 'ambient-suspended',
      name: 'i - VI slow',
      genre: 'ambient',
      degrees: [0, 5],
    },
  ],
  pop: [
    {
      id: 'pop-I-V-vi-IV',
      name: 'I - V - vi - IV',
      genre: 'pop',
      degrees: [0, 4, 5, 3],
    },
    {
      id: 'pop-I-vi-IV-V',
      name: 'I - vi - IV - V',
      genre: 'pop',
      degrees: [0, 5, 3, 4],
    },
    {
      id: 'pop-vi-IV-I-V',
      name: 'vi - IV - I - V',
      genre: 'pop',
      degrees: [5, 3, 0, 4],
    },
    {
      id: 'pop-I-IV-vi-V',
      name: 'I - IV - vi - V',
      genre: 'pop',
      degrees: [0, 3, 5, 4],
    },
  ],
  hiphop: [
    { id: 'hiphop-i-VI-loop', name: 'i - VI loop', genre: 'hiphop', degrees: [0, 5] },
    {
      id: 'hiphop-ii-V-loop',
      name: 'ii - V loop',
      genre: 'hiphop',
      degrees: [1, 4],
    },
    {
      id: 'hiphop-i-iv-loop',
      name: 'i - iv loop',
      genre: 'hiphop',
      degrees: [0, 3],
    },
    {
      id: 'hiphop-minor-turn',
      name: 'i - VII - VI - VII',
      genre: 'hiphop',
      degrees: [0, 6, 5, 6],
    },
  ],
};
