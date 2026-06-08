import styles from './Card.module.css';

export default function Card({ children, className = '', padding = 'md', onClick, hoverable = false }) {
  return (
    <div
      className={[
        styles.card,
        styles[`pad-${padding}`],
        hoverable ? styles.hoverable : '',
        onClick ? styles.clickable : '',
        className,
      ].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
