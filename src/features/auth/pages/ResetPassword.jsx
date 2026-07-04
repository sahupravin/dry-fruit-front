import { useState } from "react";
import { useNavigate } from "react-router";
import { HiLockClosed, HiEye, HiEyeSlash } from "react-icons/hi2";
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

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || password !== confirm) return;
    setLoading(true);
    try {
      // In a real app, you'd also need the reset token from the URL
      await authService.resetPassword({ password });
      setLoading(false);
      navigate("/auth/login");
    } catch (error) {
      setLoading(false);
      console.error("Reset password failed:", error);
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Set a new secure password for your account."
      visualLayout="centered"
      visualImage="/sliderImg/hero_slider2.jpg"
      visualTitle="Secure Your Account"
      visualDescription="Your security is our priority. Choose a strong password to keep your account and preferences safe while you enjoy our premium selection."
    >
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          label="New Password"
          icon={HiLockClosed}
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
        <Input
          label="Confirm Password"
          icon={HiLockClosed}
          type="password"
          placeholder="Confirm your new password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoComplete="new-password"
        />
        
        <Button
          type="submit"
          textColor="white"
          className="h-11 w-full rounded-2xl text-sm font-bold shadow-brand-50/20 shadow-xl mt-4"
          disabled={loading || !password || password !== confirm}
        >
          {loading ? "Saving..." : "Save Password"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
