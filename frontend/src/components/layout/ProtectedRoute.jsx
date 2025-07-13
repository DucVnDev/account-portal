import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


export default function ProtectedRoute({ children, role }) {
  const { token } = useContext(AuthContext);

  if (!token) return <Navigate to="/login" />;
  if (role) {
    try {
      const payload = jwtDecode(token);
      if ((payload.sub).toUpperCase() !== role) return <Navigate to="/login" />;
    } catch {
      return <Navigate to="/login" />;
    }
  }
  return children;
}