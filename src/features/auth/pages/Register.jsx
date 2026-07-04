import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { HiEnvelope, HiLockClosed, HiUser, HiEye, HiEyeSlash, HiHandThumbUp } from "react-icons/hi2";
import Button from "../../../componenets/common/Button";
import AuthLayout from "./AuthLayout";
import { authService } from "../../../services/auth";

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

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agree) return;
    setLoading(true);
    try {
      await authService.register({ name, email, password });
      setLoading(false);
      navigate("/auth/login");
    } catch (error) {
      setLoading(false);
      // TODO: handle error (e.g., show toast)
      console.error("Registration failed:", error);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join us for the finest premium dry fruits."
      visualImage="/sliderImg/hero_slider3.jpg"
      visualTitle="Start Your Healthy Journey"
      visualDescription="Become a member today and get an instant 10% discount on your first order. Join 10,000+ health enthusiasts who trust our handpicked premium selection."
      visualBadgeText="New Member Special"
      visualBadgeIcon={HiHandThumbUp}
    >
      <form onSubmit={handleSubmit} className="space-y-1">
        <Input
          label="Full Name"
          icon={HiUser}
          placeholder="e.g. Alex Johnson"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
        <Input
          label="Email Address"
          icon={HiEnvelope}
          type="email"
          placeholder="e.g. alex@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <Input
          label="Password"
          icon={HiLockClosed}
          type="password"
          placeholder="Create a strong password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />

        <div className="flex items-center gap-2 py-1">
          <input
            type="checkbox"
            id="agree"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="accent-brand-50 h-4 w-4 rounded border-brand-100"
          />
          <label htmlFor="agree" className="text-brand-600/60 text-xs">
            I agree to the{" "}
            <NavLink to="/terms" className="text-brand-50 font-semibold">
              Terms
            </NavLink>{" "}
            and{" "}
            <NavLink to="/privacy" className="text-brand-50 font-semibold">
              Privacy
            </NavLink>
          </label>
        </div>

        <Button
          type="submit"
          textColor="white"
          className="h-11 w-full rounded-2xl text-sm font-bold shadow-brand-50/20 shadow-xl mt-1.5"
          disabled={loading || !agree}
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
              Creating...
            </span>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-brand-600/60 text-sm">
          Already have an account?{" "}
          <NavLink
            to="/auth/login"
            className="text-brand-50 hover:text-brand-500 font-bold transition-colors underline-offset-4 hover:underline"
          >
            Sign in here
          </NavLink>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;
