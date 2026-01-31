import { CheckCircle, Plus, Star, Trophy, Users, Play } from "lucide-react";
import Button from "./Button";

interface LandingPageProps {
  onLogin: () => void;
}


const Hero: React.FC<LandingPageProps> = ({ onLogin }) => {
  return (
    <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-40 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

      <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
        <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold mb-8 border border-emerald-100 shadow-sm animate-pulse-soft">
          <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
          Mais de 5.000 peladas organizadas este mês
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8 tracking-tight">
          Chega de lista de papel.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-blue-500">
            Sua pelada merece nível pro.
          </span>
        </h1>

        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-delay-100">
          A plataforma completa para gerenciar pagamentos, sortear times
          equilibrados e avaliar jogadores. Tudo automatizado para você só se
          preocupar em jogar.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-delay-200 mb-16">
          <Button
            onClick={onLogin}
            className="px-10 py-4 text-lg shadow-xl hover:shadow-2xl shadow-emerald-500/20 transform hover:-translate-y-1"
          >
            Organizar minha pelada
          </Button>
          <Button
            variant="outline"
            onClick={onLogin}
            className="px-10 py-4 text-lg border-2"
            icon={Play}
          >
            Ver demonstração
          </Button>
        </div>
      </div>

      <div className="mt-10 relative mx-auto max-w-5xl animate-fade-in-up animate-delay-300 hidden md:block">
        {/* Floating Badge 1 */}
        <div className="absolute -left-4 bottom-20 z-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-float hidden md:flex">
          <div className="bg-green-100 p-2 rounded-lg text-green-600">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase">
              Pagamento
            </p>
            <p className="text-sm font-bold text-slate-900">
              R$ 350,00 Recebidos
            </p>
          </div>
        </div>

        {/* Floating Badge 2 */}
        <div className="absolute -right-8 bottom-40 z-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-float animate-delay-200 hidden md:flex">
          <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600">
            <Star className="w-6 h-6 fill-yellow-500" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase">
              Craque da Partida
            </p>
            <p className="text-sm font-bold text-slate-900">João Silva (9.8)</p>
          </div>
        </div>

        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-[2.5rem] blur opacity-20"></div>
        <div className="relative bg-slate-50 border border-slate-200 rounded-3xl shadow-2xl overflow-hidden aspect-[16/9] flex flex-col transform hover:scale-[1.01] transition-transform duration-500">
          {/* Mock Header */}
          <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-500 p-1.5 rounded-lg">
                <Trophy className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-slate-900">Gioco Pelada</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:block h-2 w-20 bg-slate-100 rounded-full"></div>
              <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm"></div>
            </div>
          </div>

          {/* Mock Content */}
          <div className="p-6 md:p-8 flex-1 bg-slate-50/50 overflow-hidden">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Painel do Organizador
                </h2>
                <p className="text-slate-500 text-sm">
                  Próximo jogo: Quinta-feira, 20:00
                </p>
              </div>
              <button className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-200 flex items-center gap-2">
                <Plus className="w-4 h-4" />{" "}
                <span className="hidden sm:inline">Novo Jogo</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm relative">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold shadow-emerald-100">
                    F
                  </div>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded-full">
                    Confirmado
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 mb-1">
                  Futebol de Quinta
                </h3>
                <div className="space-y-2 pt-4 border-t border-slate-50 mt-4">
                  <div className="flex items-center text-xs text-slate-600 justify-between">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-emerald-500" /> 14
                      Jogadores
                    </span>
                    <span className="text-emerald-600 font-bold">100%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-emerald-500 h-full w-full rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hidden sm:block relative opacity-80">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold shadow-blue-100">
                    V
                  </div>
                  <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase rounded-full">
                    Próxima Sem.
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 mb-1">
                  Vôlei dos Amigos
                </h3>
                <div className="space-y-2 pt-4 border-t border-slate-50 mt-4">
                  <div className="flex items-center text-xs text-slate-600 justify-between">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-blue-500" /> 8 Jogadores
                    </span>
                    <span className="text-blue-600 font-bold">60%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-blue-500 h-full w-[60%] rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-5 rounded-2xl border border-dashed border-slate-300 shadow-sm hidden md:flex items-center justify-center flex-col text-center opacity-60">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-2">
                  <Plus className="w-6 h-6 text-slate-400" />
                </div>
                <p className="text-sm font-medium text-slate-400">
                  Criar novo grupo
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
