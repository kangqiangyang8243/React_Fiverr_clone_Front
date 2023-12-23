import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { ImMail } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


function OrderPage() {

  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("react_fiverr"));

  // console.log(currentUser);

  const {
    isLoading: isOrderLoading,
    error: orderError,
    data: orderData,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return await axios
        .get(`/orders/`, {
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        });
    },
  });

  // console.log(orderData);


  //   const {
  //     isLoading: isLoadingUser,
  //     error: errorUser,
  //     data: dataUser,
  //   } = useQuery({
  //     queryKey: ["user"],
  //     queryFn: async () => {
  //       return await axios
  //         .get(
  //           `/users/${
  //             currentUser.isSeller ? orderData.buyerId : orderData.sellerId
  //           }`,
  //           {
  //             withCredentials: true,
  //           }
  //         )
  //         .then((res) => {
  //           return res.data;
  //         });
  //     },
  //   });


  // console.log(dataUser)

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      await axios
        .get(`/conversation/single/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          // console.log(res);
          navigate(`/message/${res.data.id}`);
        });
    } catch (error) {
      if (error.response.status === 404) {
        await axios
          .post(
            `/conversation/`,
            {
              to: currentUser.isSeller ? buyerId : sellerId,
            },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            // console.log(res);
            navigate(`/message/${res.data.id}`);
          });
      }
    }
  };
  return (
		<div className="max-w-7xl mx-auto mt-44 px-7 font-serif flex flex-col gap-5">
			{/* top */}
			<div className="flex justify-between items-center p-3">
				<h1 className="text-3xl font-semibold">Orders</h1>
			</div>

			{/* bottom */}
			{isOrderLoading ? (
				"Loading..."
			) : orderError ? (
				"Error"
			) : (
				<table className=" border-separate border-spacing-1 text-center pb-10">
					<thead className="text-xl font-semibold">
						<tr>
							<td>Image</td>
							<td>Title</td>
							<td>Price</td>
							{<td>{currentUser.isSeller ? "Buyer" : "Seller"}</td>}
							<td>Contact</td>
						</tr>
					</thead>

					<tbody>
						{orderData?.map((order) => (
							<tr key={order?._id} className=" bg-green-100">
								<td>
									<img
										className="w-20 h-20 mx-auto p-1"
										src={order?.img}
										alt=""
									/>
								</td>
								<td>{order?.title}</td>
								<td>${order?.price}</td>
								{/* <td>{dataUser?.username}</td> */}
								<td>
									<ImMail
										className="w-10 h-7 mx-auto text-blue-500 cursor-pointer"
										onClick={() => handleContact(order)}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}

export default OrderPage;
