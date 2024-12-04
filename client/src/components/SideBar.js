import React from "react";
import { Link, NavLink } from "react-router-dom";

const SideBar = ({ showMenu, setShowMenu }) => {
  return (
    <div
      className={`lg:static transition-all px-3 py-6 bg-[#d70018] w-[250px] text-white h-screen fixed top-0 bottom-0 ${
        showMenu ? "left-0" : "left-[-100%]"
      } lg:block z-20`}
    >
      <Link to="/" className="text-[35px] flex items-center logo">
        Quản Lý
      </Link>
      <ul className="mt-6">
        <li onClick={() => setShowMenu(false)} className="mb-3">
          <NavLink
            activeclassname="active"
            to="dashboard"
            className={"text-md bg-[#df3346] flex items-center p-2 rounded-md"}
          >
            <i className="bx bx-tachometer text-2xl mr-4"></i> Quản Lý
          </NavLink>
        </li>
        <li onClick={() => setShowMenu(false)} className="mb-3">
          <NavLink
            activeclassname="active"
            to="products?page=1"
            className={"text-md bg-[#df3346] flex items-center p-2 rounded-md"}
          >
            <i className="bx bx-code-alt text-2xl mr-4"></i> Sản Phẩm
          </NavLink>
        </li>
        <li onClick={() => setShowMenu(false)} className="mb-3">
          <NavLink
            activeclassname="active"
            to="users?page=1"
            className={"text-md bg-[#df3346] flex items-center p-2 rounded-md"}
          >
            <i className="bx bx-user text-2xl mr-4"></i> Người Dùng
          </NavLink>
        </li>
        <li onClick={() => setShowMenu(false)} className="mb-3">
          <NavLink
            activeclassname="active"
            to="oders?page=1"
            className={"text-md bg-[#df3346] flex items-center p-2 rounded-md"}
          >
            <i className="bx bx-barcode text-2xl mr-4"></i> Đơn Hàng
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
