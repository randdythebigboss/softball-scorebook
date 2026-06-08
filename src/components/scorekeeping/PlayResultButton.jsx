import styles from './PlayResultButton.module.css';
import { PLAY_CATEGORIES } from '../../data/playCodes';

const VARIANT_MAP = {
  [PLAY_CATEGORIES.HIT]:      'hit',
  [PLAY_CATEGORIES.WALK]:     'walk',
  [PLAY_CATEGORIES.OUT]:      'out',
  [PLAY_CATEGORIES.ERROR]:    'error',
  [PLAY_CATEGORIES.SACRIFICE]:'sacrifice',
  [PLAY_CATEGORIES.OTHER]:    'other',
};

export default function PlayResultButton({ play, onClick, disabled }) {
  const variant = VARIANT_MAP[play.category] || 'other';
  return (
    <button
      className={`${styles.btn} ${styles[variant]}`}
      onClick={() => onClick(play.code)}
      disabled={disabled}
      title={play.description}
    >
      {play.label}
    </button>
  );
}
