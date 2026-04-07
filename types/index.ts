export type Track = 'fundamentos' | 'web' | 'backend' | 'ferramentas' | 'hard';
export type Level = 1 | 2 | 3;
export type Badge = 'free' | 'paid';
export type Lang = 'pt' | 'en';

export interface Resource {
  id: number;
  track: Track;
  source: string;
  title: string;
  desc: string;
  link: string;
  badge: Badge;
  badgeLabel: string;
  level: Level;
  lang: Lang;
}

export interface TrackMeta {
  id: Track;
  label: string;
  number: string;
  color: string;
  accent: string;
}