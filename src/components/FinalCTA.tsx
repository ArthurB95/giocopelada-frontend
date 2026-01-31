import Button from "./Button";

interface LandingPageProps {
  onLogin: () => void;
}

const FinalCTA: React.FC<LandingPageProps> = ({ onLogin }) => {
  return (
    <div className="py-20 px-4">
      <div className="max-w-5xl mx-auto bg-emerald-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-emerald-900/20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Pronto para profissionalizar sua pelada?
          </h2>
          <p className="text-emerald-100 text-xl mb-10 max-w-2xl mx-auto">
            Junte-se a milhares de esportistas e transforme a organização do seu
            jogo hoje mesmo.
          </p>
          <Button
            onClick={onLogin}
            variant="white"
            className="px-10 py-4 text-lg"
          >
            Criar Conta Gratuitamente
          </Button>
          <p className="text-emerald-200/80 text-sm mt-6">
            Sem cartão de crédito • Cancele quando quiser
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinalCTA;
