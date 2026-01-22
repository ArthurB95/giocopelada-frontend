import React, { useState, useEffect } from 'react';
import { 
  Trophy, Calendar, MapPin, Users, DollarSign, 
  CheckCircle, Clock, Settings, LogOut, 
  Menu, X, ChevronRight, Share2, Star, Plus, 
  LayoutDashboard, User, Shield, ArrowRight, Play,
  LucideIcon, Zap, Lock, Mail
} from 'lucide-react';

// --- STYLES FOR ANIMATIONS ---
const styles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  @keyframes pulse-soft {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .animate-delay-100 { animation-delay: 0.1s; }
  .animate-delay-200 { animation-delay: 0.2s; }
  .animate-delay-300 { animation-delay: 0.3s; }
  
  .glass-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.5);
  }
`;

// --- TYPES & INTERFACES ---

type GameRole = 'admin' | 'player';
type GameStatus = 'active' | 'inactive';
type UserStatus = 'confirmed' | 'pending_payment' | 'pending_approval' | 'pending';
type PaymentStatus = 'paid' | 'pending';
type ParticipantType = 'mensalista' | 'avulso' | 'visitante';

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

interface Participant {
  id: number;
  name: string;
  status: 'confirmed' | 'pending';
  payment: PaymentStatus;
  type: ParticipantType;
}

interface Review {
  id: number;
  score: number;
  date: string;
  comment: string;
}

// --- MOCK DATA ---
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
    price: 25.00
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
    paymentStatus: "paid"
  }
];

const MOCK_PARTICIPANTS: Participant[] = [
  { id: 1, name: "Carlos Silva", status: "confirmed", payment: "paid", type: "mensalista" },
  { id: 2, name: "Bruno Souza", status: "confirmed", payment: "pending", type: "avulso" },
  { id: 3, name: "André Matos", status: "pending", payment: "pending", type: "visitante" },
  { id: 4, name: "Felipe Costa", status: "confirmed", payment: "paid", type: "mensalista" },
];

const MOCK_REVIEWS: Review[] = [
  { id: 1, score: 9.5, date: "15/10/2023", comment: "Jogou muito! Deu duas assistências." },
  { id: 2, score: 8.0, date: "08/10/2023", comment: "Chegou no horário, jogo limpo." },
  { id: 3, score: 10.0, date: "01/10/2023", comment: "Goleiro fechou o gol hoje." },
];

// --- COMPONENTS PROPS ---

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'white';
  icon?: LucideIcon;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface BadgeProps {
  status?: string;
  type?: 'status' | 'payment' | 'type';
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
}

// --- COMPONENTS ---

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', onClick, icon: Icon, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center font-bold transition-all duration-300 rounded-xl px-6 py-3.5 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5";
  
  const variants = {
    primary: "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 focus:ring-emerald-500",
    secondary: "bg-slate-800 hover:bg-slate-900 text-white shadow-lg shadow-slate-800/30 focus:ring-slate-800",
    outline: "border-2 border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-500 bg-transparent hover:bg-emerald-50",
    ghost: "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
    white: "bg-white text-emerald-600 hover:bg-slate-50 shadow-lg shadow-black/10"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} onClick={onClick} {...props}>
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      {children}
    </button>
  );
};

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 ${className}`}
  >
    {children}
  </div>
);

const Badge: React.FC<BadgeProps> = ({ status, type = 'status' }) => {
  const styles: Record<string, string> = {
    // Game Status
    active: "bg-emerald-100 text-emerald-700",
    inactive: "bg-slate-100 text-slate-600",
    // Player Status
    confirmed: "bg-emerald-100 text-emerald-700",
    pending: "bg-amber-100 text-amber-700",
    pending_approval: "bg-blue-100 text-blue-700",
    // Payment Status
    paid: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    pending_payment: "bg-red-50 text-red-600 border border-red-100",
    // Type Status
    mensalista: "bg-blue-50 text-blue-700 border border-blue-100",
    avulso: "bg-purple-50 text-purple-700 border border-purple-100",
    visitante: "bg-slate-100 text-slate-600",
  };

  const labels: Record<string, string> = {
    active: "Ativo",
    inactive: "Inativo",
    confirmed: "Confirmado",
    pending: "Pendente",
    pending_approval: "Aprovar",
    paid: "Pago",
    pending_payment: "Pendente",
    mensalista: "Mensalista",
    avulso: "Avulso",
    visitante: "Visitante"
  };

  if (!status) return null;

  const key = type === 'payment' && status === 'pending' ? 'pending_payment' : status;

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${styles[key] || styles.inactive}`}>
      {labels[key] || status}
    </span>
  );
};

const Input: React.FC<InputProps> = ({ label, type = "text", placeholder, icon: Icon, ...props }) => (
  <div className="mb-5">
    <label className="block text-sm font-bold text-slate-700 mb-2">{label}</label>
    <div className="relative">
        {Icon && (
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Icon className="w-5 h-5" />
            </div>
        )}
        <input 
        type={type} 
        className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none bg-slate-50 focus:bg-white font-medium placeholder-slate-400 text-slate-900`}
        placeholder={placeholder}
        {...props}
        />
    </div>
  </div>
);

