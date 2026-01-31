import { Trophy } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4 text-white">
            <Trophy className="w-6 h-6 text-emerald-500" />
            <span className="text-xl font-bold">Gioco Pelada</span>
          </div>
          <p className="max-w-sm">
            A plataforma definitiva para organização esportiva amadora. Feito
            por quem joga, para quem joga.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Produto</h4>
          <ul className="space-y-2">
            <li>
              <a href="#!" className="hover:text-emerald-400">
                Funcionalidades
              </a>
            </li>
            <li>
              <a href="#!" className="hover:text-emerald-400">
                Preços
              </a>
            </li>
            <li>
              <a href="#!" className="hover:text-emerald-400">
                App Mobile
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Suporte</h4>
          <ul className="space-y-2">
            <li>
              <a href="#!" className="hover:text-emerald-400">
                Central de Ajuda
              </a>
            </li>
            <li>
              <a href="#!" className="hover:text-emerald-400">
                Termos de Uso
              </a>
            </li>
            <li>
              <a href="#!" className="hover:text-emerald-400">
                Privacidade
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-slate-800 text-center text-sm">
        <p>© 2024 Gioco Pelada. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
