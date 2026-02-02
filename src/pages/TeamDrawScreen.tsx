import { ArrowRight, CheckCircle, RefreshCw, Star, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";

type PaymentStatus = 'paid' | 'pending';
type ParticipantType = 'mensalista' | 'avulso' | 'visitante';

interface Participant {
  id: number;
  name: string;
  status: 'confirmed' | 'pending';
  payment: PaymentStatus;
  type: ParticipantType;
  score: number; // Campo de pontuação adicionado
}

const participants: Participant[] = [
  { id: 1, name: "Carlos Silva", status: 'confirmed', payment: 'paid', type: 'mensalista', score: 4.5 },
  { id: 2, name: "Bruno Santos", status: 'confirmed', payment: 'paid', type: 'mensalista', score: 3.8 },
  { id: 3, name: "André Costa", status: 'confirmed', payment: 'paid', type: 'avulso', score: 4.2 },
  { id: 4, name: "Daniel Oliveira", status: 'confirmed', payment: 'pending', type: 'visitante', score: 3.0 },
  { id: 5, name: "Eduardo Lima", status: 'confirmed', payment: 'paid', type: 'mensalista', score: 4.8 },
  { id: 6, name: "Felipe Souza", status: 'confirmed', payment: 'paid', type: 'avulso', score: 3.5 },
  { id: 7, name: "Gabriel Rocha", status: 'confirmed', payment: 'paid', type: 'mensalista', score: 4.0 },
  { id: 8, name: "Hugo Alves", status: 'confirmed', payment: 'paid', type: 'visitante', score: 2.5 },
];

const TeamDrawScreen: React.FC = () => {
  const [teams, setTeams] = useState<{
    A: Participant[];
    B: Participant[];
  } | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleDraw = () => {
    setIsAnimating(true);

    // Simulate loading for better UX
    setTimeout(() => {
      // Simple shuffle for now (can be improved with balance logic later)
      const shuffled = [...participants].sort(() => Math.random() - 0.5);
      const mid = Math.ceil(shuffled.length / 2);

      setTeams({
        A: shuffled.slice(0, mid),
        B: shuffled.slice(mid),
      });
      setIsAnimating(false);
    }, 800);
  };

  const getTeamAverage = (team: Participant[]) => {
    if (team.length === 0) return 0;
    const total = team.reduce((acc, curr) => acc + curr.score, 0);
    return (total / team.length).toFixed(1);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
    <Header />
    <div className="pb-24 animate-fade-in-up  px-4 md:px-6 lg:px-24">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowRight className="w-5 h-5 rotate-180 text-slate-700" />
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Sortear Times</h1>
      </div>

      {/* List of Players (Before Draw) */}
      {!teams && (
        <div className="mb-6 animate-fade-in-up">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-700">
              Jogadores Disponíveis ({participants.length})
            </h3>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-bold">
              Todos Selecionados
            </span>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 shadow-sm">
            {participants.map((p) => (
              <div
                key={p.id}
                className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                    {p.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-slate-900">
                        {p.name}
                      </p>
                      <div className="flex items-center gap-0.5 bg-yellow-100 px-1.5 py-0.5 rounded text-[10px] font-bold text-yellow-700">
                        <Star className="w-2.5 h-2.5 fill-yellow-500 text-yellow-500" />
                        {p.score.toFixed(1)}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 capitalize">
                      {p.type}
                    </p>
                  </div>
                </div>
                <CheckCircle className="w-4 h-4 text-emerald-500" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Button */}
      {!teams && (
        <Button
          onClick={handleDraw}
          disabled={isAnimating}
          className="w-full mb-8 py-4 text-lg shadow-xl shadow-emerald-500/20"
          icon={isAnimating ? RefreshCw : Users}
        >
          {isAnimating ? "Sorteando..." : "Gerar Times Equilibrados"}
        </Button>
      )}

      {/* Teams Display */}
      {teams && (
        <div className="space-y-6 animate-fade-in-up">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch">
            {/* Team A */}
            <div className="flex-1 bg-white rounded-2xl shadow-lg shadow-emerald-500/10 border border-emerald-100 overflow-hidden flex flex-col">
              <div className="bg-emerald-500 p-4 text-center text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform -skew-x-12"></div>
                <h3 className="font-bold text-lg relative z-10">Time A</h3>
                <div className="flex justify-center gap-4 mt-1 relative z-10 opacity-90 text-xs">
                  <span>{teams.A.length} Jogadores</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" /> Força:{" "}
                    {getTeamAverage(teams.A)}
                  </span>
                </div>
              </div>
              <div className="p-2 divide-y divide-slate-50 flex-1">
                {teams.A.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold border border-emerald-100">
                        {p.name.charAt(0)}
                      </div>
                      <span className="text-slate-700 font-medium text-sm">
                        {p.name}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-400">
                      {p.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Team B */}
            <div className="flex-1 bg-white rounded-2xl shadow-lg shadow-blue-500/10 border border-blue-100 overflow-hidden flex flex-col">
              <div className="bg-blue-500 p-4 text-center text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform -skew-x-12"></div>
                <h3 className="font-bold text-lg relative z-10">Time B</h3>
                <div className="flex justify-center gap-4 mt-1 relative z-10 opacity-90 text-xs">
                  <span>{teams.B.length} Jogadores</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" /> Força:{" "}
                    {getTeamAverage(teams.B)}
                  </span>
                </div>
              </div>
              <div className="p-2 divide-y divide-slate-50 flex-1">
                {teams.B.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold border border-blue-100">
                        {p.name.charAt(0)}
                      </div>
                      <span className="text-slate-700 font-medium text-sm">
                        {p.name}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-400">
                      {p.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button
            onClick={() => setTeams(null)}
            variant="outline"
            className="w-full mt-4 py-4"
            icon={RefreshCw}
          >
            Sortear Novamente
          </Button>
        </div>
      )}
    </div>
    </>
  );
};

export default TeamDrawScreen;
