"use client";

import { type ReactNode, useRef, type MouseEvent } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 3,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const tiltX = ((0.5 - y) * maxTilt * 2).toFixed(2);
    const tiltY = ((x - 0.5) * maxTilt * 2).toFixed(2);

    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      }
    });
  }

  function handleMouseLeave() {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (cardRef.current) {
        cardRef.current.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
      }
    });
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: "perspective(1200px) rotateX(0deg) rotateY(0deg)",
        transition: "transform 0.25s cubic-bezier(0.2, 0, 0.2, 1)",
        willChange: "transform",
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}
