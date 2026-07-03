import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../../../componenets/common/Button";
import AuthLayout from "./AuthLayout";

const OtpInput = ({ value, onChange }) => {
  return (
    <div className="grid grid-cols-6 gap-2">
      {Array.from({ length: 6 }).map((_, idx) => (
        <input
          key={idx}
          inputMode="numeric"
          maxLength={1}
          className="border-brand-100 focus:border-brand-50 rounded-xl border py-3 text-center text-lg outline-none"
          value={value[idx] || ""}
          onChange={(e) => {
            const next = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
            const arr = value.split("");
            arr[idx] = next;
            onChange(arr.join(""));
          }}
        />
      ))}
    </div>
  );
};

const OtpVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: verify OTP
    setTimeout(() => {
      setLoading(false);
      navigate("/auth/reset-password");
    }, 600);
  };

  return (
    <AuthLayout
      title="Verify OTP"
      subtitle="Enter the 6-digit code we sent to your email."
    >
      <form onSubmit={handleVerify} className="space-y-6">
        <OtpInput value={otp} onChange={setOtp} />
        <Button
          type="submit"
          textColor="white"
          borderColor="primary"
          className="w-full rounded-full"
          disabled={loading || otp.length !== 6}
        >
          {loading ? "Verifying..." : "Verify"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default OtpVerification;
