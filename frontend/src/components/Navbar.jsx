import React, { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } =
    useContext(ShopContext);
  const location = useLocation();

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="flex items-center justify-between py-1 font-medium">
      <Link to="/">
        <img src={assets.logo} className="w-56" alt="Logo" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {["/", "/collection", "/about", "/contact"].map((path, index) => (
          <NavLink key={index} to={path} className="flex flex-col items-center gap-1">
            <p>{path.replace("/", "").toUpperCase() || "HOME"}</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        ))}
      </ul>

      <div className="flex items-center gap-6">
        {location.pathname === "/collection" && (
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt="Search"
          />
        )}

        {/* Desktop View - Profile & Logout */}
        <div className="hidden sm:block">
          {token ? (
            <div className="group relative">
              <img className="w-5 cursor-pointer" src={assets.profile_icon} alt="Profile" />
              <div className="group-hover:block hidden absolute right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                  <p className="cursor-pointer hover:text-black" onClick={() => navigate("/orders")}>
                    Orders
                  </p>
                  <p className="cursor-pointer hover:text-black" onClick={logout}>
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="text-gray-600 bg-blue-100 px-3 py-1 rounded text-sm"
            >
              Login
            </button>
          )}
        </div>

        {/* Responsive View - Direct Login/Logout */}
        <div className="sm:hidden">
          {token ? (
            <button
              onClick={logout}
              className="text-gray-600 bg-blue-100 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="text-gray-600 bg-blue-100 px-3 py-1 rounded text-sm"
            >
              Login
            </button>
          )}
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-green-900 text-green-200 aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>

      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="Back" />
            <p>Back</p>
          </div>
          {["/", "/collection", "/about", "/contact", "/orders"].map((path, index) => (
            <NavLink key={index} onClick={() => setVisible(false)} to={path} className="py-2 pl-6 border">
              {path.replace("/", "").toUpperCase() || "HOME"}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
