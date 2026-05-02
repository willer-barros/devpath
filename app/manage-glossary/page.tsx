'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import styles from '../../css/manageGlossary.module.css';

interface GlossaryTerm {
  id: number;
  term: string;
  definition: string;
}

export default function ManageGlossaryPage() {
  const router = useRouter();
  const { isTeacher, loading: authLoading } = useAuth();

  const [terms, setTerms] = useState<GlossaryTerm[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTerm, setNewTerm] = useState('');
  const [newDef, setNewDef] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!authLoading && !isTeacher) router.push('/login');
  }, [authLoading, isTeacher, router]);

  const fetchTerms = async () => {
    const { data } = await supabase
      .from('glossary')
      .select('*')
      .order('term');
    setTerms(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchTerms(); }, []);

  const handleAdd = async () => {
    setError('');
    setSuccess('');
    if (!newTerm.trim() || !newDef.trim()) {
      setError('Preencha o termo e a definição.');
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from('glossary')
      .insert({ term: newTerm.trim(), definition: newDef.trim() });

    if (error) {
      setError('Erro ao salvar: ' + error.message);
    } else {
      setSuccess('Termo adicionado!');
      setNewTerm('');
      setNewDef('');
      fetchTerms();
    }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Deletar este termo?')) return;
    await supabase.from('glossary').delete().eq('id', id);
    fetchTerms();
  };

  if (authLoading || loading) return null;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <button className={styles.back} onClick={() => router.push('/')}>← voltar</button>
          <h1 className={styles.title}>Gerenciar Glossário</h1>
          <p className={styles.subtitle}>Adicione termos que podem confundir os iniciantes.</p>
        </header>

        {/* Formulário de adição */}
        <div className={styles.form}>
          <div className={styles.group}>
            <label className={styles.label}>Termo *</label>
            <input
              className={styles.input}
              placeholder="Ex: Pull Request"
              value={newTerm}
              onChange={(e) => setNewTerm(e.target.value)}
            />
          </div>
          <div className={styles.group}>
            <label className={styles.label}>Definição *</label>
            <textarea
              className={styles.textarea}
              placeholder="Explique de forma simples para um iniciante..."
              value={newDef}
              onChange={(e) => setNewDef(e.target.value)}
              rows={3}
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.successMsg}>✓ {success}</p>}
          <button className={styles.addBtn} onClick={handleAdd} disabled={saving}>
            {saving ? 'Salvando...' : '+ Adicionar termo'}
          </button>
        </div>

        {/* Lista de termos */}
        <div className={styles.listWrap}>
          <div className={styles.listHeader}>
            <span className={styles.listTitle}>Termos cadastrados</span>
            <span className={styles.listCount}>{terms.length} termos</span>
          </div>

          {terms.length === 0 && (
            <div className={styles.empty}>nenhum termo cadastrado ainda</div>
          )}

          <ul className={styles.list}>
            {terms.map((term) => (
              <li key={term.id} className={styles.item}>
                <div className={styles.itemContent}>
                  <span className={styles.itemTerm}>{term.term}</span>
                  <p className={styles.itemDef}>{term.definition}</p>
                </div>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(term.id)}
                  title="Deletar termo"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
