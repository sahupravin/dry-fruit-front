import { publicClient, authClient } from "../utils/http";

export const authService = {
  register: (data) => publicClient.post("/register", data),
  login: (data) => publicClient.post("/login", data),
  getProfile: () => authClient.get("/profile"),
  updateProfile: (data) => authClient.post("/update-profile", data),
  forgotPassword: (data) => publicClient.post("/forgot-password", data),
  resetPassword: (data) => publicClient.post("/reset-password", data),
  changePassword: (data) => authClient.post("/change-password", data),
  refreshToken: (data) => publicClient.post("/refresh-token", data),
  verifyToken: (data) => publicClient.post("/verify-token", data),
  logout: () => authClient.post("/logout"),
};

