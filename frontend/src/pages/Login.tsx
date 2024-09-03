import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  RootState,
  AppDispatch,
  useAppDispatch,
  useAppSelector,
} from "../store";
import { loginUser } from "../store/authSlice";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const dispatch: AppDispatch = useAppDispatch();

  const { status, loginError: error } = useAppSelector(
    (state: RootState) => state.auth
  );

  const handleLogin = (evt: React.FormEvent) => {
    evt.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };

  const handleSignupRedirect = () => {
    navigate("/signup"); // Redirect to the signup page
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {status === "failed" && error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Don't have an account?</p>
          <button
            onClick={handleSignupRedirect}
            className="mt-2 text-blue-500 hover:text-blue-700"
          >
            Sign up here
          </button>
        </div>
      </div>
    </div>
  );
}

{
}
