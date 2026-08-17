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
    toggleSampler,
    toggleGenerator,
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
