
"use client";

import React, { useRef, useEffect } from 'react';

export function BeachCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;
    let scrollY = 0;

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', resize);
    resize();

    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Fondo de arena suave (Bone White / Muted)
      ctx.fillStyle = '#F4EEE8'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const drawWave = (color: string, amplitude: number, frequency: number, speed: number, yOffset: number, opacity: number) => {
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        
        // El scroll afecta la posición vertical de las olas para efecto parallax
        const baseLine = yOffset + (scrollY * 0.4);

        for (let x = 0; x <= canvas.width; x += 5) {
          const y = baseLine + Math.sin(x * frequency + offset * speed) * amplitude;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
      };

      // Olas del Mar Caribe (usando el color accent #6E9FA8)
      // Capa profunda
      drawWave('#6E9FA8', 40, 0.003, 0.01, canvas.height * 0.35, 0.15);
      // Capa media
      drawWave('#6E9FA8', 25, 0.005, 0.015, canvas.height * 0.5, 0.25);
      // Capa cercana a la orilla
      drawWave('#6E9FA8', 15, 0.008, 0.02, canvas.height * 0.65, 0.4);
      // Espuma blanca sutil
      drawWave('#FFFFFF', 10, 0.01, 0.025, canvas.height * 0.67, 0.3);

      offset += 0.5;
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none" 
      style={{ zIndex: 0 }}
    />
  );
}
