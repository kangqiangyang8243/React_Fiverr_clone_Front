import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { AiOutlineComment } from "react-icons/ai";
import SingleGigReviewArea from "./SingleGigReviewArea";

function Reviews({ gigId }) {
  const [commentOpen, setCommentOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    isLoading: isLoadingReview,
    error: errorReview,
    data: dataReview,
  } = useQuery({
    queryKey: ["gig_review",gigId],
    queryFn: async () => {
      return await axios
        .get(`/reviews/${gigId}`, {
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        });
    },
  });

  // console.log(dataReview)

  const mutation = useMutation({
    mutationFn: async (review) => {
      return await axios
        .post("/reviews", review, {
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["gig_review"]);
      setCommentOpen(false);
    },
    onError: (err) => {
      alert(err.response.data);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ desc, star, gigId });
  };
  return (
    <div>
      {isLoadingReview ? (
        "Loading..."
      ) : errorReview ? (
        "Review error"
      ) : (
        <>
          {dataReview?.map((review) => (
            <SingleGigReviewArea review={review} key={review._id} />
          ))}
        </>
      )}

      <button
        onClick={() => setCommentOpen(!commentOpen)}
        className={`flex  items-center gap-2 text-lg font-mono bg-slate-50 p-1 mt-3 rounded-md shadow-sm hover:shadow-md border 
          
        }`}
      >
        <AiOutlineComment />
        Add New Comment
      </button>

      {commentOpen && (
        <div className="flex flex-col p-2 border mt-5 rounded-md max-w-xl">
          <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-2">
            <div className=" space-x-5 flex items-center">
              <input
                className="w-full p-2 outline-none border rounded-md focus-within:shadow-md shadow-sm"
                type="text"
                placeholder="Left Your Comment Here!"
              />
              <select className="border rounded-md p-2">
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-green-400 mt-2 hover:bg-green-300 text-white py-1 rounded-md shadow-sm font-semibold "
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Reviews;
