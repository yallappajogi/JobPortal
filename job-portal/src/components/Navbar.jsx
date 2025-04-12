import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Only parse if user data exists
      }
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      localStorage.removeItem("user"); // Clear corrupted data
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/"; // Redirect to home page
  };

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: "/", title: "Start a Search" },
    { path: "/my-job", title: "My Jobs" },
    { path: "/post-job", title: "Post a Job" },
  ];

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-6">
        <Link to="/" className="flex items-center gap-1 text-2xl text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="30"
            viewBox="0 0 29 30"
            fill="none"
          >
            <circle
              cx="12.0143"
              cy="12.5143"
              r="12.0143"
              fill="#3575E2"
              fillOpacity="0.4"
            />
            <circle cx="16.9857" cy="17.4857" r="12.0143" fill="#3575E2" />
          </svg>
          <span>JoBoard</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-primary">
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive ? "text-blue font-bold" : ""
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Authentication Buttons or Profile Icon */}
        <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
          {user ? (
            <>
              <span>Hello, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-blue text-white px-3 py-1 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="py-2 px-5 border rounded bg-blue text-white"
              >
                Login
              </Link>
              <Link
                to="/Register"
                className="py-2 px-5 border rounded bg-blue text-white"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden block">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-primary" />
            ) : (
              <FaBarsStaggered className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col bg-white p-4 rounded-lg shadow-lg">
          <ul className="flex flex-col gap-4">
            {navItems.map(({ path, title }) => (
              <li key={path} className="text-base text-primary">
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive ? "text-blue font-bold" : ""
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex gap-4 mt-4">
            {user ? (
              <>
                <span>Hello, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="py-2 px-5 border rounded w-full text-center bg-red-500 text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="py-2 px-5 border rounded w-full text-center"
                >
                  Login
                </Link>
                <Link
                  to="/Register"
                  className="py-2 px-5 border rounded bg-blue text-white w-full text-center"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
