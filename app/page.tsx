import EidWelcomeModal from "@/components/eid-welcome-modal";
import { FeaturedQuizzes } from "./components/featured-quizzes";
// import { Footer } from "./components/footer";
import { HeroSection } from "./components/hero-section";
import { HowItWorks } from "./components/how-it-works";
import { Testimonials } from "./components/testimonials";

export default function HomePage() {
  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   // setModalClosed(true);
  //   // Save that user has seen the modal
  //   // localStorage.setItem("eid-modal-seen", "true");
  // };
  return (
    <>
      <EidWelcomeModal />

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
