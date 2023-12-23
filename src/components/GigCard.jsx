import React, { useEffect } from "react";
import { BsHeartFill, BsStar, BsStarFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { gigs } from "../data";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function GigCard({ gig }) {
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: [gig.userId],
    queryFn: async () => {
      return await axios
        .get(`/users/${gig.userId}`, {
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        });
    },
  });
  // console.log(data);

  return (
    <div
      onClick={() => navigate(`/gig/${gig._id}`)}
      key={gig._id}
      className="border cursor-pointer group overflow-hidden flex shadow-md hover:shadow-lg rounded-lg flex-col justify-between gap-3"
    >
      <img
        src={gig?.cover}
        alt=""
        className="w-full h-[200px] object-cover group-hover:scale-105 transition transform duration-100 ease-linear"
      />

      {/* middle */}
      <div className="flex flex-col h-[150px] gap-2 px-3 pb-3 border-b">
        <div className="flex items-center gap-3">
          <img
            src={data?.img}
            alt=""
            className="w-12 h-12 rounded-full object-cover"
          />
          <h3>{data?.username}</h3>
        </div>

        <h3 className="text-black text-xl">{gig?.title}</h3>

        <p className="text-gray-500">{gig?.desc}</p>

        <div className="flex items-center gap-1 text-yellow-400">
          {Array.from(Array(gig?.starNumber), (_, i) => (
            <BsStarFill key={i} />
          ))}
          <span>{gig?.starNumber === 0 && ""}</span>
        </div>
      </div>

      {/* bottom */}
      <div className="flex justify-between items-center  px-4 pb-2">
        <BsHeartFill className="text-gray-500" />

        <div className="flex flex-col items-center">
          <h3 className="text-gray-400">Start at</h3>
          <h2 className="text-lg font-semibold">${gig?.price}</h2>
        </div>
      </div>
    </div>
  );
}

export default GigCard;
