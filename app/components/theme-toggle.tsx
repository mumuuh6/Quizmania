"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
    }, 150);

    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  if (!mounted) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={`relative h-10 w-16 overflow-hidden rounded-full border-2 p-0 transition-all duration-500 ${
        theme === "dark"
          ? "border-purple-500 bg-slate-800"
          : "border-amber-400 bg-sky-100"
      }`}
    >
      {/* Background elements - Dark Mode */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          theme === "dark" ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Stars */}
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className={`absolute inline-block h-1 w-1 rounded-full bg-white shadow-glow transition-all duration-1000 ${
              isAnimating ? "animate-twinkle" : ""
            }`}
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              animationDelay: `${Math.random() * 1000}ms`,
              opacity: Math.random() * 0.5 + 0.5,
            }}
          />
        ))}
      </div>

      {/* Background elements - Light Mode */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          theme === "dark" ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Clouds */}
        {[...Array(3)].map((_, i) => (
          <span
            key={i}
            className="absolute inline-block rounded-full bg-white animate-float-clouds"
            style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 60 + 20}%`,
              left: `${Math.random() * 60 + 20}%`,
              opacity: 0.8,
              animationDuration: `${Math.random() * 3 + 3}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Light rays */}
        {isAnimating &&
          [...Array(8)].map((_, i) => (
            <span
              key={i}
              className="absolute left-4 top-1/2 inline-block h-0.5 origin-left -translate-y-1/2 transform bg-amber-300 animate-light-ray"
              style={{
                width: "30px",
                transform: `translateY(-50%) rotate(${i * 45}deg)`,
                opacity: 0.7,
                animationDelay: `${i * 50}ms`,
              }}
            />
          ))}
      </div>

      {/* Toggle indicator */}
      <div
        className={`absolute flex h-8 w-8 items-center justify-center rounded-full transition-all duration-500 ${
          isAnimating ? "scale-110" : "scale-100"
        } ${
          theme === "dark"
            ? "right-1 bg-purple-700 text-purple-200 shadow-[0_0_10px_rgba(139,92,246,0.5)]"
            : "left-1 bg-amber-300 text-amber-800 shadow-lg"
        }`}
      >
        {theme === "dark" ? (
          <Moon
            className={`h-5 w-5 transition-all duration-500 ${
              isAnimating ? "animate-spin-slow" : ""
            }`}
          />
        ) : (
          <Sun
            className={`h-5 w-5 transition-all duration-500 ${
              isAnimating ? "animate-spin-slow" : ""
            }`}
          />
        )}
      </div>

      {/* Ripple effect */}
      {isAnimating && (
        <span
          className={`absolute inline-block rounded-full ${
            theme === "dark" ? "bg-purple-500" : "bg-amber-400"
          } opacity-20 animate-theme-ripple`}
        />
      )}

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
