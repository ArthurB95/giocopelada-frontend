import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Menu, Trophy, X } from "lucide-react";
import Button from "./Button";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 p-2 rounded-xl shadow-lg shadow-emerald-500/20 transform transition hover:scale-105">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              Gioco<span className="text-emerald-500">Pelada</span>
            </span>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            <a
              href="#benefits"
              className="text-slate-600 hover:text-emerald-600 font-medium transition-colors"
            >
              Vantagens
            </a>
            <a
              href="#how-it-works"
              className="text-slate-600 hover:text-emerald-600 font-medium transition-colors"
            >
              Como Funciona
            </a>
            <a
              href="#testimonials"
              className="text-slate-600 hover:text-emerald-600 font-medium transition-colors"
            >
              Depoimentos
            </a>
            <Button variant="ghost" onClick={handleNavigation}>
              Entrar
            </Button>
            <Button onClick={handleNavigation} className="shadow-emerald-500/30">
              Começar Agora
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 p-2"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 shadow-xl absolute w-full animate-fade-in-up">
          <div className="flex flex-col space-y-4">
            <a
              href="#benefits"
              onClick={() => setIsMenuOpen(false)}
              className="text-slate-600 font-medium py-2"
            >
              Vantagens
            </a>
            <a
              href="#how-it-works"
              onClick={() => setIsMenuOpen(false)}
              className="text-slate-600 font-medium py-2"
            >
              Como Funciona
            </a>
            <Button onClick={handleNavigation} className="w-full">
              Criar Conta Grátis
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
