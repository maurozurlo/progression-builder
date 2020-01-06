import styled from 'styled-components'
import React, { useState } from 'react'

import {toneNames, modeNames} from '../helpers/music'

const ModalContainer = styled.div`
  z-index: 999;
  position: absolute;
  min-width: 100%;
  min-height:100%;
  background: var(--dark-with-transparency);
  display: flex;
  justify-content: center;
  font-size: .7em;

  @media (max-width: 600px) {
    font-size: 1.2em;
  }
  `

const ModalCard = styled.div`
  z-index: 9999;
  background: var(--darker);
  margin-top: 20vh;
  color: var(--light);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 300px;
  height: 200px;
  padding: 0 24px;
  border-radius: 3px;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  & button{
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--light);
    width: 48%;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 1px;
  padding: .3em 1em;
  border: 1px solid var(--darker);
  transition: background-color .5s ease-in, color .5s ease-in;
  
  &.pressed{
	background-color: var(--darker);
  }

  &.outline{
    border: 1px solid var(--light);
    background-color: transparent;
    :hover{
      cursor: pointer;
      background: var(--dark);
    }
  }
  &.primary{
    background-color: var(--primary);
    border: 1px solid var(--primary);
    color: var(--dark);
    :hover{
      background-color: var(--dark);
      cursor: pointer;
      color: var(--primary);
    }
  }
}
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  width: 100%;
`
const SelectInput = styled.select`
  background-color: var(--dark);
  color: var(--light);
  border-radius: 5px;
  border: 2px solid var(--darker);
  appearance: none;
  padding: 8px;
  min-width: 100%;
`;



const Modal = (props) => {
  //Input
  const handleInput = (e) => {
    switch(e.target.title){
      case 'mode':
        setFixedMode(e.target.value);
        break;
      case 'key':
        setFixedKey(e.target.value);
        break;
      default:
        return null;
    }
  }

  const [fixedKey, setFixedKey] = useState(-1);
  const [fixedMode, setFixedMode] = useState(-1);

  const returnEitherKeyOrMode = () => {
    let val = [];
    props.value === 0 ? val = ['key',fixedKey] : val = ['mode',fixedMode];
    return val;
  }
  
  return (
    <ModalContainer>
      
      <ModalCard>
        {/* Fixed Mode */}
        <InputContainer>
          <label>Fixed {props.value === 0 ? 'Key' : 'Mode'}</label>
          {
            props.value === 0 ? (
          <SelectInput title='key' onChange={handleInput} autoFocus>
            <option value={-1}>None</option>
            {toneNames.map((tone, i) => (
              <option key={'t' + i}  value={tone}>{tone}</option>
            ))}
          </SelectInput>) :
          <SelectInput title='mode' onChange={handleInput}>
          <option value={-1}>Mixed</option>
            {modeNames.map((mode, i) => (
              <option key={'m' + i} value={i}>{mode}</option>
            ))}
          </SelectInput>
          }
        </InputContainer>
        {/* Fixed Key */}

        <ButtonContainer>
          <button className="outline" onClick={props.close} >Cancel</button>
          <button className="primary" onClick={() => props.fix(returnEitherKeyOrMode())}>OK</button>
        </ButtonContainer>
      </ModalCard>
    </ModalContainer>
  )
}

export default Modal