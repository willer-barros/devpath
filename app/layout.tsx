import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DevPath — Roadmap de Estudos para Programadores',
  description:
    'Um roadmap curado de recursos gratuitos para quem está começando a programar. Cursos, artigos e tutoriais organizados por trilha.',
  openGraph: {
    title: 'DevPath',
    description: 'Seu roadmap de estudos para programação — do zero ao deploy.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}