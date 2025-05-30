import axiosClient from "./axiosClient";

const loginAPi = (formData) => {
  return axiosClient.post("/api/auth/login", formData);
};

const registerApi = (formData) => {
  return axiosClient.post("/api/auth/register", formData);
};

const getUserInfo = () => {
  return axiosClient.get("/api/auth");
};

const editUser = (userInfo) => {
  return axiosClient.put("/api/auth", userInfo);
};

const forgotPasswordAPI = (email) => {
  return axiosClient.post("/api/authreal/forgot-password", { email });
};

export { loginAPi, registerApi, getUserInfo, editUser, forgotPasswordAPI };
