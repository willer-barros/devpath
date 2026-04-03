'use client';

import { Resource } from '../types';
import styles from '../css/resourceCard.module.css';

interface Props {
  resource: Resource;
  isDone: boolean;
  onToggle: (id: number) => void;
}

const trackColor: Record<string, string> = {
  fundamentos: 'green',
  web: 'purple',
  backend: 'orange',
  ferramentas: 'green',
};

export function ResourceCard({ resource, isDone, onToggle }: Props) {
  const color = trackColor[resource.track];

  return (
    <div className={`${styles.card} ${styles[`card--${color}`]} ${isDone ? styles['card--done'] : ''}`}>
      <div className={styles.topBar} />

      <div className={styles.header}>
        <span className={styles.source}>{resource.source}</span>
        <span className={`${styles.badge} ${styles[`badge--${resource.badge}`]}`}>
          {resource.badgeLabel} · {resource.lang.toUpperCase()}
        </span>
      </div>

      <h3 className={styles.title}>{resource.title}</h3>
      <p className={styles.desc}>{resource.desc}</p>

      <div className={styles.footer}>
        <LevelDots level={resource.level} color={color} />
        <div className={styles.actions}>
          <a
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            abrir ↗
          </a>
          <button
            className={`${styles.checkBtn} ${isDone ? styles['checkBtn--done'] : ''}`}
            onClick={() => onToggle(resource.id)}
            aria-label={isDone ? 'Marcar como não concluído' : 'Marcar como concluído'}
          >
            {isDone ? '✓' : '○'}
          </button>
        </div>
      </div>
    </div>
  );
}

function LevelDots({ level, color }: { level: number; color: string }) {
  return (
    <div className={styles.dots}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`${styles.dot} ${i <= level ? styles[`dot--${color}`] : ''}`}
        />
      ))}
    </div>
  );
}