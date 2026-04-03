'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'devpath-done';

export function useProgress() {
  const [done, setDone] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setDone(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const toggle = (id: number) => {
    setDone((prev) => {
      const next = prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const isDone = (id: number) => done.includes(id);

  return { done, toggle, isDone, mounted };
}