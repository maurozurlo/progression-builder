import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: absolute;
    bottom: 150%;
    left: 50%;
    margin-bottom: 5px;
    margin-left: -50px;
    padding: 7px;
    width: 90px;
    border-radius: 3px;
    background-color: var(--tooltip);
    color: var(--black);
    content: '';
    text-align: center;
    font-size: 14px;
    line-height: 1.2;
    transform: scaleY(0);
    transition: transform .2s ease;
    transform-origin: 100% 50%;

  &.visible{
    animation: pop 0.3s linear forwards;
  }

  @keyframes pop{
  50%  {transform: scaleY(1.2) scaleX(1);}
  100% {transform: scaleY(1);}
  }

  &:after{
    position: absolute;
    bottom: -15%;
    left: 75%;
    margin-left: -5px;
    width: 0;
    border-top: 5px solid var(--tooltip);
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    content: " ";
    font-size: 0;
    line-height: 0;
  }
`

const Tooltip = (props) => {
  return <Container className={props.pop ? 'visible' : undefined}>
    {props.chordNotes}
  </Container>;
}

export default Tooltip;