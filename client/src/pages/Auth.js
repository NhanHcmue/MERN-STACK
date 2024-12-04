import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";
import { useSelector } from "react-redux";
import { useSearchParams } from "../hooks/useSearchParams";

const Auth = () => {
  const { currentUser } = useSelector((state) => state.user);

  const searchParams = useSearchParams();

  if (currentUser) {
    return <Navigate to={searchParams.get("redirect") || "/"} />;
  }

  return (
    <div className="flex items-center h-screen container">
      <div className="h-[550px] flex justify-between w-full rounded-lg overflow-hidden">
        <div className="flex-1  hidden md:block relative">
          <img
            src="/aunt.jpg"
            className="w-full h-full object-cover"
          />

          <div className="absolute top-[80%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-md overflow-hidden">
            <Link
              className="text-center text-lg font-semibold text-black bg-[#abe7d1] py-2 px-3 block"
              to="/"
            >
              Trở về trang chủ
            </Link>
          </div>
        </div>
        <div className="flex-1 bg-[#8cd9b2] p-6 flex items-center">
          <Routes>
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Auth;
