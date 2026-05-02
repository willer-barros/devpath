'use client';

import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import styles from '../css/authHeader.module.css';

export function AuthHeader() {
  const { user, isTeacher, loading, signOut } = useAuth();
  const router = useRouter();

  if (loading) return null;

  if (!user) {
    return (
      <button className={styles.btn} onClick={() => router.push('/login')}>
        entrar
      </button>
    );
  }

  return (
    <div className={styles.wrap}>
      {isTeacher && (
        <>
          <span className={styles.badge}>professor</span>
          <button
            className={styles.btnGlossary}
            onClick={() => router.push('/manage-glossary')}
            title="Gerenciar glossário"
          >
            glossário
          </button>
        </>
      )}
      <span className={styles.email}>{user.email}</span>
      <button className={styles.btnOut} onClick={signOut}>sair</button>
    </div>
  );
}