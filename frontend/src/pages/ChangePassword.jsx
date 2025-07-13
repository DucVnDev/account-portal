import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [form, setForm] = useState({ oldPwd: "", newPwd: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return null;

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (form.oldPwd !== user.password) {
      setMsg("Mật khẩu cũ không đúng!");
      return;
    }
    user.password = form.newPwd;
    localStorage.setItem("user", JSON.stringify(user));
    setMsg("Đổi mật khẩu thành công!");
    setTimeout(() => navigate("/profile"), 1000);
  };

  return (
    <div>
      <h2>Đổi mật khẩu</h2>
      <form onSubmit={onSubmit}>
        <input
          name="oldPwd"
          type="password"
          placeholder="Mật khẩu cũ"
          onChange={onChange}
        />
        <input
          name="newPwd"
          type="password"
          placeholder="Mật khẩu mới"
          onChange={onChange}
        />
        <button type="submit">Đổi mật khẩu</button>
        {msg && <p>{msg}</p>}
      </form>
    </div>
  );
};

export default ChangePassword;