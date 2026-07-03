import { useState } from "react";
import { useNavigate } from "react-router";
import { HiLockClosed } from "react-icons/hi2";
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

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || password !== confirm) return;
    setLoading(true);
    // TODO: integrate API
    setTimeout(() => {
      setLoading(false);
      navigate("/auth/login");
    }, 600);
  };

  return (
    <AuthLayout
      title="Reset password"
      subtitle="Set a new password for your account."
    >
      <form onSubmit={handleSubmit}>
        <Input
          icon={HiLockClosed}
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
        <Input
          icon={HiLockClosed}
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoComplete="new-password"
        />
        <Button
          type="submit"
          textColor="white"
          borderColor="primary"
          className="mt-2 w-full rounded-full"
          disabled={loading || !password || password !== confirm}
        >
          {loading ? "Saving..." : "Save password"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
