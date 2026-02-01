import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, Check, CheckCircle, Share2, Users, X } from "lucide-react";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Header from "../components/Header";

/*type GameRole = "admin" | "player";
type GameStatus = "active" | "inactive";
type UserStatus =
  | "confirmed"
  | "pending_payment"
  | "pending_approval"
  | "pending";*/
type PaymentStatus = "paid" | "pending";
type ParticipantType = "mensalista" | "avulso" | "visitante";

/*interface Game {
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
}*/

interface Participant {
  id: number;
  name: string;
  status: "confirmed" | "pending";
  payment: PaymentStatus;
  type: ParticipantType;
}

const MOCK_PARTICIPANTS: Participant[] = [
  {
    id: 1,
    name: "Carlos Silva",
    status: "confirmed",
    payment: "paid",
    type: "mensalista",
  },
  {
    id: 2,
    name: "Bruno Souza",
    status: "confirmed",
    payment: "pending",
    type: "avulso",
  },
  {
    id: 3,
    name: "André Matos",
    status: "pending",
    payment: "pending",
    type: "visitante",
  },
  {
    id: 4,
    name: "Felipe Costa",
    status: "confirmed",
    payment: "paid",
    type: "mensalista",
  },
];

const GameAdminView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: "approve" | "reject";
    participantName: string | null;
  }>({ isOpen: false, type: "approve", participantName: null });

  const game = location.state?.game;

  const handleBack = () => {
    navigate(-1);
  };

  if (!game) return <div className="p-8">Erro: Jogo não selecionado.</div>;

  return (
    <>
      {" "}
      <Header />
      <div className="pb-24 animate-fade-in-up px-4 md:px-6 lg:px-24">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 -mx-4 -mt-6 mb-6 md:rounded-b-3xl md:mx-0 md:mt-0 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={handleBack}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
            <h1 className="text-xl font-bold">{game.name}</h1>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Próximo Jogo</p>
              <p className="text-2xl font-bold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-400" />{" "}
                {game.nextGame.split(" às ")[0]}
              </p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-sm mb-1">Horário</p>
              <p className="text-xl font-semibold">
                {game.nextGame.split(" às ")[1]}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Button
            variant="secondary"
            className="bg-emerald-600 hover:bg-emerald-700 w-full"
            icon={Share2}
          >
            Lista WhatsApp
          </Button>
          <Button variant="secondary" className="w-full" icon={Users}>
            Sortear Times
          </Button>
        </div>

        {/* Participants List */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold text-slate-900">Lista de Presença</h2>
            <span className="text-sm text-slate-500">
              {MOCK_PARTICIPANTS.length}/{game.id === 1 ? "14" : "12"} vagas
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {MOCK_PARTICIPANTS.map((p) => (
              <div
                key={p.id}
                className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                    {p.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">
                      {p.name}
                    </p>
                    <div className="flex gap-2 mt-1">
                      <Badge status={p.type} type="type" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {p.payment === "pending" ? (
                    <button className="text-xs bg-emerald-50 text-emerald-600 font-medium px-2 py-1 rounded border border-emerald-100 hover:bg-emerald-100 transition-colors">
                      Confirmar Pagamento
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-600 flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" /> Pago
                    </span>
                  )}
                  {p.status === "pending" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setConfirmModal({
                            isOpen: true,
                            type: "reject",
                            participantName: p.name,
                          })
                        }
                        className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 transition-colors"
                        title="Reprovar"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          setConfirmModal({
                            isOpen: true,
                            type: "approve",
                            participantName: p.name,
                          })
                        }
                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-100 transition-colors"
                        title="Aprovar"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <Badge status={p.status} />
                  )}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-3 text-center text-sm font-medium text-slate-500 hover:text-emerald-600 hover:bg-slate-50 transition-colors border-t border-slate-100">
            Ver lista completa
          </button>
        </div>

        {/* Confirmation Modal */}
        {confirmModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in-up">
            <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {confirmModal.type === "approve"
                  ? "Aprovar Visitante"
                  : "Reprovar Visitante"}
              </h3>
              <p className="text-slate-600 mb-6">
                Tem certeza que deseja{" "}
                {confirmModal.type === "approve" ? "aprovar" : "reprovar"} a
                entrada de <strong>{confirmModal.participantName}</strong>?
              </p>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  className="flex-1"
                  onClick={() =>
                    setConfirmModal({ ...confirmModal, isOpen: false })
                  }
                >
                  Cancelar
                </Button>
                <Button
                  variant={
                    confirmModal.type === "approve" ? "primary" : "danger"
                  }
                  className="flex-1"
                  onClick={() => {
                    setConfirmModal({ ...confirmModal, isOpen: false });
                  }}
                >
                  Confirmar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GameAdminView;
