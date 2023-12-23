import React from "react";
import { useNavigate } from "react-router-dom";

function HomePageMarketPlace() {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto p-7 font-serif flex flex-col gap-3 items-center md:items-start">
      <h1 className="font-bold text-2xl whitespace-nowrap">
        Explore the Marketplace
      </h1>
      <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <div
          className="item group"
          // onClick={() => navigate(`/gigs?cat=${card.title.replace(" ", "_")}`)}
        >
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg"
            alt=""
            className="w-20 h-20 cursor-pointer object-cover"
          />
          <div className="line"></div>
          <span>Graphics & Design</span>
        </div>
        <div
          className="item group"
          onClick={() =>
            navigate(`/gigs?cat=${"Digital Marketing".replace(" ", "_")}`)
          }
        >
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg"
            alt=""
            className="w-20 h-20 cursor-pointer object-cover"
          />
          <div className="line"></div>

          <span>Digital Marketing</span>
        </div>
        <div
          className="item group"
          // onClick={() => navigate(`/gigs?cat=${card.title.replace(" ", "_")}`)}
        >
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg"
            alt=""
            className="w-20 h-20 cursor-pointer object-cover"
          />
          <div className="line"></div>
          <span>Writing & Translation</span>
        </div>
        <div
          className="item group"
          // onClick={() => navigate(`/gigs?cat=${card.title.replace(" ", "_")}`)}
        >
          <img
            className="w-20 h-20 cursor-pointer object-cover"
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg"
            alt=""
          />
          <div className="line "></div>
          <span>Video & Animation</span>
        </div>
        <div
          className="item group"
          // onClick={() => navigate(`/gigs?cat=${card.title.replace(" ", "_")}`)}
        >
          <img
            className="w-20 h-20 cursor-pointer object-cover"
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg"
            alt=""
          />
          <div className="line "></div>
          <span>Music & Audio</span>
        </div>
        <div
          className="item group"
          // onClick={() => navigate(`/gigs?cat=${card.title.replace(" ", "_")}`)}
        >
          <img
            className="w-20 h-20 cursor-pointer object-cover"
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg"
            alt=""
          />
          <div className="line"></div>
          <span>Programming & Tech</span>
        </div>
        <div
          className="item group"
          // onClick={() => navigate(`/gigs?cat=${card.title.replace(" ", "_")}`)}
        >
          <img
            className="w-20 h-20 cursor-pointer object-cover"
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/business.bbdf319.svg"
            alt=""
          />
          <div className="line"></div>
          <span>Business</span>
        </div>
        <div
          className="item group"
          // onClick={() => navigate(`/gigs?cat=${card.title.replace(" ", "_")}`)}
        >
          <img
            className="w-20 h-20 cursor-pointer object-cover"
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lifestyle.745b575.svg"
            alt=""
          />
          <div className="line"></div>
          <span>Lifestyle</span>
        </div>
        <div
          className="item group"
          // onClick={() => navigate(`/gigs?cat=${card.title.replace(" ", "_")}`)}
        >
          <img
            className="w-20 p-2 h-20 cursor-pointer object-cover"
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/data.718910f.svg"
            alt=""
          />
          <div className="line"></div>
          <span>Data</span>
        </div>
        <div
          className="item group"
          // onClick={() => navigate(`/gigs?cat=${card.title.replace(" ", "_")}`)}
        >
          <img
            className="w-20 h-20 cursor-pointer object-cover"
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/photography.01cf943.svg"
            alt=""
          />
          <div className="line"></div>
          <span>Photography</span>
        </div>
      </div>
    </div>
  );
}

export default HomePageMarketPlace;
