import React, { useState } from 'react';
import styled from 'styled-components';
//Components
import Header from './components/Header';
import Controls from './components/Controls';
import Chord from './components/Chord';
import Toolbar from './components/Toolbar';

const Wrapper = styled.div`
  max-width: var(--max-width);
  width: 100%;
  min-height: 100%;
  margin: 0 auto;
  padding-bottom: 10vh;
`

function App() {
  const defaultChord = {
    tone: 'C',
    mode: 0, //major
    interval: 0
  }

  const [list, setList] = useState([defaultChord]);
  const maxChords = 12;

  const fixMode = (val) => {
    console.log(val);
  }

  const addChord = () => {
    if (list.length < maxChords) {
      setList([
        ...list, defaultChord
      ])
    }
  }

  const deleteChord = () => {
    if (list.length > 1) {
      setList(list.slice(0,-1))
    }
  }

  return (
    <>
      <Wrapper>
        <Header />
        <Controls fixedMode={fixMode} fixedKey={fixMode} />
        {list.map((chord, i) => (
          <Chord tone={chord.tone} key={i} mode={chord.mode} interval={chord.interval} />
        ))}
      </Wrapper>
      <Toolbar addChord={addChord} deleteChord={deleteChord}/>
    </>
  );
}

export default App;
