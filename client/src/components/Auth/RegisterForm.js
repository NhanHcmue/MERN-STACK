import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserInfo, registerApi } from "../../api/authApi";
import setAuthToken from "../../utils/setAuthToken";
import { saveToken } from "../../utils/localStrorage";
import { addUser } from "../../redux/reducers/userSlice";
import Loading from "../Loading/Loading";
import { validateForm } from "../../utils/validateForm";
import Error from "../Error";

const RegisterForm = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    comfirm_password: "",
  });
  const { email, password, name, comfirm_password } = data;
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleOnChangeInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const err = validateForm(data);
    if (err.length > 0) return toast.error(<Error error={err} />);
    if (password !== comfirm_password)
      return toast.error("Mật khẩu ko trùng khớp !");
    setLoading(true);
    try {
      const res = await registerApi(data);
      if (res.data.success) {
        saveToken(res.data.token);
        setAuthToken(res.data.token);
        const users = await getUserInfo();

        if (users.data.success) {
          dispatch(addUser(users.data.user));
        }
        setLoading(false);
        toast.success(res.data.message);
      }
    } catch (e) {
      console.log(e.response);
      setLoading(false);
      toast.error(e.response.data.message);
    }
  };

  return (
    <div className="text-[#333] w-full py-2">
      <h1 className="text-2xl font-semibold my-4">Đăng Kí</h1>
      <form onSubmit={submitForm} className="w-full">
        <div className="w-full">
          <label className="block mb-1" htmlFor="email-input">
            Email
          </label>
          <input
            id="email-input"
            className="w-full p-2 text-black rounded-md outline-none"
            type="text"
            name="email"
            placeholder="Ex: penguin@gmail.com"
            value={email}
            onChange={handleOnChangeInput}
            required
          />
        </div>

        <div className="w-full mt-4">
          <label className="block mb-1" htmlFor="name-input">
            Tên
          </label>
          <input
            id="name-input"
            className="w-full p-2 text-black rounded-md outline-none"
            type="text"
            name="name"
            placeholder="Ex: penguin"
            value={name}
            onChange={handleOnChangeInput}
            required
          />
        </div>

        <div className="w-full mt-4">
          <label className="block mb-1" htmlFor="password-input">
            Mật Khẩu
          </label>
          <input
            id="password-input"
            className="w-full p-2 text-black rounded-md outline-none"
            type="password"
            name="password"
            placeholder="Ex: 123456A"
            value={password}
            onChange={handleOnChangeInput}
            required
          />
        </div>

        <div className="w-full mt-4">
          <label className="block mb-1" htmlFor="comfirm-password-input">
            Xác nhận mật khẩu
          </label>
          <input
            id="comfirm-password-input"
            className="w-full p-2 text-black rounded-md outline-none"
            type="password"
            name="comfirm_password"
            placeholder="Ex: 123456A"
            value={comfirm_password}
            onChange={handleOnChangeInput}
            required
          />
        </div>

        <div>
          <button className="mt-8 w-full bg-black p-2 rounded-md text-white">
            Đăng Kí
          </button>
        </div>
      </form>

      <p className="w-full text-center mt-3">
        Bạn đã có tài khoản{" "}
        <Link className="text-blue-400" to="/auth/login">
          Đăng Nhập
        </Link>
      </p>

      {loading && <Loading />}
    </div>
  );
};

export default RegisterForm;
