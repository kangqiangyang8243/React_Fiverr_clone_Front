import React, { useState } from "react";
import { ImMail } from "react-icons/im";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
function MessagesPage() {
  const [read, setRead] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("react_fiverr"));
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      return await axios
        .get(`/conversation/`, {
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        });
    },
  });

  // console.log(data);

  const mutation = useMutation({
    mutationFn: async (id) => {
      return await axios
        .put(`/conversation/${id}`, null, {
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
      setRead(true);
    },
    onError: (err) => {
      alert(err.response.data);
    },
  });

  const handleRead = (id) => {
    // setRead(true);
    mutation.mutate(id);
  };
  return (
    <div className="max-w-7xl mx-auto mt-44 px-7 font-serif flex flex-col gap-5">
      {/* top */}
      <div className="flex justify-between items-center p-3">
        <h1 className="text-3xl font-semibold">Messages</h1>
      </div>

      {/* bottom */}
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Error"
      ) : (
        <table className=" border-separate border-spacing-1  pb-10">
          <thead className="text-xl font-semibold text-center">
            <tr>
              {<td>{currentUser.isSeller ? "Buyer" : "Seller"}</td>}
              <td>Last Message</td>
              <td>Date</td>
              <td>Action</td>
            </tr>
          </thead>

          {data?.map((conversation) => (
            <tbody key={conversation?.id}>
              <tr
                className={`  h-[70px] text-center ${
                  ((currentUser.isSeller && !conversation?.readBySeller) ||
                    (!currentUser.isSeller && !conversation?.readByBuyer)) &&
                  `bg-green-100`
                }`}
              >
                <td>
                  {currentUser.isSeller
                    ? conversation?.buyerId
                    : conversation?.sellerId}
                </td>
                <td>
                  <Link to={`/message/${conversation?.id}`}>
                    {conversation?.lastMessage
                      ? conversation?.lastMessage?.substring(0, 100)
                      : "No New Message.."}
                  </Link>
                </td>
                <td>{moment(conversation?.updatedAt).fromNow()}</td>
                <td className="text-center">
                  <button
                    onClick={() => handleRead(conversation?.id)}
                    className="p-2 bg-green-400 text-white text-lg"
                  >
                    Mark as Read
                  </button>{" "}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      )}
    </div>
  );
}

export default MessagesPage;
