import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserInfo, loginAPi } from "../../api/authApi";
import setAuthToken from "../../utils/setAuthToken";
import { saveToken } from "../../utils/localStrorage";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/reducers/userSlice";
import Loading from "../Loading/Loading";
import { validateEmail } from "../../utils/validateForm";

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    if (!validateEmail(data.email)) {
      toast.error("Email không hợp lệ.");
      return false;
    }

    if (data.password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự.");
      return false;
    }

    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await loginAPi(data);
      if (res.data.success) {
        const token = res.data.token;

        if (data.remember) {
          saveToken(token);
        }

        setAuthToken(token);

        const users = await getUserInfo();
        if (users.data.success) {
          const user = users.data.user;

          if (!user.isVerified) {
            setLoading(false);
            toast.error("Tài khoản chưa được xác minh. Vui lòng kiểm tra email để kích hoạt.");
            return;
          }

          dispatch(addUser(user));
          toast.success(res.data.message);
        }

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Đăng nhập thất bại.");
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Đăng Nhập</h1>

      <form onSubmit={submitForm} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={data.email}
            onChange={handleOnChange}
            className="w-full px-4 py-2 text-base border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Nhập địa chỉ email"
            required
          />
        </div>

        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Mật khẩu
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={data.password}
              onChange={handleOnChange}
              className="w-full px-4 py-2 text-black text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
              placeholder="Nhập mật khẩu"
              required
              minLength="6"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              name="remember"
              checked={data.remember}
              onChange={handleOnChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
              Ghi nhớ đăng nhập
            </label>
          </div>

          <Link to="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
            Quên mật khẩu?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>

      <div className="mt-4 text-center text-sm text-gray-600">
        Chưa có tài khoản?{" "}
        <Link to="/auth/register" className="text-blue-600 hover:text-blue-500 font-medium">
          Đăng ký ngay
        </Link>
      </div>

      {loading && <Loading />}
    </div>
  );
};

export default LoginForm;