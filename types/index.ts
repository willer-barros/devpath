export type Track = string; // agora dinâmico vindo do Supabase
export type Level = 1 | 2 | 3;
export type Badge = 'free' | 'paid';
export type Lang = 'pt' | 'en';

export interface Resource {
  id: number;
  track: Track;
  source: string;
  title: string;
  descricao: string;
  link: string;
  badge: Badge;
  badge_label: string;
  level: Level;
  lang: Lang;
  created_at?: string;
}

export interface TrackMeta {
  id: string;
  label: string;
  number: string;
  color: string;
  accent: string;
  created_at?: string;
}

export interface TeacherProfile {
  id: string;
  email: string;
  created_at?: string;
}