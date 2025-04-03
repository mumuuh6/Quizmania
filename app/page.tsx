"use client";

import EidWelcomeModal from "@/components/eid-welcome-modal";
import { FeaturedQuizzes } from "./components/featured-quizzes";
// import { Footer } from "./components/footer";
import { HeroSection } from "./components/hero-section";
import { HowItWorks } from "./components/how-it-works";
import { Testimonials } from "./components/testimonials";
import { useState } from "react";

export default function HomePage() {
  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
    // setModalClosed(true);
    // Save that user has seen the modal
    // localStorage.setItem("eid-modal-seen", "true");
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
