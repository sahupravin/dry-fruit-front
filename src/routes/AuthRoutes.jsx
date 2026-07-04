import { lazy } from "react";
import { Route } from "react-router";

const Login = lazy(() => import("../features/auth/pages/Login"));
const Register = lazy(() => import("../features/auth/pages/Register"));
const ForgotPassword = lazy(
  () => import("../features/auth/pages/ForgotPassword"),
);
const ResetPassword = lazy(
  () => import("../features/auth/pages/ResetPassword"),
);
const Profile = lazy(() => import("../features/auth/pages/profile/Profile"));

export const AuthRoutes = () => {
  return (
    <>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      <Route path="/auth/profile" element={<Profile />} />
    </>
  );
};
