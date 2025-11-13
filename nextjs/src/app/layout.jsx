import './globals.css';

export const metadata = {
  title: "PDTIC Paraíba - Sistema de eventos esportivos",
  description: "Sistema de gestão de inscrições em eventos esportivos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
