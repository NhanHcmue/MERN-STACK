import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./NavBar";
import { logOut } from "../../redux/reducers/userSlice";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [showMenu, setShowMenu] = useState(false);
  const [showMenuInfo, setShowMenuInfo] = useState(false);
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setShowMenu(false);
    setShowMenuInfo(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedSearch = searchText.trim();
    if (!trimmedSearch) return;
    navigate(`/search?q=${encodeURIComponent(trimmedSearch)}`);
    setSearchText("");
  };

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showMenuInfo && !e.target.closest(".user-menu-container")) {
        setShowMenuInfo(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenuInfo]);

  return (
    <header className="sticky top-0 z-50 py-3 bg-[#d70018] shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white focus:outline-none"
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Toggle menu"
          >
            <i className="bx bx-menu text-3xl"></i>
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center mx-2 lg:mx-0">
            <img
              className="w-16 md:w-20 aspect-auto filter brightness-0 invert"
              src="logo_penguin.png"
              alt="Website Logo"
            />
          </Link>

          {/* Search bar - hidden on mobile */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center flex-1 max-w-xl mx-4"
          >
            <div className="relative w-full">
              <input
                type="text"
                className="w-full h-10 pl-4 pr-10 rounded-l-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-300"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                aria-label="Search products"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-10 w-10 bg-black text-white rounded-r-md hover:bg-gray-800 transition-colors flex items-center justify-center"
                aria-label="Search"
              >
                <i className="bx bx-search-alt-2 text-xl"></i>
              </button>
            </div>
          </form>

          {/* Right side icons */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Cart icon */}
            <Link
              to="/cart"
              className="relative text-white hover:text-gray-200 transition-colors"
              aria-label="Cart"
            >
              <i className="bx bx-cart text-2xl sm:text-3xl"></i>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#df3346] text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.length > 99 ? "99+" : cart.length}
                </span>
              )}
            </Link>

            {/* User section */}
            <div className="user-menu-container">
              {currentUser ? (
                <div className="flex items-center ml-2">
                  <div className="relative">
                    <button
                      onClick={() => setShowMenuInfo(!showMenuInfo)}
                      className="focus:outline-none"
                      aria-label="User menu"
                    >
                      <img
                        className="w-9 h-9 rounded-full object-cover border-2 border-white"
                        src={currentUser.image || "/default-avatar.png"}
                        alt="User avatar"
                        onError={(e) => {
                          e.target.src = "/default-avatar.png";
                        }}
                      />
                    </button>

                    {showMenuInfo && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20">
                        <div className="p-3 border-b">
                          <p className="font-medium truncate">{currentUser.name}</p>
                          <p className="text-xs text-gray-600 truncate">
                            {currentUser.email}
                          </p>
                        </div>
                        <Link
                          to={`/edit-info/${currentUser._id}`}
                          className="block p-3 hover:bg-gray-100 transition-colors"
                        >
                          Chỉnh sửa hồ sơ
                        </Link>
                        <button
                          onClick={() => dispatch(logOut())}
                          className="w-full text-left p-3 border-t hover:bg-gray-100 transition-colors flex items-center"
                        >
                          <i className="bx bx-log-out mr-2"></i>
                          Đăng xuất
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <Link
                  to="/auth/login"
                  className="ml-2 py-2 px-4 bg-[#df3346] text-white rounded-md hover:bg-[#c12a3a] transition-colors whitespace-nowrap text-sm sm:text-base"
                >
                  Đăng nhập
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile search bar - shown only on mobile */}
        <form
          onSubmit={handleSearch}
          className="mt-3 md:hidden flex items-center"
        >
          <div className="relative w-full">
            <input
              type="text"
              className="w-full h-10 pl-4 pr-10 rounded-l-md text-gray-800 focus:outline-none"
              placeholder="Tìm kiếm..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-10 w-10 bg-black text-white rounded-r-md flex items-center justify-center"
            >
              <i className="bx bx-search-alt-2"></i>
            </button>
          </div>
        </form>
      </div>

      {/* Mobile navigation */}
      <NavBar showMenu={showMenu} setShowMenu={setShowMenu} />
    </header>
  );
};

export default Header;