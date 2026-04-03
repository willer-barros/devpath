'use client';

import { useState } from 'react';
import { Track } from '../types';
import { resources, tracks } from '../types/resources';
import { useProgress } from '../types/useProgress'
import { FilterPills } from '../components/filterPills';
import { ProgressBar } from '../components/progressbar';
import { ResourceCard } from '../components/resourceCard';
import styles from '../css/roadMapClient.module.css';

export function RoadmapClient() {
  const [filter, setFilter] = useState<Track | 'all'>('all');
  const { isDone, toggle, mounted } = useProgress();

  const filtered = filter === 'all' ? resources : resources.filter((r) => r.track === filter);
  const doneCount = mounted ? filtered.filter((r) => isDone(r.id)).length : 0;

  const visibleTracks =
    filter === 'all' ? tracks : tracks.filter((t) => t.id === filter);

  return (
    <div className={styles.root}>
      <FilterPills active={filter} onChange={setFilter} />
      <ProgressBar done={doneCount} total={filtered.length} />

      {visibleTracks.map((track) => {
        const items = filtered.filter((r) => r.track === track.id);
        if (!items.length) return null;

        return (
          <section key={track.id} className={styles.section}>
            <div className={styles.trackTitle}>
              <span className={styles.trackNumber}>{track.number}</span>
              <span className={styles.trackLabel}>{track.label}</span>
              <div className={styles.trackLine} />
            </div>

            <div className={styles.grid}>
              {items.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  isDone={mounted ? isDone(resource.id) : false}
                  onToggle={toggle}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}