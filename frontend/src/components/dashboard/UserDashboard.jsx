import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function UserDashboard() {
  const { token } = useContext(AuthContext);

  let username = "User";
  try {
    const payload = jwtDecode(token);
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