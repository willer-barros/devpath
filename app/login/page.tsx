"use client"

import styles from '../../css/login.module.css';

export default function LoginPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logoRow}>
            <div className={styles.logoIcon}>&gt;</div>
            <h1 className={styles.logoText}>
              DEV<span className={styles.logoAccent}>ROUTE</span>
            </h1>
          </div>
          <p className={styles.tagline}>Acesse sua conta para salvar seu progresso nos treinamentos.</p>
        </header>

        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>E-mail</label>
            <input 
              type="email" 
              className={styles.input} 
              placeholder="user@devroute.com" 
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Senha</label>
            <input 
              type="password" 
              className={styles.input} 
              placeholder="********" 
            />
          </div>

          <button type="submit" className={styles.button}>
            Identificar Usuário
          </button>
        </form>

        <footer className={styles.footer}>
          <p className={styles.footerText}>
            Novo por aqui? <span className={styles.logoAccent}>Crie sua conta gratuita</span>
          </p>
        </footer>
      </div>
    </main>
  );
}