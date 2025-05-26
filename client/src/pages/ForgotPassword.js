// pages/ForgotPassword.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import { forgotPasswordAPI } from "../api/authApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPasswordAPI(email);
      toast.success("Vui lòng kiểm tra email để đặt lại mật khẩu.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Lỗi gửi email.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Khôi phục mật khẩu</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nhập email của bạn"
          required
          className="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Gửi liên kết khôi phục
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
