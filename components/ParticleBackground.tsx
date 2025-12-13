"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

const COLORS = [
  "rgba(6, 182, 212, 0.4)", // cyan-500
  "rgba(59, 130, 246, 0.3)", // blue-500
  "rgba(139, 92, 246, 0.3)", // violet-500
  "rgba(236, 72, 153, 0.2)", // pink-500
  "rgba(51, 65, 85, 0.3)", // slate-600
];

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas || typeof window === "undefined") {
      return;
    }

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) {
      return;
    }

    const resizeCanvas = () => {
      if (typeof window !== "undefined") {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    // Initialize particles - only on client
    const particleCount = Math.min(
      50,
      Math.floor((window.innerWidth * window.innerHeight) / 15000)
    );
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    // Use ref for mouse position to avoid re-renders
    const mousePosRef = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.x = e.clientX;
      mousePosRef.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Mouse interaction - particles are repelled by mouse (more visible effect)
        const dx = mousePosRef.x - particle.x;
        const dy = mousePosRef.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;

        if (distance < maxDistance && distance > 0) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          // Repel particles from mouse for more visible effect
          particle.vx -= Math.cos(angle) * force * 0.05;
          particle.vy -= Math.sin(angle) * force * 0.05;
          // Increase opacity when near mouse
          particle.opacity = Math.min(1, particle.opacity + force * 0.3);
        } else {
          // Gradually return to original opacity
          particle.opacity = Math.max(0.2, particle.opacity * 0.98);
        }

        // Boundary collision
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.8;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.8;
        }

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Damping
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Draw connections between nearby particles
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (1 - distance / 120) * 0.2;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 1;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{
        background: "transparent",
        willChange: "contents",
      }}
      aria-hidden="true"
      role="presentation"
    />
  );
};

export default ParticleBackground;
