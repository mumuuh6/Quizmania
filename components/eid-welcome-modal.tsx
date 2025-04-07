"use client";

import { useState, useEffect } from "react";
import { X, Moon, Star, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
// import { toast } from "react-toastify";

interface EidWelcomeModalProps {
  onClose: () => void;
}

export default function EidWelcomeModal({ onClose }: EidWelcomeModalProps) {
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    // Show close button after 5.5 seconds
    const timer = setTimeout(() => {
      setShowCloseButton(true);
    }, 5500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    // toast.success("Stay here! And Sharp your Brain with Quiz Mania");
    setIsExiting(true);
    // Wait for exit animation to complete
    setTimeout(() => {
      onClose();
      setShowModal(false);
    }, 500);
  };

  return (
    <div
      className={` ${
        showModal ? "block" : "hidden"
      } fixed inset-0 z-50 flex items-center justify-center`}
    >
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300",
          isExiting ? "opacity-0" : "opacity-100"
        )}
        onClick={showCloseButton ? handleClose : undefined}
      />

      {/* Modal */}
      <div
        className={cn(
          "relative z-10 w-full max-w-lg rounded-xl overflow-hidden shadow-2xl transition-all duration-500",
          isExiting ? "opacity-0 scale-95" : "opacity-100 scale-100"
        )}
      >
        {/* Background with pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/20 pattern-bg opacity-90" />

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 text-primary/80 animate-pulse">
          <Moon className="w-12 h-12" />
        </div>
        <div
          className="absolute bottom-4 left-4 text-primary/80 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        >
          <Star className="w-10 h-10" />
        </div>
        <div
          className="absolute top-1/4 left-1/4 text-primary/80 animate-pulse"
          style={{ animationDelay: "1s" }}
        >
          <Star className="w-8 h-8" />
        </div>
        <div
          className="absolute bottom-1/4 right-1/4 text-primary/80 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        >
          <Star className="w-6 h-6" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
              <Gift className="w-10 h-10 text-primary/80" />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-arabic">
            Eid Mubarak!
          </h2>

          <div className="text-xl text-white/90 mb-8">
            Celebrate this blessed Eid by sending a digital Salami gift to your
            loved ones
          </div>

          <div className="flex justify-center">
            <div className="w-24 h-1 bg-primary/20 rounded-full" />
          </div>

          {/* Lantern decorations */}
          <div className="flex justify-center gap-8 mt-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-8 h-12 bg-primary/50 rounded-t-full relative animate-bounce"
                style={{
                  animationDuration: `${1.5 + i * 0.2}s`,
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-primary/30 rounded-full" />
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-2 bg-primary/60 rounded-full" />
              </div>
            ))}
          </div>

          {/* Close button */}
          {showCloseButton && (
            <Button className="mt-8 bg-white text-primary/80 hover:bg-primary/40 cursor-pointer hover:text-white">
              <Link
                onClick={handleClose}
                href="https://eid-salami-digital-envelope.vercel.app"
                target="_blank"
                className=""
              >
                Continue to Website
              </Link>
            </Button>
          )}
        </div>

        {/* Close button in corner (only visible after delay) */}
        {showCloseButton && (
          <button
            onClick={handleClose}
            className="absolute top-4 z-50 cursor-pointer left-4 text-white/70 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}
