import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
// import './PaymentPage.css';
const stripePromise = loadStripe(
	`pk_test_51OPC7PLvZzRvYrGZuJkMOkuMFcFFzdWPgDRh1sjjUbjoQws3cvVs5UMAHbolRAXTx2h2YsXZ2KSiH9gYfxgvSUN700IjjzJan1`
);



function PaymentPage() {
  const [clientSecret, setClientSecret] = useState("");
  const {gigId} = useParams()
  
  // console.log(gigId);
  
  useEffect(() => {
    const fetchPay = async() => {
     try {
       const res = await axios
					.create({
						baseURL: import.meta.env.VITE_BASE_URL,
						withCredentials: true,
					})
					.post(`/orders/create-payment-intent/${gigId}`);

      //  console.log(res)

       setClientSecret(res.data.clientSecret);
     } catch (error) {
        console.log(error)
     }
    }

    fetchPay();
  }, []);

  // console.log(clientSecret);

   const appearance = {
			theme: "stripe",
		};
		const options = {
			clientSecret,
			appearance,
		};

  return (
		<div >
			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					<CheckoutForm />
				</Elements>
			)}
		</div>
	);
}

export default PaymentPage