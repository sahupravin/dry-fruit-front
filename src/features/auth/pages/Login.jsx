import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { HiEnvelope, HiLockClosed, HiEye, HiEyeSlash, HiUserCircle } from "react-icons/hi2";
import Button from "../../../componenets/common/Button";
import AuthLayout from "./AuthLayout";
import { authService } from "../../../services/auth";
import { setLocalStorage } from "../../../utils/localStorage";

function Input({
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
  autoComplete,
  label,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="mb-3.5">
      {label && (
        <label className="text-brand-600 mb-1 block text-sm font-medium">
          {label}
        </label>
      )}
      <div className="border-brand-100 focus-within:border-brand-50 focus-within:ring-brand-50/20 group flex items-center gap-3 rounded-2xl border bg-white px-4 py-3 transition-all focus-within:ring-4">
        {Icon && (
          <Icon className="text-brand-600/40 group-focus-within:text-brand-50 h-5 w-5 transition-colors" />
        )}
        <input
          type={inputType}
          className="placeholder:text-brand-600/30 w-full bg-transparent text-sm font-medium outline-none"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-brand-600/40 hover:text-brand-600 transition-colors"
          >
            {showPassword ? (
              <HiEyeSlash className="h-5 w-5" />
            ) : (
              <HiEye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authService.login({ email, password });
      const { access_token } = response.data;
      setLocalStorage("access_token", access_token);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      // TODO: handle error (e.g., show toast)
      console.error("Login failed:", error);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Enter your details to access your account."
      visualImage="/sliderImg/hero_slider2.jpg"
      visualTitle="Premium Quality In Every Bite"
      visualDescription="Sign in to track your orders, manage your wishlist, and access member-only seasonal discounts on our entire collection."
      visualBadgeText="Verified Member Access"
      visualBadgeIcon={HiUserCircle}
    >
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          label="Email Address"
          icon={HiEnvelope}
          type="email"
          placeholder="e.g. alex@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <div className="relative">
          <Input
            label="Password"
            icon={HiLockClosed}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <div className="flex justify-end px-1 -mt-2 mb-4">
            <NavLink
              to="/auth/forgot-password"
              className="text-brand-50 hover:text-brand-500 text-xs font-semibold transition-colors"
            >
              Forgot password?
            </NavLink>
          </div>
        </div>

        <Button
          type="submit"
          textColor="white"
          className="h-11 w-full rounded-2xl text-sm font-bold shadow-brand-50/20 shadow-xl"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Signing in...
            </span>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-brand-600/60 text-sm">
          Don't have an account?{" "}
          <NavLink
            to="/auth/register"
            className="text-brand-50 hover:text-brand-500 font-bold transition-colors underline-offset-4 hover:underline"
          >
            Create one for free
          </NavLink>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