// --- SCREENS ---

interface LandingPageProps {
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      <style>{styles}</style>
      
      {/* Navbar Landing */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-500 p-2 rounded-xl shadow-lg shadow-emerald-500/20 transform transition hover:scale-105">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-900">Gioco<span className="text-emerald-500">Pelada</span></span>
            </div>
            
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#benefits" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Vantagens</a>
              <a href="#how-it-works" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Como Funciona</a>
              <a href="#testimonials" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Depoimentos</a>
              <Button variant="ghost" onClick={onLogin}>Entrar</Button>
              <Button onClick={onLogin} className="shadow-emerald-500/30">Começar Agora</Button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 p-2">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 p-4 shadow-xl absolute w-full animate-fade-in-up">
            <div className="flex flex-col space-y-4">
              <a href="#benefits" onClick={() => setIsMenuOpen(false)} className="text-slate-600 font-medium py-2">Vantagens</a>
              <a href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="text-slate-600 font-medium py-2">Como Funciona</a>
              <Button onClick={onLogin} className="w-full">Criar Conta Grátis</Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
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
            Chega de lista de papel.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-blue-500">Sua pelada merece nível pro.</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-delay-100">
            A plataforma completa para gerenciar pagamentos, sortear times equilibrados e avaliar jogadores. Tudo automatizado para você só se preocupar em jogar.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-delay-200 mb-16">
            <Button onClick={onLogin} className="px-10 py-4 text-lg shadow-xl hover:shadow-2xl shadow-emerald-500/20 transform hover:-translate-y-1">
              Organizar minha pelada
            </Button>
            <Button variant="outline" onClick={onLogin} className="px-10 py-4 text-lg border-2" icon={Play}>
              Ver demonstração
            </Button>
          </div>
        </div>

        {/* Hero Image Mockup (Dashboard Simulation) */}
        <div className="mt-10 relative mx-auto max-w-5xl animate-fade-in-up animate-delay-300">
           {/* Floating Badge 1 */}
           <div className="absolute -left-4 top-20 z-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-float hidden md:flex">
              <div className="bg-green-100 p-2 rounded-lg text-green-600"><CheckCircle className="w-6 h-6" /></div>
              <div>
                  <p className="text-xs text-slate-500 font-bold uppercase">Pagamento</p>
                  <p className="text-sm font-bold text-slate-900">R$ 350,00 Recebidos</p>
              </div>
           </div>

           {/* Floating Badge 2 */}
           <div className="absolute -right-8 bottom-40 z-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-float animate-delay-200 hidden md:flex">
              <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600"><Star className="w-6 h-6 fill-yellow-500" /></div>
              <div>
                  <p className="text-xs text-slate-500 font-bold uppercase">Craque da Partida</p>
                  <p className="text-sm font-bold text-slate-900">João Silva (9.8)</p>
              </div>
           </div>

          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-[2.5rem] blur opacity-20"></div>
          <div className="relative bg-slate-50 border border-slate-200 rounded-3xl shadow-2xl overflow-hidden aspect-[16/9] flex flex-col transform hover:scale-[1.01] transition-transform duration-500">
            
            {/* Mock Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
               <div className="flex items-center gap-2">
                  <div className="bg-emerald-500 p-1.5 rounded-lg"><Trophy className="w-4 h-4 text-white" /></div>
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
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">Painel do Organizador</h2>
                      <p className="text-slate-500 text-sm">Próximo jogo: Quinta-feira, 20:00</p>
                  </div>
                  <button className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-200 flex items-center gap-2">
                      <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Novo Jogo</span>
                  </button>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {/* Card 1 */}
                  <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm relative">
                      <div className="flex justify-between items-start mb-4">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold shadow-emerald-100">F</div>
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded-full">Confirmado</span>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-1">Futebol de Quinta</h3>
                      <div className="space-y-2 pt-4 border-t border-slate-50 mt-4">
                          <div className="flex items-center text-xs text-slate-600 justify-between">
                              <span className="flex items-center gap-1"><Users className="w-3 h-3 text-emerald-500" /> 14 Jogadores</span>
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
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold shadow-blue-100">V</div>
                          <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase rounded-full">Próxima Sem.</span>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-1">Vôlei dos Amigos</h3>
                       <div className="space-y-2 pt-4 border-t border-slate-50 mt-4">
                          <div className="flex items-center text-xs text-slate-600 justify-between">
                              <span className="flex items-center gap-1"><Users className="w-3 h-3 text-blue-500" /> 8 Jogadores</span>
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
                      <p className="text-sm font-medium text-slate-400">Criar novo grupo</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="bg-slate-900 py-10 border-y border-slate-800">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 text-slate-400 font-medium">
              <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-emerald-500" /> Dados Seguros</div>
              <div className="flex items-center gap-2"><Users className="w-5 h-5 text-emerald-500" /> +10k Jogadores</div>
              <div className="flex items-center gap-2"><Star className="w-5 h-5 text-emerald-500" /> 4.9/5 Avaliação</div>
              <div className="flex items-center gap-2"><Zap className="w-5 h-5 text-emerald-500" /> Suporte 24/7</div>
          </div>
      </div>

      {/* Advantages Section */}
      <div className="bg-white py-24" id="benefits">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
              <h2 className="text-emerald-600 font-bold tracking-wide uppercase text-sm mb-2">Por que usar o Gioco?</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">Tudo o que você precisa para o jogo perfeito</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: DollarSign, 
                title: "Adeus Caloteiros", 
                desc: "Controle quem pagou e quem deve em tempo real. O sistema envia lembretes automáticos para os esquecidos.",
                color: "bg-green-100 text-green-600"
              },
              { 
                icon: Users, 
                title: "Times Equilibrados", 
                desc: "Nosso algoritmo usa as notas dos jogadores para montar times justos. Acabe com as panelinhas e reclamações.",
                color: "bg-blue-100 text-blue-600"
              },
              { 
                icon: Star, 
                title: "Gamificação Real", 
                desc: "Avalie os jogadores após cada partida. Quem joga limpo sobe no ranking, quem joga sujo fica de fora.",
                color: "bg-yellow-100 text-yellow-600"
              }
            ].map((feature, idx) => (
              <div key={idx} className="group p-8 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100">
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works Section */}
      <div className="bg-slate-50 py-24" id="how-it-works">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-emerald-600 font-bold tracking-wide uppercase text-sm mb-2">Como Funciona</h2>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Do grupo de Zap para o campo em minutos.</h3>
                    <p className="text-lg text-slate-600 mb-10">Simplificamos todo o processo chato para que você tenha mais tempo para resenhar.</p>
                    
                    <div className="space-y-8">
                        {[
                            { step: "01", title: "Crie sua Pelada", text: "Defina local, horário, valor e número de vagas." },
                            { step: "02", title: "Envie o Link", text: "Compartilhe no WhatsApp. Os jogadores confirmam presença em 1 clique." },
                            { step: "03", title: "Gerencie", text: "Acompanhe pagamentos e sorteie os times automaticamente." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="text-2xl font-bold text-emerald-500/30">{item.step}</div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">{item.title}</h4>
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
                                    <div className="font-bold flex items-center gap-2 mb-1"><Trophy className="w-3 h-3" /> Gioco Pelada</div>
                                    <div className="font-medium underline">giocopelada.com/convite/392</div>
                                    <div className="text-emerald-100 text-xs mt-1">Toque para confirmar presença</div>
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

      {/* Testimonials */}
      <div className="bg-white py-24 border-t border-slate-100" id="testimonials">
          <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-center text-3xl font-extrabold text-slate-900 mb-16">O que os organizadores dizem</h2>
              <div className="grid md:grid-cols-3 gap-8">
                  {[
                      { name: "Ricardo M.", role: "Organizador há 3 anos", text: "Antes eu gastava 2 horas por semana cobrando o pessoal. Hoje gasto 5 minutos. O Gioco salvou meu casamento com a pelada!" },
                      { name: "Fernanda S.", role: "Vôlei de Sexta", text: "O sorteio de times é sensacional. Acabaram as brigas de 'time desequilibrado'. O app é muito justo." },
                      { name: "Pedro H.", role: "Futebol Society", text: "A interface é muito limpa e moderna. Meus amigos que não entendem nada de tecnologia usam sem problemas." }
                  ].map((t, i) => (
                      <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 relative">
                          <div className="text-emerald-500 mb-4"><Star className="w-5 h-5 fill-emerald-500 inline mr-1"/><Star className="w-5 h-5 fill-emerald-500 inline mr-1"/><Star className="w-5 h-5 fill-emerald-500 inline mr-1"/><Star className="w-5 h-5 fill-emerald-500 inline mr-1"/><Star className="w-5 h-5 fill-emerald-500 inline mr-1"/></div>
                          <p className="text-slate-700 italic mb-6">"{t.text}"</p>
                          <div>
                              <p className="font-bold text-slate-900">{t.name}</p>
                              <p className="text-sm text-slate-500">{t.role}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>
      
      {/* Final CTA */}
      <div className="py-20 px-4">
          <div className="max-w-5xl mx-auto bg-emerald-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-emerald-900/20">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Pronto para profissionalizar sua pelada?</h2>
                  <p className="text-emerald-100 text-xl mb-10 max-w-2xl mx-auto">Junte-se a milhares de esportistas e transforme a organização do seu jogo hoje mesmo.</p>
                  <Button onClick={onLogin} variant="white" className="px-10 py-4 text-lg">
                      Criar Conta Gratuitamente
                  </Button>
                  <p className="text-emerald-200/80 text-sm mt-6">Sem cartão de crédito • Cancele quando quiser</p>
              </div>
          </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-4 text-white">
                    <Trophy className="w-6 h-6 text-emerald-500" />
                    <span className="text-xl font-bold">Gioco Pelada</span>
                </div>
                <p className="max-w-sm">A plataforma definitiva para organização esportiva amadora. Feito por quem joga, para quem joga.</p>
            </div>
            <div>
                <h4 className="text-white font-bold mb-4">Produto</h4>
                <ul className="space-y-2">
                    <li><a href="#" className="hover:text-emerald-400">Funcionalidades</a></li>
                    <li><a href="#" className="hover:text-emerald-400">Preços</a></li>
                    <li><a href="#" className="hover:text-emerald-400">App Mobile</a></li>
                </ul>
            </div>
             <div>
                <h4 className="text-white font-bold mb-4">Suporte</h4>
                <ul className="space-y-2">
                    <li><a href="#" className="hover:text-emerald-400">Central de Ajuda</a></li>
                    <li><a href="#" className="hover:text-emerald-400">Termos de Uso</a></li>
                    <li><a href="#" className="hover:text-emerald-400">Privacidade</a></li>
                </ul>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-slate-800 text-center text-sm">
            <p>© 2024 Gioco Pelada. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => (
  <div className="min-h-screen flex bg-white">
    {/* Left Side - Visual & Branding (Hidden on mobile) */}
    <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-16 text-white">
      {/* Abstract Sports Background */}
      <div className="absolute inset-0 bg-slate-800">
         <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 to-slate-900/90 z-10"></div>
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
      </div>

      <div className="relative z-20 animate-fade-in-up">
         <div className="flex items-center gap-3 mb-8">
            <div className="bg-emerald-500 p-2.5 rounded-xl shadow-lg shadow-emerald-900/50">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold tracking-tight text-white">Gioco<span className="text-emerald-400">Pelada</span></span>
         </div>
      </div>

      <div className="relative z-20 max-w-lg animate-fade-in-up animate-delay-200">
         <h2 className="text-5xl font-extrabold mb-8 leading-[1.15] tracking-tight">
            A organização do seu jogo <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">começa aqui.</span>
         </h2>
         <p className="text-slate-300 text-xl mb-12 leading-relaxed font-light">
            Junte-se a mais de 10.000 peladeiros que abandonaram a planilha e o caderninho para focar no que importa: o jogo.
         </p>
         
         <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
             <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 z-${i}0`}>
                       {i === 4 ? '+99' : ''}
                    </div>
                 ))}
             </div>
             <div>
                <p className="font-bold text-white text-lg">Comunidade Ativa</p>
                <p className="text-slate-400 text-sm">Peladeiros organizando jogos agora</p>
             </div>
         </div>
      </div>

      <div className="relative z-20 text-slate-500 text-sm">
          © 2024 Gioco Pelada Inc.
      </div>
    </div>

    {/* Right Side - Form */}
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-white relative">
       {/* Decorator for mobile */}
       <div className="lg:hidden absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>

       <div className="max-w-md w-full animate-fade-in-up">
           {/* Mobile Logo Only */}
           <div className="lg:hidden flex justify-center mb-10">
               <div className="bg-emerald-50 p-3 rounded-2xl">
                   <Trophy className="w-8 h-8 text-emerald-600" />
               </div>
           </div>

           <div className="text-center lg:text-left mb-10">
               <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3">Bem-vindo de volta!</h2>
               <p className="text-slate-500 text-lg">Entre com suas credenciais para acessar o painel.</p>
           </div>

           {/* Enhanced Google Button */}
           <button 
             onClick={onLoginSuccess}
             className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 p-4 rounded-xl text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm mb-8 group relative overflow-hidden"
           >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform relative z-10" />
              <span className="relative z-10">Continuar com Google</span>
           </button>

           <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
              <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-slate-400 font-medium">ou entre com email</span></div>
           </div>

           <div className="space-y-6">
               <Input label="Email" placeholder="seu@email.com" type="email" icon={Mail} />
               
               <div>
                  <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-bold text-slate-700">Senha</label>
                      <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700 hover:underline">Esqueceu?</button>
                  </div>
                  <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <Lock className="w-5 h-5" />
                      </div>
                      <input 
                        type="password" 
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none bg-slate-50 focus:bg-white font-medium placeholder-slate-400 text-slate-900"
                        placeholder="••••••••" 
                      />
                  </div>
               </div>
               
               <Button className="w-full py-4 text-lg shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30" onClick={onLoginSuccess} icon={ArrowRight}>
                   Entrar na Plataforma
               </Button>
           </div>

           <p className="text-center mt-8 text-slate-500 text-sm">
               Não tem uma conta? <button className="text-emerald-600 font-bold hover:underline" onClick={onLoginSuccess}>Cadastre-se gratuitamente</button>
           </p>
       </div>
    </div>
  </div>
);

// --- APP INTERNAL SCREENS ---

interface DashboardProps {
  onSelectGame: (game: Game) => void;
  onCreateGame: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectGame, onCreateGame }) => (
  <div className="space-y-6 pb-24">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-slate-900">Minhas Peladas</h1>
      <Button icon={Plus} onClick={onCreateGame} className="hidden md:flex">Criar Nova</Button>
    </div>

    {MOCK_GAMES.length === 0 ? (
      <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
        <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
          <Calendar className="w-10 h-10" />
        </div>
        <h3 className="text-lg font-medium text-slate-900">Nenhuma pelada encontrada</h3>
        <p className="text-slate-500 mt-2 mb-6">Você ainda não participa de nenhum jogo.</p>
        <Button onClick={onCreateGame}>Criar minha primeira pelada</Button>
      </div>
    ) : (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_GAMES.map(game => (
          <Card key={game.id} onClick={() => onSelectGame(game)} className="group cursor-pointer hover:border-emerald-200">
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-200 transform group-hover:scale-110 transition-transform">
                  {game.sport[0]}
                </div>
                <Badge status={game.status} />
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">{game.name}</h3>
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
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{game.role === 'admin' ? 'Administrador' : 'Participante'}</span>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    )}
    {/* Mobile Floating Action Button */}
    <button onClick={onCreateGame} className="md:hidden fixed bottom-24 right-4 w-14 h-14 bg-emerald-500 text-white rounded-full shadow-xl flex items-center justify-center z-40 hover:bg-emerald-600 transition-colors">
        <Plus className="w-6 h-6" />
    </button>
  </div>
);

interface CreateGameScreenProps {
  onCancel: () => void;
}

const CreateGameScreen: React.FC<CreateGameScreenProps> = ({ onCancel }) => (
  <div className="max-w-2xl mx-auto pb-24 animate-fade-in-up">
    <div className="flex items-center mb-6">
      <button onClick={onCancel} className="mr-4 p-2 hover:bg-slate-100 rounded-lg"><ArrowRight className="w-5 h-5 rotate-180" /></button>
      <h1 className="text-2xl font-bold text-slate-900">Criar Nova Pelada</h1>
    </div>

    <form className="space-y-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mr-3"><Trophy className="w-4 h-4" /></div>
          Informações Gerais
        </h2>
        <div className="space-y-4">
          <Input label="Nome da Pelada" placeholder="Ex: Futebol de Quinta" />
          <div className="grid grid-cols-2 gap-4">
             <Input label="Esporte" placeholder="Futebol" />
             <Input label="Modalidade" placeholder="Society" />
          </div>
          <Input label="Local / Quadra" placeholder="Nome do local" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mr-3"><Calendar className="w-4 h-4" /></div>
          Configuração do Jogo
        </h2>
        <div className="space-y-4">
           <div className="grid grid-cols-2 gap-4">
             <Input label="Dia da Semana" placeholder="Quinta-feira" />
             <Input label="Horário" type="time" />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <Input label="Vagas Totais" type="number" placeholder="14" />
             <Input label="Valor por Jogo (R$)" type="number" placeholder="25,00" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
           <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mr-3"><Settings className="w-4 h-4" /></div>
           Avançado
        </h2>
        <div className="flex items-center justify-between py-2">
            <span className="text-slate-700 font-medium">Permitir visitantes?</span>
            <div className="w-11 h-6 bg-emerald-500 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
        </div>
        <div className="flex items-center justify-between py-2">
            <span className="text-slate-700 font-medium">Lista de espera automática?</span>
            <div className="w-11 h-6 bg-slate-200 rounded-full relative cursor-pointer"><div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button variant="ghost" className="flex-1" onClick={onCancel} type="button">Cancelar</Button>
        <Button className="flex-1" onClick={onCancel} type="button">Criar Pelada</Button>
      </div>
    </form>
  </div>
);

interface GameAdminViewProps {
  game: Game;
  onBack: () => void;
}

const GameAdminView: React.FC<GameAdminViewProps> = ({ game, onBack }) => (
  <div className="pb-24 animate-fade-in-up">
    {/* Header */}
    <div className="bg-slate-900 text-white p-6 -mx-4 -mt-6 mb-6 md:rounded-b-3xl md:mx-0 md:mt-0 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onBack} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"><ArrowRight className="w-5 h-5 rotate-180" /></button>
        <h1 className="text-xl font-bold">{game.name}</h1>
      </div>
      <div className="flex items-center justify-between">
        <div>
           <p className="text-slate-400 text-sm mb-1">Próximo Jogo</p>
           <p className="text-2xl font-bold flex items-center gap-2"><Calendar className="w-5 h-5 text-emerald-400" /> {game.nextGame.split(' às ')[0]}</p>
        </div>
        <div className="text-right">
           <p className="text-slate-400 text-sm mb-1">Horário</p>
           <p className="text-xl font-semibold">{game.nextGame.split(' às ')[1]}</p>
        </div>
      </div>
    </div>

    {/* Actions */}
    <div className="grid grid-cols-2 gap-4 mb-8">
      <Button variant="secondary" className="bg-emerald-600 hover:bg-emerald-700 w-full" icon={Share2}>
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
        <span className="text-sm text-slate-500">{MOCK_PARTICIPANTS.length}/{game.id === 1 ? '14' : '12'} vagas</span>
      </div>
      
      <div className="divide-y divide-slate-100">
        {MOCK_PARTICIPANTS.map(p => (
          <div key={p.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                    {p.name.charAt(0)}
                </div>
                <div>
                    <p className="font-semibold text-slate-900 text-sm">{p.name}</p>
                    <div className="flex gap-2 mt-1">
                        <Badge status={p.type} type="type" /> 
                    </div>
                </div>
             </div>
             <div className="flex flex-col items-end gap-2">
                 {p.payment === 'pending' ? (
                     <button className="text-xs bg-emerald-50 text-emerald-600 font-medium px-2 py-1 rounded border border-emerald-100 hover:bg-emerald-100 transition-colors">
                         Confirmar Pagamento
                     </button>
                 ) : (
                     <span className="text-xs text-emerald-600 flex items-center"><CheckCircle className="w-3 h-3 mr-1" /> Pago</span>
                 )}
                 <Badge status={p.status} />
             </div>
          </div>
        ))}
      </div>
      <button className="w-full py-3 text-center text-sm font-medium text-slate-500 hover:text-emerald-600 hover:bg-slate-50 transition-colors border-t border-slate-100">
          Ver lista completa
      </button>
    </div>
  </div>
);

interface ParticipantViewProps {
  game: Game;
  onBack: () => void;
}

const ParticipantView: React.FC<ParticipantViewProps> = ({ game, onBack }) => (
  <div className="pb-24 animate-fade-in-up">
    <div className="bg-white p-6 -mx-4 -mt-6 mb-6 border-b border-slate-200 md:rounded-b-3xl md:mx-0 md:mt-0 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
            <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><ArrowRight className="w-5 h-5 rotate-180 text-slate-700" /></button>
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
        
        {game.paymentStatus === 'paid' ? (
             <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-3 text-emerald-800">
                 <CheckCircle className="w-5 h-5" />
                 <span className="font-medium text-sm">Você está pronto para o jogo!</span>
             </div>
        ) : (
             <Button className="w-full" variant="primary">Realizar Pagamento</Button>
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
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Últimas Avaliações</h3>
            {MOCK_REVIEWS.map(review => (
                <div key={review.id} className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-emerald-400">{review.score.toFixed(1)}</span>
                        <span className="text-xs text-slate-500">{review.date}</span>
                    </div>
                    <p className="text-sm text-slate-300 italic">"{review.comment}"</p>
                </div>
            ))}
            <button className="w-full py-2 text-center text-sm text-slate-400 hover:text-white transition-colors">
                Ver histórico completo
            </button>
        </div>
    </div>
  </div>
);

const UserProfile: React.FC = () => (
    <div className="pb-24 animate-fade-in-up">
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
);


// --- MAIN APP CONTAINER ---

interface AppLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Jogos' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <style>{styles}</style>
      {/* Desktop Sidebar (Placeholder) / Topbar */}
      <div className="hidden md:block fixed top-0 w-full z-40 bg-white border-b border-slate-200 px-8 py-4 shadow-sm">
         <div className="flex justify-between items-center max-w-5xl mx-auto">
            <div className="flex items-center gap-2 font-bold text-xl text-slate-900">
                <div className="bg-emerald-500 p-1.5 rounded-lg"><Trophy className="w-5 h-5 text-white" /></div>
                Gioco Pelada
            </div>
            <div className="flex gap-6">
                {tabs.map(tab => (
                    <button 
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`flex items-center gap-2 font-medium transition-colors ${activeTab === tab.id ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <tab.icon className="w-5 h-5" />
                        {tab.label}
                    </button>
                ))}
            </div>
         </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 md:px-8 pt-6 md:pt-28 h-full">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 pb-safe z-50">
        <div className="flex justify-around items-center h-16">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button 
                key={tab.id} 
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActive ? 'text-emerald-600' : 'text-slate-400'}`}
              >
                <tab.icon className={`w-6 h-6 mb-1 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
};

// --- ROOT COMPONENT ---

export default function GiocoPeladaApp() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<string>('landing'); // landing, login, app
  const [appTab, setAppTab] = useState<string>('dashboard');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isCreatingGame, setIsCreatingGame] = useState<boolean>(false);

  // Router simulator
  const navigateTo = (view: string) => {
    setCurrentView(view);
    window.scrollTo(0,0);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigateTo('app');
  };

  const handleGameSelection = (game: Game) => {
    setSelectedGame(game);
  };

  const renderAppContent = () => {
    if (appTab === 'profile') return <UserProfile />;
    
    if (isCreatingGame) {
        return <CreateGameScreen onCancel={() => setIsCreatingGame(false)} />;
    }

    if (selectedGame) {
      if (selectedGame.role === 'admin') {
        return <GameAdminView game={selectedGame} onBack={() => setSelectedGame(null)} />;
      } else {
        return <ParticipantView game={selectedGame} onBack={() => setSelectedGame(null)} />;
      }
    }

    return <Dashboard onSelectGame={handleGameSelection} onCreateGame={() => setIsCreatingGame(true)} />;
  };

  if (!isAuthenticated) {
     if (currentView === 'login') return <LoginScreen onLoginSuccess={handleLogin} />;
     return <LandingPage onLogin={() => navigateTo('login')} />;
  }

  return (
    <AppLayout activeTab={appTab} onTabChange={(tab) => { setAppTab(tab); setSelectedGame(null); setIsCreatingGame(false); }}>
      <div className="animate-fade-in-up">
        {renderAppContent()}
      </div>
    </AppLayout>
  );
}