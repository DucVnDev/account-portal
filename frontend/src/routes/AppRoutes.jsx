import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../../../src/components/auth/login";
import Register from "../components/auth/register";
import UserDashboard from "../../../src/components/dashboard/UserDashboard";
import AdminDashboard from "../../../src/components/dashboard/AdminDashboard";
import ProtectedRoute from "../../../src/components/layout/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute role="USER">
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}