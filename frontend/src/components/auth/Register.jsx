import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // reset error khi nhập lại
  };

  const passwordMismatch = form.password && form.confirmPassword && form.password !== form.confirmPassword;

  const [success, setSuccess] = useState("");

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const result = await authService.register(form.username, form.email, form.password);
    if (result === true) {
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } else if (typeof result === "string") {
      setError(result);
    } else {
      setError("Registration failed. Username or email may be taken.");
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <div className="card p-4" style={{ maxWidth: 400, width: "100%" }}>
        <h3 className="mb-3 text-center">Register</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input name="username" className="form-control" placeholder="Username" value={form.username} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input name="email" type="email" className="form-control" placeholder="Email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input name="password" type="password" className="form-control" placeholder="Password" value={form.password} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input name="confirmPassword" type="password" className="form-control" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />
          </div>
          {passwordMismatch && <div className="alert alert-danger py-1">Passwords do not match.</div>}
          {error && <div className="alert alert-danger py-1">{error}</div>}
          {success && <div className="alert alert-success py-1">{success}</div>}
          <button type="submit" className="btn btn-success w-100" disabled={!!success || passwordMismatch}>Register</button>
        </form>
      </div>
    </div>
  );
}