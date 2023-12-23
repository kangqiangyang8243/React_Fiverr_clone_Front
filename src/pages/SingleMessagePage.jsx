import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

function SingleMessagePage() {
  const { messageId } = useParams();
  const [msgs, setMsgs] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("react_fiverr"));
  const queryClient = useQueryClient();

  // console.log(messageId);
  // console.log(msgs);

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      return await axios
        .get(`/message/${messageId}`, {
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        });
    },
  });

  // console.log(data);

  const mutation = useMutation({
    mutationFn: async (newMsg) => {
      return await axios
        .post(`/message/`, newMsg, {
          withCredentials: true,
        })
        .then((res) => {
          setMsgs(null);

          return res.data;
        });
    },
    onSuccess: () => {
      setMsgs("");

      queryClient.invalidateQueries(["messages"]);
    },
    onError: (err) => {
      alert(err.response.data);
    },
  });

  const msgSend = () => {
    // setRead(true);
    mutation.mutate({ conversationId: messageId, message: msgs });
  };
  return (
		<div className="max-w-7xl mx-auto mt-44 px-7 font-serif flex flex-col gap-5">
			<h3 className=" text-gray-500">
				<Link to={"/messages"}>Message</Link> {">"} John Doe
			</h3>

			{/* message container */}
			<div className="flex flex-col gap-10 pb-10 ">
				{/* top */}
				{isLoading ? (
					"Loading..."
				) : error ? (
					"Error"
				) : (
					<div className="flex flex-col  h-[70vh] flex-nowrap  w-full pb-5 px-3 overflow-y-scroll">
						{data?.map((msg) => (
							<div
								key={msg?._id}
								className={`flex  gap-3 ${
									msg?.userId == currentUser._id
										? `flex-row-reverse`
										: `flex-row`
								}`}>
								<img
									src={
										msg?.userId == currentUser._id
											? currentUser.img
											: "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
									}
									alt=""
									className="w-16 h-16 rounded-full"
								/>
								<p
									className={`${
										msg?.userId == currentUser._id
											? `bg-slate-100`
											: `bg-green-100`
									} rounded-lg rounded-tl-none  p-3 mt-5`}>
									{msg?.message}
								</p>
							</div>
						))}
					</div>
				)}

				{/* bottom */}
				<div className="flex items-center gap-5 w-full">
					<input
						type="text"
						className="w-full p-2 border rounded-lg shadow-sm focus-within:shadow-lg outline-none"
						placeholder="Enter your Message.."
						onChange={(e) => setMsgs(e.target.value)}
						value={msgs}
					/>
					<button
						onClick={msgSend}
						className="px-4 py-2 bg-green-400 hover:bg-green-500 text-white rounded-lg shadow-md">
						Send
					</button>
				</div>
			</div>
		</div>
	);
}

export default SingleMessagePage;
