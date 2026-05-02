'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { TrackMeta } from '../../types';
import styles from '../../css/addResource.module.css';

export default function AddResourcePage() {
  const router = useRouter();
  const { isTeacher, loading: authLoading } = useAuth();

  const [tracks, setTracks] = useState<TrackMeta[]>([]);
  const [newTrack, setNewTrack] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    track: '',
    newTrackId: '',
    newTrackLabel: '',
    newTrackNumber: '',
    newTrackAccent: '#00D084',
    source: '',
    title: '',
    descricao: '',
    link: '',
    badge: 'free',
    badge_label: 'Grátis',
    level: '1',
    lang: 'pt',
  });

  useEffect(() => {
    if (!authLoading && !isTeacher) router.push('/login');
  }, [authLoading, isTeacher, router]);

  useEffect(() => {
    supabase.from('tracks').select('*').order('number').then(({ data }) => {
      if (data) setTracks(data);
    });
  }, []);

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    setError('');
    setSubmitting(true);

    // Cria nova track se necessário
    if (newTrack) {
      if (!form.newTrackId || !form.newTrackLabel || !form.newTrackNumber) {
        setError('Preencha todos os campos da nova trilha.');
        setSubmitting(false);
        return;
      }
      const { error: trackError } = await supabase.from('tracks').insert({
        id: form.newTrackId.toLowerCase().replace(/\s+/g, '-'),
        label: form.newTrackLabel,
        number: form.newTrackNumber,
        color: 'track-green',
        accent: form.newTrackAccent,
      });
      if (trackError) {
        setError('Erro ao criar trilha: ' + trackError.message);
        setSubmitting(false);
        return;
      }
    }

    const trackId = newTrack
      ? form.newTrackId.toLowerCase().replace(/\s+/g, '-')
      : form.track;

    if (!trackId || !form.source || !form.title || !form.descricao || !form.link) {
      setError('Preencha todos os campos obrigatórios.');
      setSubmitting(false);
      return;
    }

    const { error: insertError } = await supabase.from('resources').insert({
      track: trackId,
      source: form.source,
      title: form.title,
      descricao: form.descricao,
      link: form.link,
      badge: form.badge,
      badge_label: form.badge_label,
      level: parseInt(form.level),
      lang: form.lang,
    });

    if (insertError) {
      setError('Erro ao salvar recurso: ' + insertError.message);
      setSubmitting(false);
      return;
    }

    setSuccess(true);
    setSubmitting(false);
    setTimeout(() => router.push('/'), 1500);
  };

  if (authLoading) return null;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <button className={styles.back} onClick={() => router.push('/')}>← voltar</button>
          <h1 className={styles.title}>Adicionar recurso</h1>
          <p className={styles.subtitle}>Preencha os dados do novo treinamento.</p>
        </header>

        <div className={styles.form}>
          {/* Trilha */}
          <div className={styles.group}>
            <label className={styles.label}>Trilha *</label>
            <div className={styles.row}>
              <select
                className={styles.select}
                value={form.track}
                onChange={(e) => set('track', e.target.value)}
                disabled={newTrack}
              >
                <option value="">Selecione uma trilha</option>
                {tracks.map((t) => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
              <button
                type="button"
                className={`${styles.toggleBtn} ${newTrack ? styles.active : ''}`}
                onClick={() => setNewTrack(!newTrack)}
              >
                {newTrack ? '× cancelar nova trilha' : '+ nova trilha'}
              </button>
            </div>
          </div>

          {newTrack && (
            <div className={styles.newTrackBox}>
              <div className={styles.group}>
                <label className={styles.label}>ID da trilha (sem espaços) *</label>
                <input className={styles.input} placeholder="ex: mobile" value={form.newTrackId} onChange={(e) => set('newTrackId', e.target.value)} />
              </div>
              <div className={styles.group}>
                <label className={styles.label}>Nome da trilha *</label>
                <input className={styles.input} placeholder="ex: Mobile Development" value={form.newTrackLabel} onChange={(e) => set('newTrackLabel', e.target.value)} />
              </div>
              <div className={styles.row}>
                <div className={styles.group} style={{ flex: 1 }}>
                  <label className={styles.label}>Número *</label>
                  <input className={styles.input} placeholder="ex: 05" value={form.newTrackNumber} onChange={(e) => set('newTrackNumber', e.target.value)} />
                </div>
                <div className={styles.group} style={{ flex: 1 }}>
                  <label className={styles.label}>Cor accent</label>
                  <input type="color" className={styles.colorInput} value={form.newTrackAccent} onChange={(e) => set('newTrackAccent', e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* Source */}
          <div className={styles.group}>
            <label className={styles.label}>Fonte / Plataforma *</label>
            <input className={styles.input} placeholder="ex: freeCodeCamp, Harvard, Rocketseat" value={form.source} onChange={(e) => set('source', e.target.value)} />
          </div>

          {/* Title */}
          <div className={styles.group}>
            <label className={styles.label}>Título *</label>
            <input className={styles.input} placeholder="Nome do curso ou recurso" value={form.title} onChange={(e) => set('title', e.target.value)} />
          </div>

          {/* Descrição */}
          <div className={styles.group}>
            <label className={styles.label}>Descrição *</label>
            <textarea className={styles.textarea} placeholder="Descreva brevemente o que o aluno vai aprender..." value={form.descricao} onChange={(e) => set('descricao', e.target.value)} rows={3} />
          </div>

          {/* Link */}
          <div className={styles.group}>
            <label className={styles.label}>Link *</label>
            <input className={styles.input} type="url" placeholder="https://..." value={form.link} onChange={(e) => set('link', e.target.value)} />
          </div>

          {/* Badge + Label */}
          <div className={styles.row}>
            <div className={styles.group} style={{ flex: 1 }}>
              <label className={styles.label}>Tipo</label>
              <select className={styles.select} value={form.badge} onChange={(e) => set('badge', e.target.value)}>
                <option value="free">Gratuito</option>
                <option value="paid">Pago</option>
              </select>
            </div>
            <div className={styles.group} style={{ flex: 1 }}>
              <label className={styles.label}>Label do badge</label>
              <input className={styles.input} placeholder="ex: Grátis, Freemium" value={form.badge_label} onChange={(e) => set('badge_label', e.target.value)} />
            </div>
          </div>

          {/* Level + Lang */}
          <div className={styles.row}>
            <div className={styles.group} style={{ flex: 1 }}>
              <label className={styles.label}>Nível</label>
              <select className={styles.select} value={form.level} onChange={(e) => set('level', e.target.value)}>
                <option value="1">1 — Iniciante</option>
                <option value="2">2 — Intermediário</option>
                <option value="3">3 — Avançado</option>
              </select>
            </div>
            <div className={styles.group} style={{ flex: 1 }}>
              <label className={styles.label}>Idioma</label>
              <select className={styles.select} value={form.lang} onChange={(e) => set('lang', e.target.value)}>
                <option value="pt">Português</option>
                <option value="en">Inglês</option>
              </select>
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.successMsg}>✓ Recurso adicionado! Redirecionando...</p>}

          <button className={styles.submit} onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Salvando...' : 'Salvar recurso'}
          </button>
        </div>
      </div>
    </main>
  );
}