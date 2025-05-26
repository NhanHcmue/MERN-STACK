import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUser } from "../api/adminApi";
import { editUser } from "../api/authApi";
import { addUser } from "../redux/reducers/userSlice";
import { validateEmail } from "../utils/validateForm";
import zxcvbn from "zxcvbn";

const Info = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [info, setInfo] = useState({
    name: "",
    email: "",
    passwordOld: "",
    password: "",
  });

  const [showPasswordOld, setShowPasswordOld] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getUser(id);
      if (res.data.success) {
        setUser(res.data.user);
      }
    })();
  }, [id]);

  useEffect(() => {
    setInfo({ ...info, name: user?.name, email: user?.email });
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });

    if (name === "password") {
      const result = zxcvbn(value);
      setPasswordStrength(result.score);
    }
  };

  const getPasswordStrengthText = (score) => {
    switch (score) {
      case 0:
        return "Rất yếu";
      case 1:
        return "Yếu";
      case 2:
        return "Trung bình";
      case 3:
        return "Mạnh";
      case 4:
        return "Rất mạnh";
      default:
        return "";
    }
  };

  const getStrengthColor = (score) => {
    switch (score) {
      case 0:
      case 1:
        return "text-red-500";
      case 2:
        return "text-yellow-500";
      case 3:
        return "text-green-500";
      case 4:
        return "text-emerald-600";
      default:
        return "";
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (
      user.name === info.name &&
      user.email === info.email &&
      !info.password.trim() &&
      !info.passwordOld.trim()
    ) {
      return;
    }
    if (!info.name.trim() || !info.email || !validateEmail(info.email)) {
      return toast.error(
        "Không được để trống thông tin và email phải đúng định dạng!"
      );
    }

    if (info.password) {
      if (info.password.length < 8) {
        return toast.error("Mật khẩu phải có ít nhất 8 ký tự!");
      }
      if (!/[A-Z]/.test(info.password)) {
        return toast.error("Mật khẩu phải chứa ít nhất 1 chữ hoa!");
      }
      if (!/[a-z]/.test(info.password)) {
        return toast.error("Mật khẩu phải chứa ít nhất 1 chữ thường!");
      }
      if (!/\d/.test(info.password)) {
        return toast.error("Mật khẩu phải chứa ít nhất 1 số!");
      }
      if (!/[\W_]/.test(info.password)) {
        return toast.error("Mật khẩu phải có ít nhất 1 ký tự đặc biệt!");
      }
      if (/\s/.test(info.password)) {
        return toast.error("Mật khẩu không được chứa khoảng trắng!");
      }
      if (!info.passwordOld) {
        return toast.error("Bạn phải nhập mật khẩu cũ để đổi mật khẩu!");
      }
      if (passwordStrength < 2) {
        return toast.error("Mật khẩu quá yếu. Vui lòng chọn mật khẩu mạnh hơn!");
      }
    }

    setLoading(true);
    try {
      const res = await editUser({ ...info, _id: user._id });
      if (res.data.success) {
        toast.success("Cập nhật thông tin thành công!");
        dispatch(addUser({ ...currentUser, ...info }));
        setUser({ ...user, name: info.name, email: info.email });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Lỗi cập nhật!");
    }
    setLoading(false);
  };

  if (id !== currentUser._id) {
    navigate("/");
    return toast.error("Bạn chỉ được sửa thông tin của bạn!");
  }

  return (
    <div className="mt-10">
      <div className="container bg-white py-6">
        <h3 className="text-center mb-5 font-semibold text-[30px]">
          Chỉnh Sửa Hồ Sơ
        </h3>
        <form
          onSubmit={handleOnSubmit}
          className="w-[700px] mx-auto max-w-full p-4"
        >
          <div className="flex items-center">
            <div className="w-[100px] h-[100px] rounded-full relative overflow-hidden">
              <img src={user?.image} className="w-full h-full object-cover" />
              <i className="bx bx-edit-alt text-[25px] absolute text-blue-500 right-0 bottom-0 cursor-pointer"></i>
            </div>
            <div className="ml-5">
              <p className="text-lg font-semibold">{user?.name}</p>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block mb-3 text-gray-600">
                  Tên khách hàng
                </label>
                <input
                  onChange={handleOnChange}
                  className="border outline-none text-black rounded-md w-full py-2 px-3"
                  value={info?.name}
                  name="name"
                />
              </div>
              <div>
                <label className="block mb-3 text-gray-600">Email</label>
                <input
                  onChange={handleOnChange}
                  className="border outline-none text-black rounded-md w-full py-2 px-3"
                  value={info?.email}
                  name="email"
                />
              </div>
            </div>

            <div className="mb-3 relative">
              <label className="block mb-3 text-gray-600">Mật khẩu cũ</label>
              <input
                onChange={handleOnChange}
                name="passwordOld"
                value={info.passwordOld}
                type={showPasswordOld ? "text" : "password"}
                className="border outline-none text-black rounded-md w-full py-2 px-3 pr-10"
              />
              <span
                onClick={() => setShowPasswordOld(!showPasswordOld)}
                className="absolute right-3 top-[42px] cursor-pointer text-gray-500"
              >
                {showPasswordOld ? "Ẩn" : "Hiện"}
              </span>
            </div>

            <div className="mb-5 relative">
              <label className="block mb-3 text-gray-600">Mật khẩu mới</label>
              <input
                onChange={handleOnChange}
                name="password"
                value={info.password}
                type={showPasswordNew ? "text" : "password"}
                className="border outline-none text-black rounded-md w-full py-2 px-3 pr-10"
              />
              <span
                onClick={() => setShowPasswordNew(!showPasswordNew)}
                className="absolute right-3 top-[42px] cursor-pointer text-gray-500"
              >
                {showPasswordNew ? "Ẩn" : "Hiện"}
              </span>
              {info.password && (
                <p className={`mt-2 text-sm font-medium ${getStrengthColor(passwordStrength)}`}>
                  Độ mạnh mật khẩu: {getPasswordStrengthText(passwordStrength)}
                </p>
              )}
            </div>

            <button
              disabled={loading}
              className="rounded-md bg-black text-white py-2 px-3 w-full"
            >
              {loading ? "Đang cập nhật..." : "Cập nhật thông tin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Info;
