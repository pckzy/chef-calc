import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../lib/axios";
import AuthInputField from "../common/AuthInputField";
import AuthButton from "../common/AuthButton";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    if (e) e.preventDefault();
    setFormErrors({});

    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/register", formData);

      toast.success('Register Success!');
      navigate("/login");
    } catch (err) {
      if (err.response?.data?.field) {
        setFormErrors({ [err.response.data.field]: err.response.data.error });
      } else {
        setError(err.response?.data?.error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[440px] flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-slate-900 dark:text-white text-[32px] font-bold">
          Create Account
        </h2>
        <p className="text-slate-500 text-base">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-semibold hover:text-green-400"
          >
            Sign In
          </Link>
        </p>
      </div>

      <form className="flex flex-col gap-5" onSubmit={handleRegister}>
        <AuthInputField
          label="Full Name"
          icon="person"
          name="fullName"
          placeholder="John Doe"
          value={formData.fullName}
          error={formErrors.fullName}
          onChange={handleChange}
          required
        />
        <AuthInputField
          label="Email Address"
          icon="mail"
          type="email"
          name="email"
          placeholder="owner@restaurant.com"
          value={formData.email}
          error={formErrors.email}
          onChange={handleChange}
          required
        />
        <AuthInputField
          label="Password"
          icon="lock"
          type="password"
          name="password"
          placeholder="Create a strong password"
          value={formData.password}
          error={formErrors.password}
          onChange={handleChange}
          required
        />
        <AuthInputField
          label="Confirm Password"
          icon="lock"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          error={formErrors.confirmPassword}
          onChange={handleChange}
          required
        />
        <AuthButton
          text={isLoading ? "Creating Account..." : "Create Account"}
          disabled={isLoading}
          type="submit"
        />
      </form>
    </div>
  );
};

export default RegisterForm;
