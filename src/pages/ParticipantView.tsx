import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle, Clock, MapPin, Trophy } from "lucide-react";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Header from "../components/Header";

type GameRole = "admin" | "player";
type GameStatus = "active" | "inactive";
type UserStatus =
  | "confirmed"
  | "pending_payment"
  | "pending_approval"
  | "pending";
type PaymentStatus = "paid" | "pending";
type ParticipantType = "mensalista" | "avulso" | "visitante";

interface Game {
  id: number;
  name: string;
  sport: string;
  location: string;
  address: string;
  nextGame: string;
  role: GameRole;
  status: GameStatus;
  price?: number;
  userStatus?: UserStatus;
  paymentStatus?: PaymentStatus;
}

interface ParticipantViewProps {
  game: Game;
  onBack: () => void;
}

interface Review {
  id: number;
  score: number;
  date: string;
  comment: string;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    score: 9.5,
    date: "15/10/2023",
    comment: "Jogou muito! Deu duas assistências.",
  },
  {
    id: 2,
    score: 8.0,
    date: "08/10/2023",
    comment: "Chegou no horário, jogo limpo.",
  },
  {
    id: 3,
    score: 10.0,
    date: "01/10/2023",
    comment: "Goleiro fechou o gol hoje.",
  },
];

const ParticipantView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const game = location.state?.game;

  const handleBack = () => {
    navigate(-1);
  };

  if (!game) return <div className="p-8">Erro: Jogo não selecionado.</div>;

  return (
    <>
    <Header />
      <div className="pb-24 animate-fade-in-up px-4 md:px-6 lg:px-24">
        <div className="bg-white p-6 -mx-4 -mt-6 mb-6 border-b border-slate-200 md:rounded-b-3xl md:mx-0 md:mt-0 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowRight className="w-5 h-5 rotate-180 text-slate-700" />
            </button>
            <h1 className="text-xl font-bold text-slate-900">{game.name}</h1>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-emerald-500 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">{game.location}</p>
                <p className="text-sm text-slate-500">{game.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-emerald-500" />
              <p className="text-slate-700">{game.nextGame}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
          <h2 className="font-bold text-slate-900 mb-4">Seu Status</h2>
          <div className="flex flex-wrap gap-3 mb-6">
            <Badge status={game.userStatus} />
            <Badge status={game.paymentStatus} type="payment" />
          </div>

          {game.paymentStatus === "paid" ? (
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-3 text-emerald-800">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium text-sm">
                Você está pronto para o jogo!
              </span>
            </div>
          ) : (
            <Button className="w-full" variant="primary">
              Realizar Pagamento
            </Button>
          )}
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-lg">Suas Estatísticas</h2>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-yellow-400" />
            </div>
          </div>

          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-extrabold">8.5</span>
            <span className="text-slate-400 text-sm mb-1.5">Nota Média</span>
          </div>

          <div className="h-1 w-full bg-slate-700 rounded-full mb-6 overflow-hidden">
            <div className="h-full w-[85%] bg-gradient-to-r from-emerald-400 to-teal-400"></div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
              Últimas Avaliações
            </h3>
            {MOCK_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-white/5 p-3 rounded-lg border border-white/10"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-emerald-400">
                    {review.score.toFixed(1)}
                  </span>
                  <span className="text-xs text-slate-500">{review.date}</span>
                </div>
                <p className="text-sm text-slate-300 italic">
                  "{review.comment}"
                </p>
              </div>
            ))}
            <button className="w-full py-2 text-center text-sm text-slate-400 hover:text-white transition-colors">
              Ver histórico completo
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParticipantView;
