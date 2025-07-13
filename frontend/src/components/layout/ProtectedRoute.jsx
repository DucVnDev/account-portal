import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
// Optionally, you can use jwt-decode for real projects
// import jwt_decode from "jwt-decode";

export default function ProtectedRoute({ children, role }) {
  const { token } = useContext(AuthContext);

  // Dummy role check for demo, in real app decode JWT
  if (!token) return <Navigate to="/login" />;
  if (role) {
    try {
      // const payload = jwt_decode(token);
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.role !== role) return <Navigate to="/login" />;
    } catch {
      return <Navigate to="/login" />;
    }
  }
  return children;
}