import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div>
      <h2>Trang cá nhân</h2>
      <p>Tên: {user.name}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <button onClick={() => navigate("/change-password")}>
        Đổi mật khẩu
      </button>
      <button
        onClick={() => {
          localStorage.removeItem("user");
          navigate("/login");
        }}
      >
        Đăng xuất
      </button>
    </div>
  );
};

export default Profile;