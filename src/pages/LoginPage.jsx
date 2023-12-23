import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(import.meta.env.VITE_TOKEN)) {
      navigate("/");
    }
  }, []);

  const handleValidation = () => {
    if (username.length < 3) {
      toast.error("Username should be greater than 3 characters.");
      return false;
    } else if (password.length < 6) {
      toast.error("Password should be equal or greater than 8 characters.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const res = await axios.post(
        "/auth/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      // console.log(res);

      if (res.data.status === false) {
        toast.error(res.data.msg);
      }
      if (res.data.status === true) {
        // set user info to local storage

        localStorage.setItem(
          import.meta.env.VITE_TOKEN,
          JSON.stringify({ ...res.data.userWithoutPassword })
        );
        // console.log(res.data);
        toast.success("User Login successfully.");

        navigate("/");
      }
    } else {
      toast.error("Some fields are not in required.");
    }
  };

  return (
    <div className="w-full bg-gray-100">
      <div className="max-w-7xl mx-auto h-screen  flex items-center justify-center">
        <div className="shadow-lg bg-slate-100 w-[350px] min-w-[300px] font-mono rounded-lg px-6 py-10">
          <h1 className="text-2xl font-semibold text-center">Login</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              placeholder="username"
              className="w-full p-2 outline-none shadow-md rounded-lg focus-within:shadow-lg"
            />
            <label>Password:</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
              className="w-full p-2 outline-none shadow-md rounded-lg focus-within:shadow-lg"
            />
            <button
              type="submit"
              className="py-2 mt-5 bg-green-400 rounded-lg shadow-md text-white font-semibold hover:bg-green-500"
            >
              LOGIN
            </button>
          </form>
          <p className="mt-5  text-center">
            Don't have a account?{" "}
            <Link
              to={`/register`}
              className="text-blue-500 hover:text-blue-400 cursor-pointer"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
