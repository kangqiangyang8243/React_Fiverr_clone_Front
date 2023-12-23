import React from "react";
import { BsCheckCircle } from "react-icons/bs";

function HomePageBusiness() {
  return (
    <div className="w-full bg-[#0b2262] font-serif text-white">
      <div className="max-w-7xl mx-auto p-7 gap-10 flex flex-col md:flex-row w-full  items-center justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl">
            <strong>fiverr</strong> business.
            <span className="text-lg ml-4 px-2 py-1 bg-blue-400 rounded-full shadow-lg">
              new
            </span>
          </h1>
          <h1 className="text-2xl">
            <strong>A business solution designed for</strong> <i>teams</i>
          </h1>
          <p className="text-xl">
            Upgrade to a curated experience packed with tools and benefits,
            dedicated to businesses
          </p>
          <div className="flex items-center gap-2 font-bold">
            <BsCheckCircle />
            <p> Connect to freelancers with proven business experience</p>
          </div>

          <div className="flex items-center gap-2 font-bold">
            <BsCheckCircle />
            <p>
              Get matched with the perfect talent by a customer success manager
            </p>
          </div>

          <div className="flex items-center gap-2 font-bold">
            <BsCheckCircle />
            <p>
              anage teamwork and boost productivity with one powerful workspace
            </p>
          </div>
        </div>
        <div className="md:w-[50%] w-full ">
          <img
            src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default HomePageBusiness;
