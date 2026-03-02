const AuthButton = ({ text, ...props }) => {
  return (
    <button
      {...props}
      className="mt-2 w-full h-12 bg-primary hover:bg-[#0fd650] text-background-dark font-bold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
    >
      {text}
    </button>
  );
};

export default AuthButton;
