import { Trophy } from "lucide-react";

const Works = () => {
  return (
    <div className="bg-slate-50 py-24" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-emerald-600 font-bold tracking-wide uppercase text-sm mb-2">
              Como Funciona
            </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
              Do grupo de Zap para o campo em minutos.
            </h3>
            <p className="text-lg text-slate-600 mb-10">
              Simplificamos todo o processo chato para que você tenha mais tempo
              para resenhar.
            </p>

            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "Crie sua Pelada",
                  text: "Defina local, horário, valor e número de vagas.",
                },
                {
                  step: "02",
                  title: "Envie o Link",
                  text: "Compartilhe no WhatsApp. Os jogadores confirmam presença em 1 clique.",
                },
                {
                  step: "03",
                  title: "Gerencie",
                  text: "Acompanhe pagamentos e sorteie os times automaticamente.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="text-2xl font-bold text-emerald-500/30">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">
                      {item.title}
                    </h4>
                    <p className="text-slate-600">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-3xl transform rotate-3 opacity-20"></div>
            <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
              <div className="space-y-4">
                {/* Chat Simulation */}
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                  <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none text-sm text-slate-600 w-3/4">
                    Galera, o link pro jogo de hoje tá na mão! Bora confirmar?
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="bg-emerald-500 p-3 rounded-2xl rounded-tr-none text-sm text-white shadow-md w-2/3 cursor-pointer hover:bg-emerald-600 transition-colors">
                    <div className="font-bold flex items-center gap-2 mb-1">
                      <Trophy className="w-3 h-3" /> Gioco Pelada
                    </div>
                    <div className="font-medium underline">
                      giocopelada.com/convite/392
                    </div>
                    <div className="text-emerald-100 text-xs mt-1">
                      Toque para confirmar presença
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                  <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none text-sm text-slate-600">
                    Tô dentro! Já paguei o Pix. ⚽️
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Works;
