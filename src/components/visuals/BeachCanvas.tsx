
"use client";

import React, { useRef, useEffect } from 'react';
import { useScroll, useTransform } from 'framer-motion';

export function BeachCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background Sand Color
      ctx.fillStyle = '#F9F6F2'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const drawWave = (color: string, amplitude: number, frequency: number, speed: number, yOffset: number, opacity: number) => {
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        
        // Parallax depth
        const currentScroll = scrollY.get();
        const baseLine = yOffset + (currentScroll * 0.3);

        for (let x = 0; x <= canvas.width; x += 10) {
          const y = baseLine + Math.sin(x * frequency + offset * speed) * amplitude;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
      };

      // Caribbean Blue Shades
      drawWave('#6E9FA8', 30, 0.002, 0.005, canvas.height * 0.4, 0.1);
      drawWave('#6E9FA8', 20, 0.004, 0.008, canvas.height * 0.5, 0.2);
      drawWave('#6E9FA8', 15, 0.006, 0.012, canvas.height * 0.6, 0.3);
      drawWave('#FFFFFF', 8, 0.008, 0.015, canvas.height * 0.65, 0.2);

      offset += 1;
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [scrollY]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none" 
      style={{ zIndex: -1 }}
    />
  );
}
