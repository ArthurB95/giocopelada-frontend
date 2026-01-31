import { ChevronRight, DollarSign, LogOut, Shield, User } from "lucide-react";
import Header from "../components/Header";

const UserProfile: React.FC = () => {
  return (
    <>
    <Header />
      <div className="pb-24 animate-fade-in-up px-4 md:px-6 lg:px-24">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Meu Perfil</h1>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 text-center mb-6">
          <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 border-4 border-white shadow-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
              <User className="w-12 h-12" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-slate-900">João Jogador</h2>
          <p className="text-slate-500">Meio-campo | Destro</p>
        </div>

        <div className="space-y-3">
          <button className="w-full bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3 text-slate-700">
              <Shield className="w-5 h-5 text-emerald-500" />
              Dados Pessoais
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300" />
          </button>
          <button className="w-full bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3 text-slate-700">
              <DollarSign className="w-5 h-5 text-emerald-500" />
              Histórico de Pagamentos
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300" />
          </button>
          <button className="w-full bg-red-50 p-4 rounded-xl border border-red-100 flex items-center justify-between hover:bg-red-100 text-red-600 transition-colors">
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5" />
              Sair
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
