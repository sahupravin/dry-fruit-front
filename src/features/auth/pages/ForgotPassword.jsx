import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { HiEnvelope, HiQuestionMarkCircle } from "react-icons/hi2";
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
          type={type}
          className="placeholder:text-brand-600/30 w-full bg-transparent text-sm font-medium outline-none"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
        />
      </div>
    </div>
  );
}

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.forgotPassword({ email });
      setLoading(false);
      // For this flow, we'll redirect to reset password
      navigate("/auth/reset-password");
    } catch (error) {
      setLoading(false);
      console.error("Forgot password request failed:", error);
    }
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email to receive reset instructions."
      visualLayout="centered"
      visualImage="/sliderImg/hero_slider1.jpg"
      visualTitle="Account Security"
      visualDescription="Your safety is our priority. Enter your email to start the recovery process and regain access to your premium dry fruit collection."
      visualBadgeIcon={HiQuestionMarkCircle}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          icon={HiEnvelope}
          type="email"
          placeholder="e.g. alex@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <Button
          type="submit"
          textColor="white"
          className="shadow-brand-50/20 mt-2 h-11 w-full rounded-2xl text-sm font-bold shadow-xl"
          disabled={loading}
        >
          {loading ? "Sending..." : "Reset Password"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-brand-600/60 text-sm">
          Suddenly remembered?{" "}
          <NavLink
            to="/auth/login"
            className="text-brand-50 hover:text-brand-500 font-bold underline-offset-4 transition-colors hover:underline"
          >
            Back to sign in
          </NavLink>
        </p>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
