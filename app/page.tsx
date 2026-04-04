import { RoadmapClient } from '../components/roadMapClient';
import styles from '../css/page.module.css'
import {resources} from "../types/resources"
import { tracks } from '../types/resources';

// Componente simples para o ícone do Discord (SVG Inline)
const DiscordIcon = () => (
  <svg width="20" height="20" viewBox="0 0 127.14 96.36" style={{ fill: 'currentColor' }}>
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.71,32.65-1.82,56.6.48,80.21a105.73,105.73,0,0,0,32.77,16.15,77.7,77.7,0,0,0,7.33-11.86,67.43,67.43,0,0,1-11.86-5.6c.99-.71,1.95-1.47,2.88-2.26a78.16,78.16,0,0,0,54.35,0c.93.79,1.89,1.55,2.88,2.26a67.48,67.48,0,0,1-11.89,5.6,77.87,77.87,0,0,0,7.32,11.86,105.56,105.56,0,0,0,32.8-16.14C129.37,50.32,124.7,26.51,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5.12-12.67,11.41-12.67S54,46,53.86,53,48.74,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5.12-12.67,11.44-12.67S96.28,46,96.12,53,91,65.69,82.69,65.69Z"/>
  </svg>
);

// Componente simples para o ícone do GitHub (SVG Inline)
const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 98 96" style={{ fill: 'currentColor' }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.541-5.42-7.009-5.42-7.009-4.448-3.015.324-2.934.324-2.934 4.937.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.222-22.242-5.378-22.242-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364C83.869 89.389 98 70.973 98 49.217 98 22 76.161 0 48.854 0z"/>
  </svg>
);

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.logoRow}>
            <div className={styles.logoIcon}>&gt;_</div>
            <span className={styles.logoText}>
              Dev<span className={styles.logoAccent}>Route</span>
            </span>
          </div>
          <p className={styles.tagline}>
            Seu roadmap de estudos para programação — do zero ao deploy.
          </p>
        </header>

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{resources.length}</span>
            <span className={styles.statLabel}>recursos</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>{tracks.length}</span>
            <span className={styles.statLabel}>trilhas</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>gratuito</span>
          </div>
        </div>

        {/* Roadmap */}
        <RoadmapClient />

        {/* Footer Atualizado */}
        <footer className={styles.footer}>
          <div className={styles.footerText}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span>feito com</span>
              <span className={styles.footerAccent}>{'<3'}</span>
              <span>para devs iniciantes · contribua no</span>
              <a
                href={process.env.NEXT_PUBLIC_LINK_GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerLink}
                title="Repositório do DevRoute"
              >
                <GithubIcon />
              </a>
              e participe na nossa Comunidade no
              <a
                href={process.env.NEXT_PUBLIC_LINK_DISCORD}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerLink}
                title="Discord da Comunidade"
              >
                <DiscordIcon />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}