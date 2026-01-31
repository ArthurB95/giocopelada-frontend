import { LucideIcon, Trophy, Lock, ArrowRight, Mail } from "lucide-react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

/*interface LoginScreenProps {
  onLoginSuccess: () => void;
}*/

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  placeholder,
  icon: Icon,
  ...props
}) => (
  <div className="mb-5">
    <label className="block text-sm font-bold text-slate-700 mb-2">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <input
        type={type}
        className={`w-full ${Icon ? "pl-11" : "pl-4"} pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none bg-slate-50 focus:bg-white font-medium placeholder-slate-400 text-slate-900`}
        placeholder={placeholder}
        {...props}
      />
    </div>
  </div>
);

const LoginScreen: React.FC= () => {
const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/dashboard");
  };

  const handleGoHome = () => {
    navigate("/");
  };


  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Visual & Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-16 text-white">
        {/* Abstract Sports Background */}
        <div className="absolute inset-0 bg-slate-800">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 to-slate-900/90 z-10"></div>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
        </div>

        <div className="relative z-20 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-emerald-500 p-2.5 rounded-xl shadow-lg shadow-emerald-900/50">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold tracking-tight text-white">
              Gioco<span className="text-emerald-400">Pelada</span>
            </span>
          </div>
        </div>

        <div className="relative z-20 max-w-lg animate-fade-in-up animate-delay-200">
          <h2 className="text-5xl font-extrabold mb-8 leading-[1.15] tracking-tight">
            A organização do seu jogo{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              começa aqui.
            </span>
          </h2>
          <p className="text-slate-300 text-xl mb-12 leading-relaxed font-light">
            Junte-se a mais de 10.000 peladeiros que abandonaram a planilha e o
            caderninho para focar no que importa: o jogo.
          </p>

          <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 z-${i}0`}
                >
                  {i === 4 ? "+99" : ""}
                </div>
              ))}
            </div>
            <div>
              <p className="font-bold text-white text-lg">Comunidade Ativa</p>
              <p className="text-slate-400 text-sm">
                Peladeiros organizando jogos agora
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-20 text-slate-500 text-sm">
          © 2024 Gioco Pelada Inc.
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-white relative">
        {/* Decorator for mobile */}
        <div className="lg:hidden absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>

        <div className="max-w-md w-full animate-fade-in-up">
          {/* Mobile Logo Only */}
          <div className="lg:hidden flex justify-center mb-10">
            <div className="bg-emerald-50 p-3 rounded-2xl">
              <Trophy className="w-8 h-8 text-emerald-600" />
            </div>
          </div>

          <div className="text-center lg:text-left mb-10">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3">
              Bem-vindo de volta!
            </h2>
            <p className="text-slate-500 text-lg">
              Entre com suas credenciais para acessar o painel.
            </p>
          </div>

          {/* Enhanced Google Button */}
          <button
            onClick={handleLoginSuccess}
            className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 p-4 rounded-xl text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm mb-8 group relative overflow-hidden"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5 group-hover:scale-110 transition-transform relative z-10"
            />
            <span className="relative z-10">Continuar com Google</span>
          </button>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-400 font-medium">
                ou entre com email
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <Input
              label="Email"
              placeholder="seu@email.com"
              type="email"
              icon={Mail}
            />

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-slate-700">
                  Senha
                </label>
                <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700 hover:underline">
                  Esqueceu?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none bg-slate-50 focus:bg-white font-medium placeholder-slate-400 text-slate-900"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button
              className="w-full py-4 text-lg shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30"
              onClick={handleLoginSuccess}
              icon={ArrowRight}
            >
              Entrar na Plataforma
            </Button>
          </div>

          <p className="text-center mt-8 text-slate-500 text-sm">
            Não tem uma conta?{" "}
            <button
              className="text-emerald-600 font-bold hover:underline"
              onClick={handleLoginSuccess}
            >
              Cadastre-se gratuitamente
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
