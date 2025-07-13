import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";


export default function ProtectedRoute({ children, role }) {
  const { token } = useContext(AuthContext);

  if (!token) return <Navigate to="/login" />;
  if (role) {
    try {
      const payload = jwt_decode(token);
      if (payload.role !== role) return <Navigate to="/login" />;
    } catch {
      return <Navigate to="/login" />;
    }
  }
  return children;
}