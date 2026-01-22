"use client";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; 
import type { Engine } from "tsparticles-engine";

export default function HeroBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false }, // Keeps it inside the hero section
          background: {
            color: { value: "transparent" },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "grab", // Connects lines to cursor
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 200,
                links: {
                  opacity: 1,
                  color: "#3b82f6" // Bright Blue interaction
                },
              },
            },
          },
          particles: {
            color: {
              value: "#60a5fa", // Light Blue Dots
            },
            links: {
              color: "#3b82f6", // Blue connecting lines
              distance: 150,
              enable: true,
              opacity: 1, // High visibility
              width: 1.5, // Thicker lines
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1.5, // Gentle drift
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 60, // Number of dots
            },
            opacity: {
              value: 0.7, // Very visible
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 2, max: 4 }, // Large visible dots
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 h-full w-full"
      />
      
      {/* Optional: A dark gradient overlay at the bottom so text stays readable */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>
    </div>
  );
}