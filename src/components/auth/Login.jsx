import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await authService.login(username, password);
    if (token) {
      login(token);
      navigate("/profile");
    } else {
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