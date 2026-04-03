import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DevPath',
  description:
    'Um roadmap cheio de recursos gratuitos para quem está começando a programar. Cursos, artigos e tutoriais organizados por trilha.',
  
  icons: {
    icon: "/logo_devpath.png",
  },
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