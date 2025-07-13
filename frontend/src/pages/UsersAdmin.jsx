import React from "react";
import { users } from "../dummyData";

const UsersAdmin = () => (
  <div>
    <h2>Quản trị Users (Admin)</h2>
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td>{u.username}</td>
            <td>{u.email}</td>
            <td>{u.role}</td>
            <td>{u.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default UsersAdmin;