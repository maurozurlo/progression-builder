import styles from './App.module.css';
//Components
import Header from './components/Header';
import Modal from './components/Modal';
import Controls from './components/Controls';
import Chord from './components/Chord';
import Toolbar from './components/Toolbar';
import Drawer from './components/Drawer';
import SamplerDrawer from './components/SamplerDrawer';
import GeneratorDrawer from './components/GeneratorDrawer';
import BassDrawer from './components/BassDrawer';
import DrumDrawer from './components/DrumDrawer';
import MelodyDrawer from './components/MelodyDrawer';
import {
  ProgressionProvider,
  useProgressionContext,
} from './context/ProgressionContext';

const Layout = () => {
  const {
    list,
    modalState,
    samplerOpen,
    generatorOpen,
    bassOpen,
    drumsOpen,
    melodyOpen,
    toggleSampler,
    toggleGenerator,
    toggleBass,
    toggleDrums,
    toggleMelody,
  } = useProgressionContext();

  return (
    <>
      {modalState === -1 ? null : <Modal></Modal>}
      <div className={styles.columns}>
        <Drawer
          open={generatorOpen}
          onClose={toggleGenerator}
          title="Generator"
        >
          <GeneratorDrawer />
        </Drawer>

        <div className={styles.wrapper}>
          <Header />
          <Controls />

          {list.map((_chord, i) => (
            <Chord key={i} index={i} />
          ))}
        </div>

        <Drawer open={samplerOpen} onClose={toggleSampler} title="Sampler">
          <SamplerDrawer />
        </Drawer>

        <Drawer open={bassOpen} onClose={toggleBass} title="Bass">
          <BassDrawer />
        </Drawer>

        <Drawer open={drumsOpen} onClose={toggleDrums} title="Drums">
          <DrumDrawer />
        </Drawer>

        <Drawer open={melodyOpen} onClose={toggleMelody} title="Melody">
          <MelodyDrawer />
        </Drawer>
      </div>

      <Toolbar />
    </>
  );
};

function App() {
  return (
    <ProgressionProvider>
      <Layout />
    </ProgressionProvider>
  );
}

export default App;
