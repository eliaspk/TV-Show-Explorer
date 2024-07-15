import React from "react";
import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import { useAuth } from "../hooks/useAuth";

const NavBar: React.FC = () => {
  const { user } = useAuth();

  return (
    <nav className="text-white py-1">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          TV Explorer
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-200 transition duration-300">
            Home
          </Link>
          {user?.id ? (
            <UserAvatar />
          ) : (
            <>
              <Link
                to="/favorites"
                className="hover:text-blue-200 transition duration-300"
              >
                Favorites
              </Link>
              <Link
                to="/login"
                className="hover:text-blue-200 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="hover:text-blue-200 transition duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
