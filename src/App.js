import React from 'react';
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
`

function App() {
  const defaultChord = {
    "tone": 'D',
    "mode": 3,
    "interval": 2
  }

  const fixMode = (val) => {
    console.log(val);
  }

  return (
    <>
      <Wrapper>
        <Header />
        <Controls fixedMode={fixMode} fixedKey={fixMode} />
        <Chord tone={defaultChord.tone} mode={defaultChord.mode} interval={defaultChord.interval} />
      </Wrapper>
      <Toolbar addChord={() => console.log('holis')} />
    </>
  );
}

export default App;
