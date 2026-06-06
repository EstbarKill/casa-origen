
import type {Metadata} from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AtmosphereProvider } from '@/components/visuals/AtmosphereProvider';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Casa Origen | Caribbean Destination & Gastronomy',
  description: 'Coastal elegance and interactive Caribbean storytelling in Ciénaga, Magdalena.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-accent/30">
        <AtmosphereProvider>
          <div className="particles-container">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="particle" 
                style={{
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  animationDuration: `${Math.random() * 10 + 10}s`,
                  animationDelay: `${Math.random() * 10}s`
                }}
              />
            ))}
          </div>
          <Header />
          <main className="relative z-10">
            {children}
          </main>
          <Footer />
          <Toaster />
        </AtmosphereProvider>
      </body>
    </html>
  );
}
