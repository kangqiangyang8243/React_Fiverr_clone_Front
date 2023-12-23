import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cards } from "../data";

function HomePageServices() {
  const navigate = useNavigate();
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const fetchCat = async () => {
      const res = await axios.get("/category");
      setCats(res.data);
    };
    fetchCat();
  }, []);

  return (
    <div className="max-w-7xl mx-auto font-serif p-7 ">
      {/* Popular Professional Services */}
      <div className=" w-full overflow-hidden">
        <h1 className="text-3xl font-semibold w-full">
          Popular Professional Services
        </h1>
        <div className="flex flex-nowrap gap-5 p-3 w-full h-full whitespace-nowrap overflow-x-scroll ">
          {cats.map((cat) => (
            <div
              onClick={() =>
                navigate(`/gigs?cat=${cat?.name.replace(" ", "_")}`)
              }
              key={cat?._id}
              className="relative shadow-md hover:shadow-lg hover:scale-105 transform duration-100 ease-linear cursor-pointer w-[300px] h-[400px] min-w-[300px] "
            >
              <img
                src={cat?.img}
                alt=""
                className=" w-full h-full object-cover rounded-lg shadow-md "
              />
              <div className="absolute top-5 left-2 text-white w-full">
                <p className="text-2xl">{cat?.desc}</p>
                <h3 className="text-3xl font-semibold">{cat?.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePageServices;
