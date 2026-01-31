import { Calendar, ChevronRight, Clock, MapPin, Plus } from "lucide-react";
import Button from "../components/Button";
import Card from "../components/Card";
import Badge from "../components/Badge";
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

interface DashboardProps {
  onSelectGame: (game: Game) => void;
  onCreateGame: () => void;
}

const MOCK_GAMES: Game[] = [
  {
    id: 1,
    name: "Pelada de Terça",
    sport: "Futebol Society",
    location: "Arena Pampulha",
    address: "Av. Portugal, 1200 - Pampulha",
    nextGame: "24/10 às 20:00",
    role: "admin",
    status: "active",
    price: 25.0,
  },
  {
    id: 2,
    name: "Vôlei dos Amigos",
    sport: "Vôlei",
    location: "Clube Círculo Militar",
    address: "Rua Exemplo, 500 - Centro",
    nextGame: "26/10 às 19:00",
    role: "player",
    status: "active",
    userStatus: "confirmed",
    paymentStatus: "paid",
  },
];

const Dashboard: React.FC<DashboardProps> = ({
  onSelectGame,
  onCreateGame,
}) => {
  return (
    <>
      <Header />
      <div className="space-y-6 pb-14 px-4 md:px-6 lg:px-24">
        <div className="flex justify-between items-center ">
          <h1 className="text-2xl font-bold text-slate-900">Minhas Peladas</h1>
          <Button icon={Plus} onClick={onCreateGame} className="hidden md:flex">
            Criar Nova
          </Button>
        </div>

        {MOCK_GAMES.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Calendar className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">
              Nenhuma pelada encontrada
            </h3>
            <p className="text-slate-500 mt-2 mb-6">
              Você ainda não participa de nenhum jogo.
            </p>
            <Button onClick={onCreateGame}>Criar minha primeira pelada</Button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {MOCK_GAMES.map((game) => (
              <Card
                key={game.id}
                onClick={() => onSelectGame(game)}
                className="group cursor-pointer hover:border-emerald-200"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-200 transform group-hover:scale-110 transition-transform">
                      {game.sport[0]}
                    </div>
                    <Badge status={game.status} />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">
                    {game.name}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">{game.sport}</p>

                  <div className="space-y-2 mb-5">
                    <div className="flex items-center text-sm text-slate-600">
                      <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                      <span className="truncate">{game.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <Clock className="w-4 h-4 mr-2 text-slate-400" />
                      {game.nextGame}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      {game.role === "admin" ? "Administrador" : "Participante"}
                    </span>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
        {/* Mobile Floating Action Button */}
        <button
          onClick={onCreateGame}
          className="md:hidden fixed bottom-24 right-4 w-14 h-14 bg-emerald-500 text-white rounded-full shadow-xl flex items-center justify-center z-40 hover:bg-emerald-600 transition-colors"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </>
  );
};

export default Dashboard;
