import { lazy } from "react";
import { Route } from "react-router";

const Login = lazy(() => import("../features/auth/pages/Login"));
const Register = lazy(() => import("../features/auth/pages/Register"));
const ForgotPassword = lazy(
  () => import("../features/auth/pages/ForgotPassword"),
);
const OtpVerification = lazy(
  () => import("../features/auth/pages/OtpVerification"),
);
const ResetPassword = lazy(
  () => import("../features/auth/pages/ResetPassword"),
);

export const AuthRoutes = () => {
  return (
    <>
      {/* <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/verify-otp" element={<OtpVerification />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} /> */}
      {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}
      {/* <Route path="/terms-conditions" element={<TermsAndConditions />} /> */}
    </>
  );
};
