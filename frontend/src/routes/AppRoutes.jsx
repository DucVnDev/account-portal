import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/auth/login";
import Register from "../components/auth/Register";
import MyProfile from "../components/dashboard/MyProfile";
import AdminDashboard from "../components/dashboard/AdminDashboard";
import ProtectedRoute from "../components/layout/ProtectedRoute";

export default function AppRoutes() {
  console.log("AppRoutes loaded");

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/profile"
        element={
            <MyProfile />
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            {console.log("[AppRoutes] Render route: /admin (ADMIN)")}
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}