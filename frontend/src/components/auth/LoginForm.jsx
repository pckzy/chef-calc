import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../lib/axios";
import AuthInputField from "../common/AuthInputField";
import AuthButton from "../common/AuthButton";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { session } = response.data;

      localStorage.setItem("sb-access-token", session.access_token);

      console.log("Login Success!");
      navigate("/dashboard");
    } catch (err) {
      const errorMessage =
        "Login failed. Please check your credentials and try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[440px] flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-slate-900 dark:text-white text-[32px] font-bold">
          Sign In
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-base font-normal">
          New to ChefCalc?{" "}
          <Link
            to="/register"
            className="text-primary hover:text-green-400 font-semibold transition-colors"
          >
            Create an account
          </Link>
        </p>
      </div>
      {error && (
        <div
          className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200"
          role="alert"
        >
          <span className="material-symbols-outlined text-red-600 dark:text-red-400">
            error
          </span>
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      <form className="flex flex-col gap-5" onSubmit={handleSignIn}>
        <AuthInputField
          label="Email Address"
          icon="mail"
          type="email"
          placeholder="owner@restaurant.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <AuthInputField
          label="Password"
          icon="lock"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          //   rightLabel={
          //     <Link
          //       className="text-primary text-sm font-semibold"
          //       to="/forgot-password"
          //     >
          //       Forgot Password?
          //     </Link>
          //   }
        />

        <AuthButton
          text={isLoading ? "Signing In..." : "Sign In"}
          disabled={isLoading}
          type="submit"
        />
      </form>
    </div>
  );
};

export default LoginForm;
