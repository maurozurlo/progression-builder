import React, { useState } from 'react'
import styled from 'styled-components';

import { intervalNames, modeNames, toneNames, calculateChord, getChordInScale } from '../helpers/music'

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
  const [chord, setChord] = useState(calculateChord(props.tone, props.mode, props.interval));
  //Chord list
  const [chordList, setChordList] = useState(getChordInScale(props.tone,props.mode));

  //TODO: Find out if there's a better way to do this
  const changeKey = (e) => {
    setChordTone(e.target.value);
    setChord(calculateChord(e.target.value,chordMode,chordInterval));
    setChordList(getChordInScale(e.target.value,chordMode));
  }

  const changeMode = (e) => {
    setChordMode(e.target.value);
    setChord(calculateChord(chordTone,e.target.value,chordInterval));
    setChordList(getChordInScale(chordTone,e.target.value));
  }

  const changeInterval = (e) => {
    setChordInterval(e.target.value);
    setChord(calculateChord(chordTone,chordMode,e.target.value));
  }

  return (
    <Container>
      <Wrapper>
        <InputContainer>
          <Title>KEY</Title>
          <SelectInput onChange={changeKey} value={chordTone}>
            {toneNames.map((tone, i) => (
              <option key={'t' + i}  value={tone}>{tone}</option>
            ))}
          </SelectInput>
        </InputContainer>

        <InputContainer>
          <Title>MODE</Title>
          <SelectInput onChange={changeMode} value={chordMode}>
            {modeNames.map((mode, i) => (
              <option key={'m' + i} value={i}>{mode}</option>
            ))}
          </SelectInput>
        </InputContainer>

        <InputContainer>
          <Title>INTERVAL</Title>
          <SelectInput onChange={changeInterval}  value={chordInterval}>
            {intervalNames.map((interval, i) => (
              <option key={'i' + i}  value={i}>{interval}</option>
            ))}
          </SelectInput>
        </InputContainer>

        <InputContainer>
          <Title>CHORD</Title>
          <GeneratedChord>{chord}</GeneratedChord>
        </InputContainer>

      </Wrapper>

      <ChordsInScale>
        {chordList}
      </ChordsInScale>
    </Container>)
}

export default Chord;