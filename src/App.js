import React, { useState } from 'react';
import styled from 'styled-components';
//Components
import Header from './components/Header';
import Modal from './components/Modal';
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
    tone: 'C',      //C
    mode: 0,     // Ionian (major)
    interval: 0 // I
  }

  //Fixed Key
  //-1: Key is not fixed
  //0-11: toneNames[]
  const [fixedKey, setFixedKey] = useState(-1);
  //Fixed Mode
  const [fixedMode, setFixedMode] = useState(-1);
  //Modal
  //-1: Closed modal
  //0: Fix key
  //1: Fix mode
  const [modalState, setModalState] = useState(-1)
  const closeModal = () => setModalState(-1);
  const openModalKey = () => setModalState(0);
  const openModalMode = () => setModalState(1);

  const fix = (val) => {
    closeModal();
    val[0] === 'key' ? setFixedKey(val[1]) : setFixedMode(val[1]);
  }

  //Chord list
  const [list, setList] = useState([defaultChord]);
  const maxChords = 12;
  //Functions
  const addChord = () => {
    if (list.length < maxChords) {
      setList([
        ...list, defaultChord
      ])
    }
  }

  const deleteChord = () => {
    if (list.length > 1) {
      setList(list.slice(0, -1))
    }
  }

  return (
    
    <>
      {modalState === -1 ? null :
        <Modal 
        close={closeModal}
        value={modalState}
        fix={fix}
        fixedKey={fixedKey}
        fixedMode={fixedMode}
        ></Modal>}
      <Wrapper>
        <Header />
        <Controls
        modeClick={openModalMode}
        keyClick={openModalKey}
        fixedMode={fixedMode}
        fixedKey={fixedKey}
        />

        {list.map((chord, i) => (

          <Chord
            tone={chord.tone}
            key={i}
            mode={fixedMode === -1 ? chord.mode : fixedMode}
            interval={chord.interval}
            fixedMode={fixedMode}
            fixedKey={fixedKey} />
        ))}

      </Wrapper>

      <Toolbar
        addChord={addChord}
        deleteChord={deleteChord} />
    </>
  );
}

export default App;
