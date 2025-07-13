import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function AdminDashboard() {
  const { token } = useContext(AuthContext);

  let username = "Admin";
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    username = payload.username || username;
  } catch {}

  return (
    <div className="container">
      <div className="alert alert-warning mt-4">
        <h2>Welcome Admin, {username}!</h2>
        <p>This is the admin dashboard.</p>
      </div>
    </div>
  );
}