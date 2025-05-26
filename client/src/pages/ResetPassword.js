import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false
  });

  // Kiểm tra mật khẩu đủ mạnh theo yêu cầu
  const checkPasswordStrength = (password) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return strongRegex.test(password);
  };

  // Tính điểm & nhãn cho mật khẩu
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 1) return { label: "Yếu", color: "text-red-500", bg: "bg-red-500", value: 33 };
    if (strength === 2) return { label: "Trung bình", color: "text-yellow-500", bg: "bg-yellow-500", value: 66 };
    if (strength >= 3) return { label: "Mạnh", color: "text-green-500", bg: "bg-green-500", value: 100 };
    return { label: "", color: "", bg: "", value: 0 };
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
    setMessage("");
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      setIsSubmitting(false);
      return;
    }

    if (!checkPasswordStrength(formData.newPassword)) {
      setError("Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/authreal/reset-password", {
        token,
        newPassword: formData.newPassword,
      });

      setMessage(res.data.message || "Đổi mật khẩu thành công!");
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Tạo 1 component nhỏ cho nút ẩn/hiện mật khẩu để tránh lặp code SVG
  const PasswordToggleIcon = ({ visible }) => (
    visible ? (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
      </svg>
    ) : (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    )
  );

  return (
    <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Đặt lại mật khẩu</h2>
        <p className="text-gray-500 mt-2">Nhập mật khẩu mới của bạn</p>
      </div>

      {message && (
        <div className="p-3 mb-6 bg-green-50 text-green-700 rounded-lg border border-green-200">
          {message}
        </div>
      )}

      {error && (
        <div className="p-3 mb-6 bg-red-50 text-red-700 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* New Password Field */}
        <div className="space-y-1">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
            Mật khẩu mới
          </label>
          <div className="relative">
            <input
              id="newPassword"
              name="newPassword"
              type={showPassword.newPassword ? "text" : "password"}
              value={formData.newPassword}
              onChange={handleInputChange}
              className="block w-full px-4 py-2.5 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Nhập mật khẩu mới"
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("newPassword")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              tabIndex={-1}
              aria-label={showPassword.newPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              <PasswordToggleIcon visible={showPassword.newPassword} />
            </button>
          </div>

          {/* Password strength indicator */}
          {formData.newPassword && (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Độ mạnh mật khẩu:</span>
                <span className={`font-medium ${passwordStrength.color}`}>{passwordStrength.label}</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                <div
                  className={`${passwordStrength.bg} h-full rounded-full transition-all duration-300`}
                  style={{ width: `${passwordStrength.value}%` }}
                />
              </div>
              <ul className="mt-2 text-xs text-gray-500 space-y-1">
                <li className={`flex items-center ${formData.newPassword.length >= 8 ? 'text-green-500' : ''}`}>
                  {formData.newPassword.length >= 8 ? '✓' : '•'} Ít nhất 8 ký tự
                </li>
                <li className={`flex items-center ${/[A-Z]/.test(formData.newPassword) ? 'text-green-500' : ''}`}>
                  {/[A-Z]/.test(formData.newPassword) ? '✓' : '•'} Chứa chữ hoa
                </li>
                <li className={`flex items-center ${/\d/.test(formData.newPassword) ? 'text-green-500' : ''}`}>
                  {/\d/.test(formData.newPassword) ? '✓' : '•'} Chứa số
                </li>
                <li className={`flex items-center ${/[^A-Za-z0-9]/.test(formData.newPassword) ? 'text-green-500' : ''}`}>
                  {/[^A-Za-z0-9]/.test(formData.newPassword) ? '✓' : '•'} Chứa ký tự đặc biệt
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-1">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Xác nhận mật khẩu
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword.confirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="block w-full px-4 py-2.5 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Nhập lại mật khẩu"
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirmPassword")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              tabIndex={-1}
              aria-label={showPassword.confirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              <PasswordToggleIcon visible={showPassword.confirmPassword} />
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-lg text-white font-semibold ${
            isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          } transition-colors`}
        >
          {isSubmitting ? "Đang xử lý..." : "Đặt lại mật khẩu"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
