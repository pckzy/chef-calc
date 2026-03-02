import BrandSection from '../components/auth/BrandSection'
import RegisterForm from '../components/auth/RegisterForm'

const RegisterPage = () => {
  return (
    <div className="flex flex-1 min-h-screen w-full overflow-hidden font-display">
      <BrandSection />
      
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-background-light dark:bg-background-dark px-4 py-12 relative">
        {/* Mobile Logo Only */}
        <div className="lg:hidden absolute top-8 left-8 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl">restaurant_menu</span>
          <span className="text-slate-900 dark:text-white text-lg font-bold">ChefCalc</span>
        </div>

        <RegisterForm />

        <footer className="absolute bottom-6 w-full text-center">
          <p className="text-slate-400 text-xs">
            © 2026 ChefCalc.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default RegisterPage
