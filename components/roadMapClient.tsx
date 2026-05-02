'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../types/useProgress';
import { FilterPills } from '../components/filterPills';
import { ProgressBar } from '../components/progressbar';
import { ResourceCard } from '../components/resourceCard';
import { Resource, TrackMeta } from '../types';
import styles from '../css/roadMapClient.module.css';

export function RoadmapClient() {
  const router = useRouter();
  const { isTeacher } = useAuth();
  const [filter, setFilter] = useState<string>('all');
  const [resources, setResources] = useState<Resource[]>([]);
  const [tracks, setTracks] = useState<TrackMeta[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const { isDone, toggle, mounted } = useProgress();

  useEffect(() => {
    const fetchData = async () => {
      const [{ data: resourcesData }, { data: tracksData }] = await Promise.all([
        supabase.from('resources').select('*').order('id'),
        supabase.from('tracks').select('*').order('number'),
      ]);
      if (resourcesData) setResources(resourcesData);
      if (tracksData) setTracks(tracksData);
      setFetchLoading(false);
    };
    fetchData();
  }, []);

  const filtered = filter === 'all' ? resources : resources.filter((r) => r.track === filter);
  const doneCount = mounted ? filtered.filter((r) => isDone(r.id)).length : 0;
  const visibleTracks = filter === 'all' ? tracks : tracks.filter((t) => t.id === filter);

  if (fetchLoading) {
    return (
      <div className={styles.loading}>
        <span className={styles.loadingText}>carregando recursos...</span>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.topBar}>
        <FilterPills active={filter} onChange={setFilter} tracks={tracks} />
        {isTeacher && (
          <button
            className={styles.addBtn}
            onClick={() => router.push('/add-resource')}
            title="Adicionar recurso"
          >
            +
          </button>
        )}
      </div>

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