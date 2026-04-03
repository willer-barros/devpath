import { RoadmapClient } from '../components/roadMapClient';
import styles from '../css/page.module.css'
import {resources} from "../types/resources"
import { tracks } from '../types/resources';

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
            {/* <span className={styles.statNumber}>4</span> */}
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

        {/* Footer */}
        <footer className={styles.footer}>
          <span className={styles.footerText}>
            feito com{' '}
            <span className={styles.footerAccent}>{'<3'}</span>
            {' '}para devs iniciantes · contribua no {'https://github.com/willer-barros/devpath.git'}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              GitHub ↗
            </a>
          </span>
        </footer>
      </div>
    </main>
  );
}