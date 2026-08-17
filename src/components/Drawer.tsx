import { ReactNode } from 'react';
import styles from './Drawer.module.css';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Drawer = ({ open, onClose, title, children }: DrawerProps) => {
  return (
    <div
      className={`${styles.drawer} ${open ? styles.open : ''}`}
      aria-hidden={!open}
    >
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>{title}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>
        <div className={styles.panelContent}>{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
