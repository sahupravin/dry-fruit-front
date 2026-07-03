import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { HiEnvelope, HiLockClosed } from "react-icons/hi2";
import Button from "../../../componenets/common/Button";
import AuthLayout from "./AuthLayout";

function Input({
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
  autoComplete,
}) {
  return (
    <div className="mb-4">
      <div className="border-brand-100 focus-within:border-brand-50 flex items-center gap-2 rounded-full border bg-white px-4 py-3 shadow-sm">
        {Icon && <Icon className="text-brand-600 h-5 w-5" />}
        <input
          type={type}
          className="placeholder:text-brand-600/60 w-full bg-transparent text-sm outline-none"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
        />
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
    // TODO: integrate API
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 600);
  };

  return (
    <AuthLayout title="Sign in" subtitle="Welcome back!">
      <form onSubmit={handleSubmit} className="space-y-1">
        <Input
          icon={HiEnvelope}
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <Input
          icon={HiLockClosed}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <div className="flex items-center justify-between py-2">
          <NavLink
            to="/auth/forgot-password"
            className="text-brand-600 hover:text-brand-50 text-sm transition-colors"
          >
            Forgot password?
          </NavLink>
        </div>
        <Button
          type="submit"
          textColor="white"
          borderColor="primary"
          className="w-full rounded-full"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      <div className="text-brand-600 mt-6 text-center text-sm">
        New here?{" "}
        <NavLink to="/auth/register" className="text-brand-50 hover:underline">
          Create an account
        </NavLink>
      </div>
    </AuthLayout>
  );
};

export default Login;
