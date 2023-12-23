import React from "react";
import { AiOutlineReload } from "react-icons/ai";
import { BsCheck, BsClock } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

function SingleGigPrem({ gig, id }) {
  // console.log(id)
  const navigate = useNavigate();
	return (
		<div className="flex flex-col w-full sticky top-[180px] gap-5 p-3 rounded-lg shadow-md border">
			{/* top */}
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-semibold">{gig?.shortTitle}</h2>
				<p className="text-lg text-gray-600">${gig?.price}</p>
			</div>

			{/* middle 1*/}
			<p className="text-gray-500">{gig?.shortDesc}</p>

			{/* middle 2*/}
			<div className="flex items-center justify-between">
				<p className="flex items-center gap-2">
					<BsClock />
					<span>{gig?.deliveryTime} Days Delivery</span>
				</p>

				<p className="flex items-center gap-2">
					<AiOutlineReload />
					<span>{gig?.revisionNumber} Revisions</span>
				</p>
			</div>

			{/* middle 3*/}
			<ul>
				{gig?.features?.map((feature) => (
					<li key={feature} className="flex items-center gap-2">
						<BsCheck className="w-5 h-5 text-green-400" />
						<span>{feature}</span>
					</li>
				))}
			</ul>
			<Link
				className="py-2 bg-green-400 rounded-lg shadow-md text-white text-center text-lg hover:bg-green-500"
				to={`/pay/${id}`}>
				<button>Continue</button>
			</Link>
		</div>
	);
}

export default SingleGigPrem;
