import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function BecomeSellerPage() {
  const [cats, setCats] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [skills, setSkills] = useState("");
  const [Occupation, setOccupation] = useState("");
  const [desc, setDesc] = useState("");
  const [languages, setLanguages] = useState("");
  const [from, setFrom] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem(import.meta.env.VITE_TOKEN)) {
      const users = JSON.parse(
        localStorage.getItem(import.meta.env.VITE_TOKEN)
      );
      setCurrentUser(users);
    }
  }, []);

  useEffect(() => {
    const fetchCat = async () => {
      const res = await axios.get("/category");
      setCats(res.data);
    };
    fetchCat();
  }, []);

  //   console.log(currentUser);
  //   console.log(cats);
  //   console.log(Occupation);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/seller/createSeller", {
        user: currentUser._id,
        language: languages,
        desc,
        occupation: Occupation,
        skill: skills,
        from,
      });

      await axios.put(`/users/updateSeller/${currentUser._id}`);

      //   console.log(res);
      toast.success("Become Seller Successful!");
      navigate("/");
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  return (
    <div className="max-w-7xl  mx-auto mt-44 px-7 font-mono flex flex-col gap-5">
      <div>
        <h1 className="text-3xl">Personal Info</h1>
        <p className="text-gray-500">
          Tell us a bit about yourself. This information will appear on your
          public profile, so that potential buyers can get to know you better.
        </p>
      </div>

      <hr />

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-10 py-10"
      >
        <div className="flex items-center justify-between w-full">
          <label className="text-2xl">Skills:</label>
          <input
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Input your skills.."
            type="text"
            className="border outline-none p-2 w-[30%] min-w-[200px] shadow-md rounded-lg focus-within:shadow-lg"
          />
        </div>

        <div className="flex items-center justify-between w-full">
          <label className="text-2xl">Country:</label>
          <input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Where are you from.."
            type="text"
            className="border outline-none p-2 w-[30%] min-w-[200px] shadow-md rounded-lg focus-within:shadow-lg"
          />
        </div>
        <div className="flex items-center justify-between w-full">
          <label className="text-2xl">Occupation:</label>
          <select
            onChange={(e) => setOccupation(e.target.value)}
            className="border outline-none p-2 w-[30%] min-w-[200px] shadow-md rounded-lg focus-within:shadow-lg"
          >
            {cats.length > 0 &&
              cats?.map((cat) => <option key={cat._id}>{cat.name}</option>)}
            <option value="">Other</option>
          </select>
        </div>
        <div className="flex items-center justify-between w-full">
          <label className="flex-grow text-2xl">Description:</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Tell me about yourself..."
            cols={30}
            rows={5}
            className="border  outline-none p-2 w-[30%] min-w-[200px] shadow-md rounded-lg focus-within:shadow-lg"
          />
        </div>

        <div className="flex items-center justify-between w-full">
          <label className="text-2xl" htmlFor="">
            Languages:
          </label>
          <input
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
            placeholder="What languages you used to speak?"
            type="text"
            className="border outline-none p-2 w-[30%] min-w-[200px] shadow-md rounded-lg focus-within:shadow-lg"
          />
        </div>

        <button
          type="submit"
          className="py-2 text-white shadow-md rounded-lg text-xl font-semibold bg-green-400 hover:bg-green-500"
        >
          CREATE
        </button>
      </form>
    </div>
  );
}

export default BecomeSellerPage;
