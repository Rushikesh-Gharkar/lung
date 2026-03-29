import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Interface exported for ResultsView to use as a Type
export interface HeatmapRegion {
  x: number;
  y: number;
  radius: number;
  intensity: number;
}

interface Props {
  regions: HeatmapRegion[];
  show: boolean;
}

export default function HeatmapCanvas({ regions, show }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      // Ensure canvas pixels match its display size
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!show || !regions || regions.length === 0) return;

      regions.forEach((region) => {
        const x = (region.x / 100) * canvas.width;
        const y = (region.y / 100) * canvas.height;
        const r = (region.radius / 100) * Math.min(canvas.width, canvas.height);

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
        const alpha = 0.6;

        // Color logic matching your Severity requirements
        if (region.intensity > 0.8) {
          gradient.addColorStop(0, `rgba(239, 68, 68, ${alpha})`); // Red
        } else if (region.intensity > 0.5) {
          gradient.addColorStop(0, `rgba(251, 146, 60, ${alpha})`); // Orange
        } else {
          gradient.addColorStop(0, `rgba(16, 185, 129, ${alpha})`); // Green (Low Risk)
        }
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [regions, show]);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen z-10"
    />
  );
}
