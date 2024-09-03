import React from "react";
import { RootState, useAppDispatch, useAppSelector } from "../store";
import { logout } from "../store/authSlice";

const Header: React.FC = () => {
  const { isLoggedIn, user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">Fullstack test</div>
        <div className="flex items-center space-x-4">
          {isLoggedIn && user?.email && (
            <>
              <div className="text-sm">Welcome {user?.email}</div>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
