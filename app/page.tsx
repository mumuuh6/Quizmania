"use client";

import EidWelcomeModal from "@/components/eid-welcome-modal";
import { FeaturedQuizzes } from "./components/featured-quizzes";
// import { Footer } from "./components/footer";
import { HeroSection } from "./components/hero-section";
import { HowItWorks } from "./components/how-it-works";
import { Testimonials } from "./components/testimonials";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [, setModalClosed] = useState(false);

  useEffect(() => {
    // Check if the modal has been shown before
    const hasSeenModal = sessionStorage.getItem("eid-modal-seen");

    if (!hasSeenModal) {
      // Show modal after a short delay to ensure smooth loading
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      // If they've seen the modal before, mark it as closed
      setModalClosed(true);
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setModalClosed(true);
    // Save that user has seen the modal
    sessionStorage.setItem("eid-modal-seen", "true");
  };

  return (
    <>
      {showModal && <EidWelcomeModal onClose={handleCloseModal} />}

      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <HeroSection />
          <FeaturedQuizzes />
          <HowItWorks />
          <Testimonials />
        </main>
      </div>
    </>
  );
}
