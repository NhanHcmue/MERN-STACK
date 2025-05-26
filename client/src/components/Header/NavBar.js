import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const NavBar = ({ showMenu, setShowMenu }) => {
  const { currentUser } = useSelector((state) => state.user);

  const handleNavClick = () => {
    if (window.innerWidth < 1024) {
      setShowMenu(false);
    }
  };

  return (
    <>
      {/* Overlay - chỉ hiện khi menu mở trên mobile */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowMenu(false)}
        />
      )}

      {/* Menu chính */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[#111827] z-50
          transform transition-transform duration-300 ease-in-out
          shadow-xl lg:shadow-none
          ${showMenu ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0 lg:w-auto lg:h-auto lg:bg-transparent lg:flex lg:justify-center`}
      >
        <div className="h-full flex flex-col p-4 lg:p-0 lg:flex-row lg:items-center">
          {/* Header menu mobile */}
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h3 className="text-white text-xl font-bold">Menu</h3>
            <button
              onClick={() => setShowMenu(false)}
              className="text-white text-2xl hover:text-red-400"
              aria-label="Close menu"
            >
              <i className="bx bx-x"></i>
            </button>
          </div>

          {/* Các mục menu */}
          <nav className="flex-1 lg:flex lg:items-center lg:space-x-6">
            <NavItem to="/" onClick={handleNavClick}>
              Trang chủ
            </NavItem>
            
            <NavItem to="/product?page=1" onClick={handleNavClick}>
              Sản phẩm
            </NavItem>
            
            {currentUser && (
              <NavItem to="/order?page=1" onClick={handleNavClick}>
                Đơn hàng
              </NavItem>
            )}
            
            {currentUser?.roleId === "admin" && (
              <NavItem to="/admin" onClick={handleNavClick}>
                <span className="flex items-center gap-1">
                  Quản trị <i className="bx bx-shield-alt text-yellow-400"></i>
                </span>
              </NavItem>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

const NavItem = ({ to, children, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `block px-4 py-3 rounded-lg mb-2 lg:mb-0
        transition-colors duration-200
        ${
          isActive
            ? 'bg-[#df3346] text-white font-medium'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }
        lg:inline-block lg:py-2 lg:px-3
        lg:hover:bg-opacity-20 lg:hover:bg-[#df3346]`
      }
    >
      {children}
    </NavLink>
  );
};

export default NavBar;