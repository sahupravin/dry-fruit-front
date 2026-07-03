import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { HiEnvelope, HiLockClosed, HiUser } from "react-icons/hi2";
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

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: integrate API & OTP redirect
    setTimeout(() => {
      setLoading(false);
      navigate("/auth/verify-otp");
    }, 600);
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Join us for the finest dry fruits."
    >
      <form onSubmit={handleSubmit}>
        <Input
          icon={HiUser}
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
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
          autoComplete="new-password"
        />

        <Button
          type="submit"
          textColor="white"
          borderColor="primary"
          className="mt-2 w-full rounded-full"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create account"}
        </Button>
      </form>
      <div className="text-brand-600 mt-6 text-center text-sm">
        Already have an account?{" "}
        <NavLink to="/auth/login" className="text-brand-50 hover:underline">
          Sign in
        </NavLink>
      </div>
    </AuthLayout>
  );
};

export default Register;
