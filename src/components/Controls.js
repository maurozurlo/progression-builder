import React, { useState } from 'react'
import styled from 'styled-components';

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
    props.fixedKey(!pressedKey);
  }
  //Mode
  const [pressedMode, setPressedMode] = useState(false);

  const editClassM = () => {
    !pressedMode ? setPressedMode(true) : setPressedMode(false);
    props.fixedMode(!pressedMode);
  }

  return (
    <MainControls>
      <button onClick={editClassK} 
              className={pressedKey ? 'pressed' : undefined}>
      <strong>Key:</strong> {pressedKey ?  'Fixed' : 'Mixed'}
				</button>
    <button  onClick={editClassM} 
              className={pressedMode ? 'pressed' : undefined}>
      <strong>Mode:</strong> {pressedMode ?  'Fixed' : 'Mixed'}
				</button>
        </MainControls>)
}

export default Controls;