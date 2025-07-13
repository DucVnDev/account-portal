import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../dummyData";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (users.find((u) => u.username === form.username)) {
      setError("Tài khoản đã tồn tại!");
      return;
    }
    // Dummy: không thực sự thêm vào users
    localStorage.setItem(
      "user",
      JSON.stringify({ ...form, id: Date.now(), role: "user" })
    );
    navigate("/profile");
  };

  return (
    <div>
      <h2>Đăng ký</h2>
      <form onSubmit={onSubmit}>
        <input name="username" placeholder="Username" onChange={onChange} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={onChange}
        />
        <input name="email" placeholder="Email" onChange={onChange} />
        <input name="name" placeholder="Tên" onChange={onChange} />
        <button type="submit">Đăng ký</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Register;