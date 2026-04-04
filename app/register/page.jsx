import styles from '../../css/register.module.css';

export default function RegisterPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logoRow}>
            <div className={styles.logoIcon}>DR</div>
            <h2 className={styles.logoText}>
              DEV<span className={styles.logoAccent}>ROUTE</span>
            </h2>
          </div>
          <p className={styles.tagline}>Crie sua conta gratuita para salvar seu progresso e certificados.</p>
        </header>

        {/* Opção Rápida com Google */}
        <button className={styles.googleProvider}>
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.49h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.91c1.71-1.58 2.69-3.91 2.69-6.62z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.8.54-1.83.86-3.05.86-2.34 0-4.33-1.58-5.03-3.7H.95v2.3A8.99 8.99 0 0 0 9 18z"/>
            <path fill="#FBBC05" d="M3.97 10.71a5.4 5.4 0 0 1 0-3.42V5H.95a8.99 8.99 0 0 0 0 8.01l3.02-2.3z"/>
            <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35L15.02 2.3A8.96 8.96 0 0 0 9 0 8.99 8.99 0 0 0 .95 5l3.02 2.3c.7-2.12 2.69-3.7 5.03-3.7z"/>
          </svg>
          Registrar com Google
        </button>

        <div className={styles.divider}>ou use seu e-mail</div>

        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nome Completo</label>
            <input type="text" className={styles.input} placeholder="Seu Nome" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>E-mail</label>
            <input type="email" className={styles.input} placeholder="seu@email.com" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Senha</label>
            <input type="password" className={styles.input} placeholder="Mínimo 8 caracteres" />
          </div>

          <button type="submit" className={styles.buttonSubmit}>
            Criar Minha Conta
          </button>
        </form>

        <footer className={styles.footer}>
          <p className={styles.footerText}>
            Já tem uma conta? <a href="/login" className={styles.link}>Fazer login</a>
          </p>
        </footer>
      </div>
    </main>
  );
}