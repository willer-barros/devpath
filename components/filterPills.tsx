'use client';

import { Track } from '../types';
import { tracks } from '../types/resources';
import styles from '../css/filterPills.module.css';

interface Props {
  active: Track | 'all';
  onChange: (filter: Track | 'all') => void;
}

export function FilterPills({ active, onChange }: Props) {
  return (
    <div className={styles.wrap}>
      <span className={styles.label}>trilha</span>

      <button
        className={`${styles.pill} ${active === 'all' ? styles['pill--active-green'] : ''}`}
        onClick={() => onChange('all')}
      >
        Todos
      </button>

      {tracks.map((track) => {
        const isActive = active === track.id;
        const colorClass =
          track.id === 'web' || track.id === 'backend'
            ? styles['pill--active-purple']
            : styles['pill--active-green'];

        return (
          <button
            key={track.id}
            className={`${styles.pill} ${isActive ? colorClass : ''}`}
            onClick={() => onChange(track.id)}
          >
            {track.label}
          </button>
        );
      })}
    </div>
  );
}