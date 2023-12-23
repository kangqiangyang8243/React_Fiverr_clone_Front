import React from "react";
import { BsStarFill } from "react-icons/bs";
import Flags, { CN } from "country-flag-icons/react/3x2";
import { getCode } from "country-list";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function SingleGigReviewArea({ review }) {
  // console.log(review);

  const userId = review?.userId;

  // fetch User
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["ReviewUser",review?.userId],
    queryFn: async () => {
      return await axios
        .get(`/users/${userId}`, {
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        });
    },

    enabled: !!userId,
  });

  // let countryCode = getCode(dataUser?.country?.toString());
  // let Flag = Flags[countryCode];

  // console.log(countryCode);
  // console.log(Flags[countryCode]);

  // console.log(dataUser);
  return (
    <div className="w-full py-5 border-b-2 font-serif">
      {isLoadingUser ? (
        "loading"
      ) : errorUser ? (
        "error"
      ) : (
        <>
          {/* top */}
          <div className="flex w-full flex-col gap-2 px-3 pb-3">
            <div className="flex items-center gap-3">
              <img
                src={dataUser?.img}
                alt=""
                className=" h-16 w-16 shadow-md rounded-full object-cover"
              />
              <div className="flex flex-col">
                <h3 className="text-xl">{dataUser?.username}</h3>
                <p className="flex items-center gap-1">
                  <CN title={dataUser?.country} className="w-5 h-5" />
                  <span>{dataUser?.country} </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-yellow-400">
              {Array.from(Array(review?.star), (_, i) => (
                <BsStarFill key={i} />
              ))}
              <span>{review?.star}</span>
            </div>
          </div>
        </>
      )}

      {/* bottom */}
      <div className="flex flex-col px-3 gap-3">
        <p className="text-gray-500">{review?.desc}</p>
        <div className="flex items-center gap-3">
          <h3 className="text-lg">Helpful?</h3>
          <p className="flex items-center gap-3">
            <AiOutlineLike className="w-6 h-6 cursor-pointer" />
            <span>Yes</span>
          </p>

          <p className="flex items-center gap-3">
            <AiOutlineDislike className="w-6 h-6 cursor-pointer" />
            <span>No</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SingleGigReviewArea;
