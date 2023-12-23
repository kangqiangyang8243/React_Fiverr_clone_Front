import React from "react";
import {
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterCircle,
  AiFillYoutube,
  AiOutlineGlobal,
} from "react-icons/ai";
import { ImAccessibility } from "react-icons/im";
import { BsCoin } from "react-icons/bs";

function Footer() {
  return (
    <footer className=" w-full border-t font-serif">
      <div className="max-w-7xl mx-auto p-7">
        <div className="flex justify-between flex-wrap gap-10 py-7">
          <div className="flex flex-col w-full md:w-fit   items-center md:items-start">
            <h2 className="text-xl font-semibold">Categories</h2>
            <span>Graphics & Design</span>
            <span>Digital Marketing</span>
            <span>Writing & Translation</span>
            <span>Video & Animation</span>
            <span>Music & Audio</span>
            <span>Programming & Tech</span>
            <span>Data</span>
            <span>Business</span>
            <span>Lifestyle</span>
            <span>Photography</span>
            <span>Sitemap</span>
          </div>
          <div className="flex flex-col w-full md:w-fit   items-center md:items-start">
            <h2 className="text-xl font-semibold">About</h2>
            <span>Press & News</span>
            <span>Partnerships</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Intellectual Property Claims</span>
            <span>Investor Relations</span>
            <span>Contact Sales</span>
          </div>
          <div className="flex flex-col w-full md:w-fit   items-center md:items-start">
            <h2 className="text-xl font-semibold">Support</h2>
            <span>Help & Support</span>
            <span>Trust & Safety</span>
            <span>Selling on Liverr</span>
            <span>Buying on Liverr</span>
          </div>
          <div className="flex flex-col w-full md:w-fit   items-center md:items-start">
            <h2 className="text-xl font-semibold">Community</h2>
            <span>Customer Success Stories</span>
            <span>Community hub</span>
            <span>Forum</span>
            <span>Events</span>
            <span>Blog</span>
            <span>Influencers</span>
            <span>Affiliates</span>
            <span>Podcast</span>
            <span>Invite a Friend</span>
            <span>Become a Seller</span>
            <span>Community Standards</span>
          </div>
          <div className="flex flex-col w-full md:w-fit   items-center md:items-start">
            <h2 className="text-xl font-semibold">More From Fiverr</h2>
            <span>Liverr Business</span>
            <span>Liverr Pro</span>
            <span>Liverr Logo Maker</span>
            <span>Liverr Guides</span>
            <span>Get Inspired</span>
            <span>Liverr Select</span>
            <span>ClearVoice</span>
            <span>Liverr Workspace</span>
            <span>Learn</span>
            <span>Working Not Working</span>
          </div>
        </div>
        <hr />
        <div className="flex flex-col md:flex-row items-center md:items-end py-3 justify-between gap-3">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-5">
            <h2 className="text-gray-700 font-semibold text-3xl">liverr</h2>
            <span>© Liverr International Ltd. 2023</span>
          </div>
          <div className="flex items-center flex-col md:flex-row gap-5">
            <div className="flex items-center gap-3">
              <AiFillTwitterCircle className="w-7 h-7 text-gray-500" />
              <AiFillLinkedin className="w-7 h-7 text-gray-500" />
              <AiFillInstagram className="w-7 h-7 text-gray-500" />
              <AiFillYoutube className="w-7 h-7 text-gray-500" />
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 text-lg">
                <AiOutlineGlobal className="w-7 h-7 text-gray-500" />
                <span>English</span>
              </div>
              <div className="flex items-center gap-2 text-lg">
                <BsCoin className="w-7 h-7 text-gray-500" />
                <span>USD</span>
              </div>
              <ImAccessibility className="w-7 h-7 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
