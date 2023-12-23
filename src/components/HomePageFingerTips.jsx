import React from "react";
import { BsCheckCircle } from "react-icons/bs";

function HomePageFingerTips() {
  return (
    <div className="w-full bg-green-200 font-serif">
      <div className="max-w-7xl mx-auto p-7 gap-10 flex flex-col md:flex-row w-full  items-center justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-semibold">
            A whole world of freelance talent at your fingertips
          </h1>
          <div className="flex items-center gap-2 font-bold">
            <BsCheckCircle />
            <p> The best for every budget</p>
          </div>
          <p>
            Find high-quality services at every price point. No hourly rates,
            just project-based pricing.
          </p>
          <div className="flex items-center gap-2 font-bold">
            <BsCheckCircle />
            <p>Quality work done quickly</p>
          </div>
          <p>
            Find the right freelancer to begin working on your project within
            minutes.
          </p>
          <div className="flex items-center gap-2 font-bold">
            <BsCheckCircle />
            <p>Protected payments, every time</p>
          </div>
          <p>
            Always know what you'll pay upfront. Your payment isn't released
            until you approve the work.
          </p>
          <div className="flex items-center gap-2 font-bold">
            <BsCheckCircle />
            <p>24/7 support</p>
          </div>
          <p>
            Find high-quality services at every price point. No hourly rates,
            just project-based pricing.
          </p>
        </div>
        <div className="md:w-[50%] w-full ">
          <video
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
            controls
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default HomePageFingerTips;
