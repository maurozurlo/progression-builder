import React, { useState } from 'react'
import styled from 'styled-components';
import { modeNames } from '../helpers/music'

const MainControls = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
  
	background-color: var(--dark) !important;
  font-size: .6em;

  & button{
    color: var(--light);
    width: 50%;
	text-transform: uppercase;
  letter-spacing: 1px;
  padding: 1em;
  border: 1px solid var(--darker);
  
  &.pressed{
	background-color: var(--darker);
	transition: .5s;
  }
}

@media (max-width: 600px) {
    font-size: 1em;
  }
`

const Controls = (props) => {
  //Key
  const [pressedKey, setPressedKey] = useState(false);

  const editClassK = () => {
    !pressedKey ? setPressedKey(true) : setPressedKey(false);
    props.keyClick(!pressedKey);
  }
  //Mode
  const [pressedMode, setPressedMode] = useState(false);

  const editClassM = () => {
    !pressedMode ? setPressedMode(true) : setPressedMode(false);
    props.modeClick(!pressedMode);
  }

  return (
    <MainControls>
      <button onClick={editClassK} 
              className={props.fixedKey !== -1 ? 'pressed' : undefined}>
      <strong>Key:</strong> {props.fixedKey !== -1 ?  props.fixedKey : 'Mixed'}
				</button>
    <button  onClick={editClassM} 
              className={props.fixedMode !== -1 ? 'pressed' : undefined}>
      <strong>Mode:</strong> {props.fixedMode !== -1 ?  modeNames[props.fixedMode] : 'Mixed'}
				</button>
        </MainControls>)
}

export default Controls;