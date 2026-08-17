import React from 'react';
import styles from './Tooltip.module.css';

const Tooltip = (props) => {
  const className = props.pop ? `${styles.container} ${styles.visible}` : styles.container;
  return <div className={className}>
    {props.chordNotes}
  </div>;
}

export default Tooltip;