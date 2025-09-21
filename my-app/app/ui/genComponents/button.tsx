'use client';
import styles from '../componentStyles/button.module.css';

export default function Button({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
}