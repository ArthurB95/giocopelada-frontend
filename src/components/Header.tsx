import { LayoutDashboard, Trophy, User } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

interface AppLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { 
      id: "dashboard", 
      icon: LayoutDashboard, 
      label: "Jogos", 
      path: "/dashboard" 
    },
    { 
      id: "profile", 
      icon: User, 
      label: "Perfil", 
      path: "/userprofile"
    },
  ];

const checkIsActive = (tabPath: string) => {
    return location.pathname === tabPath;
  };

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

  return (
      <div className="">
        <style>{styles}</style>

        {/* Desktop Topbar */}
        <div className="hidden md:block fixed top-0 w-full z-40 bg-white border-b border-slate-200 px-8 py-4 shadow-sm">
          <div className="flex justify-between items-center max-w-5xl mx-auto">
            <div className="flex items-center gap-2 font-bold text-xl text-slate-900">
              <div className="bg-emerald-500 p-1.5 rounded-lg">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              Gioco Pelada
            </div>
            <div className="flex gap-6">
              {tabs.map((tab) => {
                const isActive = checkIsActive(tab.path);
                return (
                  <button
                    key={tab.id}
                    onClick={() => navigate(tab.path)}
                    className={`flex items-center gap-2 font-medium transition-colors ${
                      isActive
                        ? "text-emerald-600"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content (Onde as páginas aparecem) */}
        <main className="max-w-5xl mx-auto px-4 md:px-8 pt-6 md:pt-28 h-full">
          <Outlet />
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 pb-safe z-50">
          <div className="flex justify-around items-center h-16">
            {tabs.map((tab) => {
              const isActive = checkIsActive(tab.path);

              return (
                <button
                  key={tab.id}
                  onClick={() => navigate(tab.path)}
                  className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                    isActive ? "text-emerald-600" : "text-slate-400"
                  }`}
                >
                  <tab.icon
                    className={`w-6 h-6 mb-1 ${
                      isActive ? "scale-110" : ""
                    } transition-transform`}
                  />
                  <span className="text-[10px] font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
  );
};

export default Header;
