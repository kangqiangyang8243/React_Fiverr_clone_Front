import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import { cards } from "../data";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Feature() {
    const [input, setInput] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/gigs?search=${input}`);
  }
  return (
		<div className="w-full relative font-serif">
			<Swiper
				slidesPerView={1}
				modules={[Autoplay]}
				autoplay={{
					delay: 3500,
					disableOnInteraction: true,
				}}
				className="w-full h-[450px]">
				<SwiperSlide>
					<img
						src="https://cdn.pixabay.com/photo/2016/04/20/07/16/logo-1340516__480.png"
						alt=""
						className="w-full h-full object-cover"
					/>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src="https://cdn.pixabay.com/photo/2016/01/13/06/00/banner-1137276__480.jpg"
						alt=""
						className="w-full h-full object-cover"
					/>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src="https://images.pexels.com/photos/5490778/pexels-photo-5490778.jpeg?auto=compress&cs=tinysrgb&w=1600"
						alt=""
						className="w-full h-full object-cover"
					/>
				</SwiperSlide>
			</Swiper>

			{/*  */}
			<div className="max-w-7xl z-40 mx-auto absolute top-[40%] left-[10%] text-white flex flex-col gap-5">
				<p className="text-3xl font-semibold">
					Find the perfect <i className="font-normal">freelance</i> services for
					your business
				</p>
				<form className="flex flex-col gap-5 lg:flex-row lg:gap-0 w-[90%]">
					<div className="flex-grow flex items-center bg-slate-50 rounded-lg lg:rounded-tr-none lg:rounded-br-none lg:rounded-tl-lg lg:rounded-bl-lg shadow-md focus-within:shadow-lg">
						<AiOutlineSearch className="w-7 h-7 p-1 text-black" />
						<input
							type="text"
							placeholder="Search..."
							value={input}
							onChange={(e) => setInput(e.target.value)}
							className="w-full bg-transparent outline-none p-2   text-black"
						/>
					</div>
					<button
						onClick={handleSearch}
						className="bg-green-400 hover:bg-green-500 lg:rounded-tr-lg lg:rounded-br-lg lg:rounded-tl-none lg:rounded-bl-none rounded-lg px-4 py-2">
						Search
					</button>
				</form>
				<div className=" hidden lg:inline-flex items-center gap-5 font-semibold">
					<p>Popular:</p>
					{cards.slice(0, 4).map((card) => (
						<div
							key={card.id}
							onClick={() =>
								navigate(`/gigs?cat=${card.title.replace(" ", "_")}`)
							}
							className="flex cursor-pointer hover:bg-gray-400 items-center border rounded-lg p-1">
							<p>{card.title}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Feature;
