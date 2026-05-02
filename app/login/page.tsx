'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import styles from '../../css/login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError('E-mail ou senha incorretos.');
    else router.push('/');
    setLoading(false);
  };

  const handleRegister = async () => {
    setLoading(true);
    setError('');

    if (secretKey !== process.env.NEXT_PUBLIC_SECRET_KEY) {
      setError('Chave secreta inválida.');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error || !data.user) {
      setError('Erro ao criar conta. Tente novamente.');
      setLoading(false);
      return;
    }

    // Registra como professor
    const { error: profileError } = await supabase
      .from('teacher_profiles')
      .insert({ id: data.user.id, email });

    if (profileError) {
      setError('Erro ao registrar perfil de professor.');
      setLoading(false);
      return;
    }

    router.push('/');
    setLoading(false);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logoRow}>
            <div className={styles.logoIcon}>&gt;_</div>
            <h1 className={styles.logoText}>
              Dev<span className={styles.logoAccent}>Route</span>
            </h1>
          </div>
          <p className={styles.tagline}>
            {mode === 'login' ? 'Acesse sua conta.' : 'Crie sua conta de professor.'}
          </p>
        </header>

        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>E-mail</label>
            <input
              type="email"
              className={styles.input}
              placeholder="professor@devroute.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Senha</label>
            <input
              type="password"
              className={styles.input}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {mode === 'register' && (
            <div className={styles.formGroup}>
              <label className={styles.label}>Chave secreta</label>
              <input
                type="password"
                className={styles.input}
                placeholder="Chave fornecida pelo administrador"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
              />
            </div>
          )}

          {error && <p className={styles.error}>{error}</p>}

          <button
            className={styles.button}
            onClick={mode === 'login' ? handleLogin : handleRegister}
            disabled={loading}
          >
            {loading ? 'Aguarde...' : mode === 'login' ? 'Entrar' : 'Criar conta'}
          </button>
        </div>

        <footer className={styles.footer}>
          <p className={styles.footerText}>
            {mode === 'login' ? (
              <>
                Professor novo?{' '}
                <span className={styles.logoAccent} style={{ cursor: 'pointer' }} onClick={() => { setMode('register'); setError(''); }}>
                  Criar conta
                </span>
              </>
            ) : (
              <>
                Já tem conta?{' '}
                <span className={styles.logoAccent} style={{ cursor: 'pointer' }} onClick={() => { setMode('login'); setError(''); }}>
                  Fazer login
                </span>
              </>
            )}
          </p>
        </footer>
      </div>
    </main>
  );
}