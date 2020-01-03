import React, { useState } from 'react'
import styled from 'styled-components';

import * as theory from '../helpers/music'
import Tooltip from './Tooltip'

const Container = styled.div`
  font-size: .7em;

  
  label{
    font-size: .7em;  
  }

  @media (max-width: 600px) {
    font-size: 1.4em;

      label{
        font-size: .7em;  
      }
    }
`
const Wrapper = styled.div`
  display: grid;
  background-color: var(--black);
  color: var(--white);
  grid-template-columns: 1fr 2fr 1fr 1fr;
  padding: 5px 0;
`
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: space-between;
`
const Title = styled.label`
	height: 30%;
`
const SelectInput = styled.select`
  background-color: var(--dark);
  color: var(--light);
  border-radius: 5px;
  border: 2px solid var(--darker);
  text-align: center;
  text-align-last: center;
  appearance: none;
  padding: 8px;
`;
const GeneratedChord = styled.span`
  display: inline-flex;
  align-items: center;
  background-color: var(--dark);
  color: var(--light);
  border-radius: 5px;
  border: 2px solid var(--darker);
  justify-content: center;
  width: 70%;
  padding: 8px;
  position: relative;
`;

const ChordsInScale = styled.div`
    background: var(--darker);
    color: var(--white);
    padding: 5px;
    text-align: center;
    font-size: .8em;
`

const Chord = (props) => {
  //Key
  const [chordTone, setChordTone] = useState(props.tone);
  //Mode
  const [chordMode, setChordMode] = useState(props.mode);
  //Interval
  const [chordInterval, setChordInterval] = useState(props.interval);
  //Current chord
  const [chord, setChord] = useState(theory.calculateChord(props.tone, props.mode, props.interval));
  //Chord list
  const [chordList, setChordList] = useState(theory.getChordInScale(props.tone,props.mode));
  //Chord notes
  const [notesInChord, setNotesInChord] = useState(theory.getNotesInChord(chord));
  //Show tooltip
  const [showTooltip,setShowTooltip] = useState(false);
  //Find out if there's a cleaner way to do this
  const updateChord = (e) => {
    let newChord;
    switch(e.target.title){
      case 'key':
        newChord = theory.calculateChord(e.target.value,chordMode,chordInterval);
        setChordTone(e.target.value);
        setChordList(theory.getChordInScale(e.target.value,chordMode));
      break;
      case 'mode':
        newChord = theory.calculateChord(chordTone,e.target.value,chordInterval);
        setChordMode(e.target.value);
        setChordList(theory.getChordInScale(chordTone,e.target.value));
      break;
      case 'interval':
        newChord = theory.calculateChord(chordTone,chordMode,e.target.value);
        setChordInterval(e.target.value);
      break;
      default:
        newChord = 'ERR';
      break;
    }
    setChord(newChord);
    updateNotes(newChord);
  }

  const updateNotes = (chord) =>{
    setNotesInChord(theory.getNotesInChord(chord))
  }

  const handleClick = () => {
    setShowTooltip(!showTooltip);
  }

  return (
    <Container>
      <Wrapper>
        <InputContainer>
          <Title>KEY</Title>
          <SelectInput title='key' onChange={updateChord} value={chordTone}>
            {theory.toneNames.map((tone, i) => (
              <option key={'t' + i}  value={tone}>{tone}</option>
            ))}
          </SelectInput>
        </InputContainer>

        <InputContainer>
          <Title>MODE</Title>
          <SelectInput title='mode' onChange={updateChord} value={chordMode}>
            {theory.modeNames.map((mode, i) => (
              <option key={'m' + i} value={i}>{mode}</option>
            ))}
          </SelectInput>
        </InputContainer>

        <InputContainer>
          <Title>INTERVAL</Title>
          <SelectInput title='interval' onChange={updateChord}  value={chordInterval}>
            {theory.intervalNames.map((interval, i) => (
              <option key={'i' + i}  value={i}>{interval}</option>
            ))}
          </SelectInput>
        </InputContainer>

        <InputContainer>
          <Title>CHORD</Title>
          
          <GeneratedChord onClick={() => handleClick()}>
            {showTooltip ? <Tooltip chordNotes={notesInChord}/> : undefined}
             {chord}</GeneratedChord>
        </InputContainer>

      </Wrapper>

      <ChordsInScale>
        {chordList}
      </ChordsInScale>
    </Container>)
}

export default Chord;