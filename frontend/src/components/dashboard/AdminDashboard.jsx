import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import userService from "../../services/userService";

export default function AdminDashboard() {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [username, setUsername] = useState("User");
  useEffect(() => {
    // Fetch the admin username from the token
    const fetchMe = async () => {
      try {
        const res = await userService.getMe(token);
        const username = res.data.username || "User";
        console.log("[AdminDashboard] Fetched username:", res.data);
        setUsername(username);
      } catch {
        setUsername("User");
      }
    };
    if (token) fetchMe();
  }, [token]);

  useEffect(() => {
    // Fetch all users for the admin dashboard
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await userService.getUsers(token);
        console.log("[AdminDashboard] Fetched users:", res.data);
        setUsers(res.data);
      } catch (err) {
        setError("Failed to fetch users");
      }
      setLoading(false);
    };
    fetchUsers();
  }, [token]);

  // Handle user deletion
  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await userService.deleteUser(userId, token);
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