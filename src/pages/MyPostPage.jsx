import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

function MyPostPage() {


  const navigate = useNavigate();

   const currentUser = JSON.parse(localStorage.getItem("react_fiverr"));

  const queryClient = useQueryClient();

  
  const {
		isLoading,
		error,
		data,
		refetch,
	} = useQuery({
		queryKey: ["myGigs",currentUser?._id],
		queryFn: async () => {
			return await axios
				.get(
					`/gigs/allGigs?userId=${currentUser?._id}`,
					{
						withCredentials: true,
					}
				)
				.then((res) => {
					return res.data;
				});
		},
  });

  // console.log(data)

    const mutation = useMutation({
			mutationFn: async(id) => {
				return await axios.delete(`/gigs/${id}`, {
					withCredentials: true,
				});
			},
			onSuccess: () => {
				queryClient.invalidateQueries(["myGigs"]);
			},
		});


  const deleteGig = (id) => {
    mutation.mutate(id);
  }
 
 
  return (
		<div className="max-w-7xl mx-auto mt-44 px-7 font-serif flex flex-col gap-5">
			{/* top */}
			<div className="flex justify-between items-center p-3">
				<h1 className="text-3xl font-semibold">
					{currentUser.isSeller ? "Gigs" : "Orders"}
				</h1>
				{currentUser.isSeller && (
					<Link to="/addpost">
						<button className="p-2 bg-green-400 text-white rounded-lg shadow-md hover:bg-green-500">
							Add New Gig
						</button>
					</Link>
				)}
			</div>

			{/* bottom */}
			<table className=" border-separate border-spacing-1 text-center pb-10">
				<thead className="text-xl font-semibold">
					<tr>
						<td>Image</td>
						<td>Title</td>
						<td>Price</td>
						<td>Sales</td>
						<td>Action</td>
					</tr>
				</thead>
				<tbody>
					{data?.map((data) => (
						<tr key={data?._id} className={` cursor-pointer bg-green-100`}>
							<td
								onClick={() => {
									navigate(`/gig/${data?._id}`);
								}}>
								<img
									className="w-20 h-20 mx-auto p-1"
									src={data?.cover}
									alt=""
								/>
							</td>
							<td>{data?.title}</td>
							<td>{data?.price}</td>
							<td> {data?.sales}</td>
							<td>
								<AiFillDelete
									onClick={() => deleteGig(data?._id)}
									className="w-7 h-7 mx-auto text-red-500 cursor-pointer"
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default MyPostPage;
