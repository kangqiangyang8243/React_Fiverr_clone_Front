import React, { useEffect, useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { gigs } from "../data";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SingleGigReviewArea from "../components/SingleGigReviewArea";
import SingleGigPrem from "../components/SingleGigPrem";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Reviews from "../components/Reviews";

function SingleCatPage() {
  const { gigId } = useParams();
  //   console.log(gigId)

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: async () => {
      return await axios
        .get(`/gigs/single/${gigId}`, {
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        });
    },
  });

  // console.log(data);

  const userId = data?.userId;

  // fetch User
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
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

  // console.log(dataUser);

  return (
    <div className="max-w-7xl mx-auto mt-44 px-7 font-serif md:grid md:grid-cols-3 gap-10">
      {/* left */}
      <div className=" gap-5 col-span-2 w-full flex flex-col ">
        {/* top */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg text-gray-600">
            Fiverr {">"} {data?.cat} {">"}
          </h3>

          <h2 className="text-3xl font-bold">{data?.title}</h2>

          <div className="flex items-center gap-3">
            <img
              src={dataUser?.img}
              alt=""
              className="w-12 h-12 shadow-md rounded-full object-cover"
            />
            <h3>{dataUser?.username}</h3>

            <div className="flex items-center gap-1 text-yellow-400">
              {!isNaN(data?.totalStars / data?.starNumber) && (
                <>
                  {Array(Math.round(data.totalStars / data.starNumber))
                    .fill()
                    .map((item, i) => (
                      <BsStarFill key={i} />
                    ))}
                </>
              )}

              <span>
                {" "}
                {!isNaN(data?.totalStars / data?.starNumber) &&
                  Math.round(data.totalStars / data.starNumber)}
              </span>
            </div>
          </div>
        </div>

        {/* img slider */}
        <Swiper
          // install Swiper modules
          modules={[Navigation]}
          slidesPerView={1}
          navigation
          scrollbar={{ draggable: true }}
          className="w-full h-[400px]"
        >
          {data?.images?.map((img, i) => (
            <SwiperSlide key={i}>
              <img src={img} alt="" className="w-full h-full object-contain" />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* description */}
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold">About This Gig</h3>
          <p>{data?.desc}</p>
        </div>

        {/* about seller */}
        <div className="flex items-center gap-3">
          <img
            src={dataUser?.img}
            alt=""
            className="w-24 h-24 shadow-md rounded-full object-cover"
          />
          <div className="flex flex-col items-start gap-1">
            <h3 className="text-2xl ">{dataUser?.username}</h3>

            <div className="flex items-center gap-1 text-yellow-400">
              {!isNaN(data?.totalStars / data?.starNumber) && (
                <>
                  {Array(Math.round(data.totalStars / data.starNumber))
                    .fill()
                    .map((item, i) => (
                      <BsStarFill key={i} />
                    ))}
                </>
              )}
              <span>
                {" "}
                {!isNaN(data?.totalStars / data?.starNumber) &&
                  Math.round(data.totalStars / data.starNumber)}
              </span>
            </div>

            <button className="border p-2 rounded-lg">Contact Me</button>
          </div>
        </div>

        {/* seller info */}
        <div className="border p-3 rounded-lg shadow-md">
          <div className="grid grid-cols-2 border-b-2 p-3 gap-5">
            <div className="text-gray-500 text-lg">
              From
              <p className="font-semibold text-black text-xl">
                {dataUser?.country}
              </p>
            </div>

            <div className="text-gray-500 text-lg">
              Member since
              <p className="font-semibold text-black text-xl">Aug 2022</p>
            </div>
            <div className="text-gray-500 text-lg">
              Avg. response time
              <p className="font-semibold text-black text-xl">4 hours</p>
            </div>
            <div className="text-gray-500 text-lg">
              Last delivery
              <p className="font-semibold text-black text-xl">1 day</p>
            </div>
            <div className="text-gray-500 text-lg">
              Languages
              <p className="font-semibold text-black text-xl">English</p>
            </div>
          </div>

          <p className="p-3 text-gray-400">{dataUser?.desc}</p>
        </div>

        {/* review */}
        <div className="w-full  pb-10">
          <h3 className="text-2xl font-semibold">Reviews</h3>
          <Reviews gigId={gigId} />
        </div>
      </div>

      {/* right */}
      <div className="w-full flex-1 pb-10">
        <SingleGigPrem gig={data} id={gigId} />
      </div>
    </div>
  );
}

export default SingleCatPage;
