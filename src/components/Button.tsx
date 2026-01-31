import { LucideIcon } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'white';
  icon?: LucideIcon;
}

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

export default Button;