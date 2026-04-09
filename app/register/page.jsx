"use client" // Adicione isso no topo para lidar com o feedback

import styles from '../../css/register.module.css';
import { registerUser } from './actions'; // Importe a action que criamos

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
          <p className={styles.tagline}>Crie sua conta gratuita para salvar seu progresso.</p>
        </header>

        {/* Adicionamos a action aqui e o atributo 'name' nos inputs */}
        <form action={registerUser} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nome Completo</label>
            <input 
              name="name" 
              type="text" 
              className={styles.input} 
              placeholder="Seu Nome" 
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>E-mail</label>
            <input 
              name="email" 
              type="email" 
              className={styles.input} 
              placeholder="seu@email.com" 
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Senha</label>
            <input 
              name="password" 
              type="password" 
              className={styles.input} 
              placeholder="Mínimo 8 caracteres" 
              required 
              minLength={8}
            />
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