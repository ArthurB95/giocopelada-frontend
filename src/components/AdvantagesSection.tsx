import { DollarSign, Star, Users } from "lucide-react";

const AdvantagesSection = () => {
    return (<div className="bg-white py-24" id="benefits">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-emerald-600 font-bold tracking-wide uppercase text-sm mb-2">
              Por que usar o Gioco?
            </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Tudo o que você precisa para o jogo perfeito
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: DollarSign,
                title: "Adeus Caloteiros",
                desc: "Controle quem pagou e quem deve em tempo real. O sistema envia lembretes automáticos para os esquecidos.",
                color: "bg-green-100 text-green-600",
              },
              {
                icon: Users,
                title: "Times Equilibrados",
                desc: "Nosso algoritmo usa as notas dos jogadores para montar times justos. Acabe com as panelinhas e reclamações.",
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: Star,
                title: "Gamificação Real",
                desc: "Avalie os jogadores após cada partida. Quem joga limpo sobe no ranking, quem joga sujo fica de fora.",
                color: "bg-yellow-100 text-yellow-600",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100"
              >
                <div
                  className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300`}
                >
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>)
}

export default AdvantagesSection;