import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const VerifyPage = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {
    console.log("Verify token:", token);
    if (!token) {
        setResult("Token không hợp lệ");
        setLoading(false);
        return;
    }

    const verify = async () => {
        try {
        const res = await axios.get(`http://localhost:5000/api/authreal/verify/${token}`);
        setResult(res.data.message || res.data);
        toast.success(res.data.message || res.data);
        } catch (err) {
        const errorMsg = err.response?.data?.message || err.response?.data || "Lỗi xác minh";
        setResult(errorMsg);
        toast.error(errorMsg);
        } finally {
        setLoading(false);
        }
    };
    verify();
    }, [token]);


  return (
    <div className="w-full h-screen flex justify-center items-center">
      {loading ? (
        <p>Đang xác minh tài khoản...</p>
      ) : (
        <div className="text-center">
          <h1 className="text-xl font-semibold mb-4">{result}</h1>
          <p>
            <a href="/auth/login" className="text-blue-500 underline">
              Đăng nhập
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default VerifyPage;
