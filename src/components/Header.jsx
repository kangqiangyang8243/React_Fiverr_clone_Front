import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cards } from "../data";

function Header() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();
  const [cats, setCats] = useState([]);

  useEffect(() => {
    if (localStorage.getItem(import.meta.env.VITE_TOKEN)) {
      const users = JSON.parse(
        localStorage.getItem(import.meta.env.VITE_TOKEN)
      );
      setCurrentUser(users);
    }
  }, [navigate]);

  // console.log(currentUser);

  // console.log(location);

  useEffect(() => {
    const fetchCat = async () => {
      const res = await axios.get("/category");
      setCats(res.data);
    };
    fetchCat();
  }, []);

  // console.log(cats);

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    if (location.pathname === "/") {
      window.addEventListener("scroll", isActive);

      return () => {
        window.removeEventListener("scroll", isActive);
      };
    } else {
      setActive(true);
    }
  }, [location]);

  const routerMatch = (router) => {
    if (router === location.search.slice(5).replace("_", " ")) {
      return true;
    } else {
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`/auth/logout`, { withCredentials: true });
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(user);

  return (
    <div
      className={`w-full  fixed top-0 z-50 font-serif transition-all duration-700 ease-linear ${
        active ? `bg-white border-b ` : `bg-transparent `
      }`}
    >
      {/* top */}
      <div className="max-w-7xl mx-auto relative">
        <div className="flex px-3 items-center  justify-between">
          {/* left */}
          <Link to="/">
            <div
              className={`text-[40px] p-4 flex font-bold ${
                active ? `text-black ` : `text-white  `
              }`}
            >
              <h1>Fiverr</h1>
              <span className="text-green-500">.</span>
            </div>
          </Link>
          {/* right */}
          <div
            className={`flex items-center gap-5  text-lg ${
              active ? `text-black ` : `text-white  `
            } `}
          >
            <ul className="flex items-center gap-5 font-semibold cursor-pointer">
              <li className="hidden lg:inline-flex transform duration-100 ease-linear hover:text-green-400 ">
                Fiverr Business
              </li>
              <li className="hidden lg:inline-flex transform duration-100 ease-linear hover:text-green-400 ">
                Explore
              </li>
              <li className="hidden lg:inline-flex transform duration-100 ease-linear hover:text-green-400 ">
                English
              </li>
              {!currentUser?.isSeller && (
                <li
                  onClick={() => navigate("/becomeSeller")}
                  className="hidden md:inline-flex transform duration-100 ease-linear hover:text-green-400 "
                >
                  Become a Seller
                </li>
              )}
            </ul>
            {currentUser ? (
              <div
                onClick={() => setOpen(!open)}
                className="cursor-pointer flex items-center gap-3  rounded-lg text-lg transform duration-100 ease-linear font-semibold "
              >
                <img
                  src={
                    currentUser.img ||
                    "https://ionicframework.com/docs/img/demos/avatar.svg"
                  }
                  alt=""
                  className="w-7 h-7 rounded-full object-cover"
                />
                <h3>{currentUser.username}</h3>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className=" px-4 py-2 rounded-lg border-2 transform duration-100 ease-linear hover:border-green-400 hover:bg-green-400 hover:text-white"
              >
                JoIn
              </button>
            )}
          </div>
        </div>

        {open && (
          <div className="text-lg absolute right-0 top-16 bg-white px-10 py-4 border-2 rounded-lg">
            <ul className="space-y-5 ">
              <li
                onClick={() => navigate("/mypost")}
                className="hover:underline underline-offset-4 cursor-pointer"
              >
                Posts
              </li>
              <li
                onClick={() => navigate("/addpost")}
                className="hover:underline underline-offset-4 cursor-pointer"
              >
                Add New Posts
              </li>
              <li
                onClick={() => navigate("/orders")}
                className="hover:underline underline-offset-4 cursor-pointer"
              >
                Orders
              </li>
              <li
                onClick={() => navigate("/messages")}
                className="hover:underline underline-offset-4 cursor-pointer"
              >
                Messages
              </li>
              <li
                onClick={handleLogout}
                className="hover:underline underline-offset-4 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      {active && (
        <>
          <hr />
          {/* bottom */}
          <div className="max-w-7xl mx-auto">
            <div
              className={`flex overflow-x-scroll px-2 py-3 w-full flex-nowrap whitespace-nowrap gap-10 items-center justify-between ${
                active ? `text-black ` : `text-white  `
              } `}
            >
              {cats.map((cat) => (
                <span
                  onClick={() =>
                    navigate(`/gigs?cat=${cat?.name.replace(" ", "_")}`)
                  }
                  key={cat?._id}
                  className={`cursor-pointer text-gray-500 hover:underline underline-offset-4 ${
                    routerMatch(cat?.name) && `underline underline-offset-4`
                  }`}
                >
                  {cat?.name}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Header;
