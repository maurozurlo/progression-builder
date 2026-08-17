import React from 'react';
import styled from 'styled-components';

import add from '../img/add.svg';
import del from '../img/delete.svg';

const Container = styled.div`
  position: fixed;
  bottom: -10px;
  min-width: 100%;
  min-height: 10vh;
`

const Wrapper = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: space-around;
  background-color: var(--dark-with-transparency);
  max-width:  var(--max-width);
  width: 100%;
  margin: 0 auto;

  button>img{
    max-width: 48px;
  }
`

const Toolbar = (props) => {
  return (
    <Container>
      <Wrapper>
        <button onClick={props.addChord}>
          <img src={add} alt="Add chord" />
        </button>
        <button onClick={props.deleteChord}>
          <img src={del} alt="Delete chord" />
        </button>
      </Wrapper>
    </Container>)
}

export default Toolbar;