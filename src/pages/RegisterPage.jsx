import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiFillPicture } from "react-icons/ai";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState();
  const [phone, setPhone] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [desc, setDesc] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(import.meta.env.VITE_TOKEN)) {
      navigate("/");
    }
  }, []);

  // console.log(file);

  const handleValidation = () => {
    if (username.length === 0 || password.length === 0) {
      toast.error("Please fill all fields");
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters.");
      return false;
    } else if (password.length < 6) {
      toast.error("Password should be equal or greater than 8 characters.");
      return false;
    } else if (email === "") {
      toast.error("Email is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "tyqlg3ql");

      const pic = await axios.post(
        `https://api.cloudinary.com/v1_1/dj5qwihzu/upload`,
        data
      );

      const { url } = pic.data;

      // console.log(url);
      const res = await axios.post(
        "/auth/register",
        {
          username,
          password,
          email,
          country,
          phone,
          desc,
          isSeller,
          img: url,
        },
        { withCredentials: true }
      );
      // console.log(res);
      if (res.data.status === false) {
        toast.error(res.data.message);
      }
      if (res.data.status === true) {
        // console.log(res.data);
        localStorage.setItem(
          import.meta.env.VITE_TOKEN,
          JSON.stringify(res.data.userWithoutPassword)
        );
        toast.success("User registered successfully.");
        navigate("/");
      } else {
        toast.error("Some fields are not in required.");
      }
    }
  };

  return (
    <div className="w-full bg-gray-100">
      <div className="max-w-7xl mx-auto  flex items-center justify-center p-10">
        <div className="shadow-lg bg-slate-100 w-[700px]  min-w-[350px] font-mono rounded-lg px-10 py-3 flex flex-col gap-5">
          <h1 className="text-2xl font-semibold text-center">Register</h1>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-start gap-2"
          >
            <div className="w-full flex flex-col md:flex-row  gap-5">
              <div className="w-full flex flex-col justify-between gap-2">
                <h1 className="text-xl font-semibold text-center">
                  Create New Account
                </h1>
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                  placeholder="username"
                  className="w-full p-2 outline-none shadow-md rounded-lg focus-within:shadow-lg"
                />
                <label>Email:</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email Address"
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
                <label>Country:</label>
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  type="text"
                  placeholder="Entry Your Country..."
                  className="w-full p-2 outline-none shadow-md rounded-lg focus-within:shadow-lg"
                />
              </div>

              {/* seller */}
              <div className="w-full flex flex-col gap-3  whitespace-nowrap">
                <h1 className="text-xl font-semibold text-center ">
                  Want to Be a Seller?
                </h1>

                <div className="flex items-center md:items-start justify-center md:justify-start gap-2">
                  <input
                    onChange={(e) => setIsSeller(e.target.checked)}
                    type="checkbox"
                    className="w-5 h-5 outline-none  rounded-lg "
                  />
                  <label>Active to Become Seller</label>
                </div>

                <label>Phone Number:</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="number"
                  placeholder="Phone Number"
                  className="w-full p-2 outline-none shadow-md rounded-lg focus-within:shadow-lg"
                />
                <label>Avatar Image:</label>
                {file ? (
                  <img
                    onClick={() => setFile()}
                    src={URL.createObjectURL(file)}
                    alt=""
                    className="w-20 h-20 rounded-lg  cursor-pointer bg-gray-300"
                  />
                ) : (
                  <label
                    htmlFor="file"
                    className="w-20 h-20 rounded-lg flex items-center cursor-pointer justify-center bg-gray-300"
                  >
                    <AiFillPicture className="w-7 h-7 text-gray-500" />
                    <input
                      id="file"
                      type="file"
                      hidden
                      onChange={(e) => setFile(e.target.files[0])}
                      className="w-full p-2 outline-none shadow-md rounded-lg focus-within:shadow-lg"
                    />
                  </label>
                )}

                <label>Description:</label>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  rows={4}
                  placeholder="Please Introduce Yourself..."
                  className="w-full p-2 outline-none shadow-md rounded-lg focus-within:shadow-lg"
                />
              </div>
            </div>

            <button
              type="submit"
              className="py-2 mt-3 w-full bg-green-400 rounded-lg shadow-md text-white font-semibold hover:bg-green-500"
            >
              SIGNUP
            </button>
          </form>
          <p className=" text-center">
            Already have a account?{" "}
            <Link
              to={`/login`}
              className="text-blue-500 hover:text-blue-400 cursor-pointer"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
