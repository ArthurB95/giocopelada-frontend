import { LucideIcon } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  placeholder,
  icon: Icon,
  ...props
}) => {
  return (
    <div className="mb-5">
      <label className="block text-sm font-bold text-slate-700 mb-2">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          type={type}
          className={`w-full ${Icon ? "pl-11" : "pl-4"} pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none bg-slate-50 focus:bg-white font-medium placeholder-slate-400 text-slate-900`}
          placeholder={placeholder}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
