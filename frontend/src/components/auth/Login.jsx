import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("[Login] Submitting login for:", username);

    // Call the authService to perform login
    const token = await authService.login(username, password);
    
    if (token) {
      console.log("[Login] Login successful, received token:", token);
      login(token);
      let role = "USER";
      try {
        const payload = jwtDecode(token);        if (role === "ADMIN") {
          console.log("[Login] Navigating to /admin");
          setTimeout(() => navigate("/admin"), 0);
        }
        role = (payload.sub || "user").toUpperCase();;
        console.log("[Login] Decoded sub (role):", role);
      } catch {
        console.log("[Login] Failed to decode token, defaulting to user");
      }
      if (role === "ADMIN") {
        console.log("[Login] Navigating to /admin");
        navigate("/admin");
      } else {
        console.log("[Login] Navigating to /user");
        navigate("/profile");
      }
    } else {
      console.log("[Login] Login failed for:", username);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <div className="card p-4" style={{ maxWidth: 400, width: "100%" }}>
        <h3 className="mb-3 text-center">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input value={username} className="form-control" onChange={e => setUsername(e.target.value)} placeholder="Username" required />
          </div>
          <div className="mb-3">
            <input type="password" value={password} className="form-control" onChange={e => setPassword(e.target.value)} placeholder="Password" required />
          </div>
          {error && <div className="alert alert-danger py-1">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}