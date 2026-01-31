import { ArrowRight, Calendar, Settings, Trophy } from "lucide-react";
import Button from "../components/Button";
import Input from "../components/Input";
import Header from "../components/Header";

interface CreateGameScreenProps {
  onCancel: () => void;
}

const CreateGameScreen: React.FC<CreateGameScreenProps> = ({ onCancel }) => {
  return (
    <>
    <Header />
      <div className="max-w-2xl mx-auto pb-24 animate-fade-in-up">
        <div className="flex items-center mb-6">
          <button
            onClick={onCancel}
            className="mr-4 p-2 hover:bg-slate-100 rounded-lg"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
          </button>
          <h1 className="text-2xl font-bold text-slate-900">
            Criar Nova Pelada
          </h1>
        </div>

        <form className="space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mr-3">
                <Trophy className="w-4 h-4" />
              </div>
              Informações Gerais
            </h2>
            <div className="space-y-4">
              <Input
                label="Nome da Pelada"
                placeholder="Ex: Futebol de Quinta"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Esporte" placeholder="Futebol" />
                <Input label="Modalidade" placeholder="Society" />
              </div>
              <Input label="Local / Quadra" placeholder="Nome do local" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mr-3">
                <Calendar className="w-4 h-4" />
              </div>
              Configuração do Jogo
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Dia da Semana" placeholder="Quinta-feira" />
                <Input label="Horário" type="time" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Vagas Totais" type="number" placeholder="14" />
                <Input
                  label="Valor por Jogo (R$)"
                  type="number"
                  placeholder="25,00"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mr-3">
                <Settings className="w-4 h-4" />
              </div>
              Avançado
            </h2>
            <div className="flex items-center justify-between py-2">
              <span className="text-slate-700 font-medium">
                Permitir visitantes?
              </span>
              <div className="w-11 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-slate-700 font-medium">
                Lista de espera automática?
              </span>
              <div className="w-11 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              variant="ghost"
              className="flex-1"
              onClick={onCancel}
              type="button"
            >
              Cancelar
            </Button>
            <Button className="flex-1" onClick={onCancel} type="button">
              Criar Pelada
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateGameScreen;
