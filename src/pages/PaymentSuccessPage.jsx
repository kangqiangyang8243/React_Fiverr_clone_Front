import axios from 'axios';
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const PaymentSuccessPage = () => {
  // get URL query 
  const { search } = useLocation();
  // get the single query parameter from query string
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");
  const navigate = useNavigate()

  // console.log(payment_intent);

    useEffect(() => {
			const makeRequest = async () => {
				try {
					await axios
						.create({
							baseURL: import.meta.env.VITE_BASE_URL,
							withCredentials: true,
						}).put("/orders/", { payment_intent }).then(res=>toast.success("Order created successfully"));
					setTimeout(() => {
						navigate("/orders");
					}, 5000);
				} catch (err) {
					console.log(err);
				}
			};

			makeRequest();
		}, [search]);

	// console.log(first)
  return (
		<div className="mt-[200px] mb-10 max-w-6xl mx-auto font-serif text-2xl p-10 space-y-5">
			<h3 className='font-semibold'>Payment successful.</h3>
			<p>
				You are being redirected to the orders page. Please do not close the
				page
			</p>
		</div>
	);
}
