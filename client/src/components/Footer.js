import React from "react";

const contact = [
  {
    icon: "bx bx-location-plus",
    name: "Địa chỉ: ",
    content: "280 An Dương Vương, Phường 4, Quận 5, TP.HCM",
  },
  {
    icon: "bx bxs-phone",
    name: "Số điện thoại: ",
    content: "0834454093",
  },
  {
    icon: "bx bx-envelope",
    name: "Email: ",
    content: "penguin@gmail.com",
  },
];

const Footer = () => {
  return (
    <div className="py-10 mt-10 bg-[#200F11] text-black">
      <div className="container flex items-center pb-6 md:flex-row flex-col">
        <div className="md:w-[30%] w-full">
          <div className="mb-6">
          <img
            className="w-[100px] aspect-auto filter brightness-0 invert"
            src="logo_penguin.png"
            alt="logo"
          />

          </div>
          {contact.map((p) => (
            <p
              key={p.name}
              className="mb-6 font-semibold text-white flex items-center"
            >
              <div className="w-[60px] h-[60px] rounded-full bg-black flex items-center justify-center text-[30px]">
                <i className={p.icon} />
              </div>
              <p className="ml-3 flex-1">{p.content}</p>
            </p>
          ))}
        </div>
        <div className="md:ml-10 flex-1 grid text-white md:grid-cols-4 grid-cols-1 text-left mt-10 md:mt-0 w-full">
          <div className="w-full mb-6 md:mb-0">
            <h1 className="uppercase font-semibold mb-6">Giải pháp</h1>
            <p className="mb-4 hover:text-black cursor-pointer">Tiếp thị</p>
            <p className="mb-4 hover:text-black cursor-pointer">Phân tích</p>
            <p className="mb-4 hover:text-black cursor-pointer">Thương mại</p>
            <p className="mb-4 hover:text-black cursor-pointer">Thông tin chi tiết</p>
          </div>
          <div className="w-full mb-6 md:mb-0">
            <h1 className="uppercase font-semibold mb-6">Hỗ trợ</h1>
            <p className="mb-4 hover:text-black cursor-pointer">Giá cả</p>
            <p className="mb-4 hover:text-black cursor-pointer">Tài liệu</p>
            <p className="mb-4 hover:text-black cursor-pointer">Hướng dẫn</p>
            <p className="mb-4 hover:text-black cursor-pointer">Trạng thái API</p>
          </div>
          <div className="w-full mb-6 md:mb-0">
            <h1 className="uppercase font-semibold mb-6">Công ty</h1>
            <p className="mb-4 hover:text-black cursor-pointer">Giới thiệu</p>
            <p className="mb-4 hover:text-black cursor-pointer">Blog</p>
            <p className="mb-4 hover:text-black cursor-pointer">Việc làm</p>
            <p className="mb-4 hover:text-black cursor-pointer">Truyền thông</p>
          </div>
          <div className="w-full mb-6 md:mb-0">
            <h1 className="uppercase font-semibold mb-6">Pháp lý</h1>
            <p className="mb-4 hover:text-black cursor-pointer">Khiếu nại</p>
            <p className="mb-4 hover:text-black cursor-pointer">Bảo mật</p>
            <p className="mb-4 hover:text-black cursor-pointer">Điều khoản</p>
            <p className="mb-4 hover:text-black cursor-pointer">Đối tác</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
