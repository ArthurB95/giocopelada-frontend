import { useEffect, useState } from "react";
import AdvantagesSection from "../components/AdvantagesSection";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Works from "../components/Works";
import { useNavigate } from "react-router-dom";

const styles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  @keyframes pulse-soft {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .animate-delay-100 { animation-delay: 0.1s; }
  .animate-delay-200 { animation-delay: 0.2s; }
  .animate-delay-300 { animation-delay: 0.3s; }
  
  .glass-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.5);
  }
`;

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      <style>{styles}</style>

      {/* Navbar Landing */}
      <Navbar />

      {/* Hero Section */}
      <Hero onLogin={handleNavigation} />

      {/* Advantages Section */}
      <AdvantagesSection />

      {/* How it works Section */}
      <Works />

      {/* Final CTA */}
      <FinalCTA onLogin={handleNavigation} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
