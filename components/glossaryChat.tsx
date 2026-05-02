'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import styles from '../css/glossaryChat.module.css';

interface GlossaryTerm {
  id: number;
  term: string;
  definition: string;
}

export function GlossaryChat() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GlossaryTerm[]>([]);
  const [selected, setSelected] = useState<GlossaryTerm | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (!open) {
      setQuery('');
      setResults([]);
      setSelected(null);
    }
  }, [open]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelected(null);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      const { data } = await supabase
        .from('glossary')
        .select('*')
        .ilike('term', `%${query}%`)
        .order('term')
        .limit(8);
      setResults(data || []);
      setSelected(null);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <>
      {/* Botão flutuante */}
      <button
        className={`${styles.fab} ${open ? styles.fabOpen : ''}`}
        onClick={() => setOpen(!open)}
        title="Glossário — tire suas dúvidas"
        aria-label="Abrir glossário"
      >
        {open ? '×' : '?'}
      </button>

      {/* Painel */}
      {open && (
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>Glossário</span>
            <span className={styles.panelSubtitle}>Digite um termo para buscar</span>
          </div>

          <div className={styles.searchWrap}>
            <input
              ref={inputRef}
              className={styles.searchInput}
              placeholder='Ex: "PR", "commit", "deploy"...'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className={styles.body}>
            {/* Resultado selecionado */}
            {selected && (
              <div className={styles.definition}>
                <div className={styles.defHeader}>
                  <button className={styles.backBtn} onClick={() => setSelected(null)}>← voltar</button>
                  <span className={styles.defTerm}>{selected.term}</span>
                </div>
                <p className={styles.defText}>{selected.definition}</p>
              </div>
            )}

            {/* Lista de resultados */}
            {!selected && query.trim() && (
              <>
                {loading && (
                  <div className={styles.empty}>
                    <span className={styles.emptyText}>buscando...</span>
                  </div>
                )}
                {!loading && results.length === 0 && (
                  <div className={styles.empty}>
                    <span className={styles.emptyText}>nenhum termo encontrado</span>
                    <span className={styles.emptyHint}>tente outras palavras</span>
                  </div>
                )}
                {!loading && results.length > 0 && (
                  <ul className={styles.list}>
                    {results.map((term) => (
                      <li key={term.id}>
                        <button
                          className={styles.termBtn}
                          onClick={() => setSelected(term)}
                        >
                          <span className={styles.termName}>{term.term}</span>
                          <span className={styles.termArrow}>→</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}

            {/* Estado inicial */}
            {!selected && !query.trim() && (
              <div className={styles.empty}>
                <span className={styles.emptyIcon}>📖</span>
                <span className={styles.emptyText}>dúvida com algum termo?</span>
                <span className={styles.emptyHint}>digite acima para buscar</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}