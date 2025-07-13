import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

export default function MyProfile() {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ username: "", email: "" });
  const [updateMsg, setUpdateMsg] = useState("");

  useEffect(() => {
    const fetchMe = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get("http://localhost:8080/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setForm({ username: res.data.username, email: res.data.email });
      } catch {
        setError("Failed to fetch user info");
      }
      setLoading(false);
    };
    if (token) fetchMe();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateMsg("");
    try {
      const res = await axios.put(
        "http://localhost:8080/api/users/me",
        { username: form.username, email: form.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data);
      setEditMode(false);
      setUpdateMsg("Update successful!");
      setTimeout(() => setUpdateMsg("") , 5000);
    } catch {
      setUpdateMsg("Update failed!");
      setTimeout(() => setUpdateMsg("") , 5000);
    }
  };

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (error) return <div className="container mt-4 alert alert-danger">{error}</div>;

  return (
    <div className="container">
      <div className="alert alert-info mt-4">
        <h2>My Profile</h2>
        <p>This is your user dashboard.</p>
      </div>
      <div className="card mt-4" style={{ maxWidth: 500, margin: "0 auto" }}>
        <div className="card-body">
          {!editMode ? (
            <>
              <table className="table">
                <tbody>
                  <tr><th>ID</th><td>{user.id}</td></tr>
                  <tr><th>Username</th><td>{user.username}</td></tr>
                  <tr><th>Email</th><td>{user.email}</td></tr>
                  <tr><th>Role</th><td>{user.roles ? user.roles.join(", ") : ""}</td></tr>
                </tbody>
              </table>
              <button className="btn btn-primary" onClick={() => setEditMode(true)}>Update Info</button>
              {updateMsg && <div className="alert alert-info mt-2">{updateMsg}</div>}
            </>
          ) : (
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  className="form-control"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className="btn btn-success me-2" type="submit">Save</button>
              <button className="btn btn-secondary" type="button" onClick={() => setEditMode(false)}>Cancel</button>
              {updateMsg && <div className="alert alert-info mt-2">{updateMsg}</div>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}