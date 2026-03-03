const Button = ({ icon, label, color, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold ${color}`}
    >
      <span className="material-symbols-outlined text-[20px]">{icon ? icon : ''}</span>
      <span>{label}</span>
    </button>
  );
};

export default Button;
