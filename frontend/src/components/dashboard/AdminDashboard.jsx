import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function AdminDashboard() {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [username, setUsername] = useState("User");
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        username = res.data.username || "User";
        // Log
        console.log("[AdminDashboard] Fetched username:", res.data);
        setUsername(username);
      } catch {
        setUsername("User");
      }
    };
    if (token) fetchMe();
  }, [token]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get("http://localhost:8080/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Log
        console.log("[AdminDashboard] Fetched users:", res.data);
        setUsers(res.data);
      } catch (err) {
        setError("Failed to fetch users");
      }
      setLoading(false);
    };
    fetchUsers();
  }, [token]);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter(u => u.id !== userId));
    } catch {
      alert("Failed to delete user");
    }
  };

  return (
    <div className="container">
      <div className="alert alert-warning mt-4">
        <h2>Welcome, {username}!</h2>
        <p>This is the admin dashboard.</p>
      </div>
      <div className="card mt-4">
        <div className="card-body">
          <h4>User List</h4>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.roles[0]}</td>
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}