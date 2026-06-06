
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function DishDetailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-4xl font-bold font-headline">Página no disponible</h1>
        <p className="text-foreground/60">Esta página ha sido removida por simplificación del menú.</p>
        <Button asChild>
          <Link href="/menu" className="flex items-center gap-2">
            <ArrowLeft size={18} />
            Volver al Menú
          </Link>
        </Button>
      </div>
    </div>
  );
}
