interface BadgeProps {
  status?: string;
  type?: "status" | "payment" | "type";
}

const Badge: React.FC<BadgeProps> = ({ status, type = "status" }) => {
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
    visitante: "Visitante",
  };

  if (!status) return null;

  const key =
    type === "payment" && status === "pending" ? "pending_payment" : status;
    
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${styles[key] || styles.inactive}`}
    >
      {labels[key] || status}
    </span>
  );
};

export default Badge;
