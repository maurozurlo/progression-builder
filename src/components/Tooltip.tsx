import styles from './Tooltip.module.css';

interface TooltipProps {
  chordNotes: string;
  pop: boolean;
}

const Tooltip = (props: TooltipProps) => {
  const className = props.pop ? `${styles.container} ${styles.visible}` : styles.container;
  return <div className={className}>
    {props.chordNotes}
  </div>;
}

export default Tooltip;