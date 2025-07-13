import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function UserDashboard() {
  const { token } = useContext(AuthContext);

  // For demo: decode token payload (replace by jwt-decode in real app)
  let username = "User";
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    username = payload.username || username;
  } catch {}

  return (
    <div className="container">
      <div className="alert alert-info mt-4">
        <h2>Welcome, {username}!</h2>
        <p>This is your user dashboard.</p>
      </div>
    </div>
  );
}