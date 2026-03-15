"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

type ConfettiExplosionProps = {
  trigger: boolean;
};

export function ConfettiExplosion({ trigger }: ConfettiExplosionProps) {
  useEffect(() => {
    if (!trigger) return;

    const duration = 1500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#8b5cf6", "#6366f1", "#f59e0b"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#8b5cf6", "#6366f1", "#f59e0b"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, [trigger]);

  return null;
}
