import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Feature from "../components/Feature";
import HomePageBusiness from "../components/HomePageBusiness";
import HomePageFingerTips from "../components/HomePageFingerTips";
import HomePageMarketPlace from "../components/HomePageMarketPlace";
import HomePageServices from "../components/HomePageServices";
import TrustBy from "../components/TrustBy";
import { projects } from "../data";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <Feature />
      <TrustBy />
      <HomePageServices />
      <HomePageFingerTips />
      <HomePageMarketPlace />
      <HomePageBusiness />

      <div className="max-w-7xl mx-auto p-7 space-y-4">
        <h1 className="font-bold text-2xl whitespace-nowrap">Fiverr guides</h1>
        <div className="w-full py-5 flex items-center gap-5 overflow-x-scroll ">
          {projects.map((project) => (
            <div
              className="border flex shadow-lg flex-col gap-3 rounded-lg min-w-[400px] h-[350px]"
              key={project.id}
            >
              <img
                src={project.img}
                alt=""
                className="cursor-pointer object-cover w-full rounded-tl-lg rounded-tr-lg"
              />
              <div className="flex items-center px-5 gap-3">
                <img
                  src={project.pp}
                  alt=""
                  className="w-16 object-cover h-16 rounded-full cursor-pointer"
                />
                <div>
                  <strong className="text-lg">{project.cat}</strong>
                  <p>{project.username}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
