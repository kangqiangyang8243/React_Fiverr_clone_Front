import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import GigCard from "../components/GigCard";
import { gigs } from "../data";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
function CategoryPage() {
  const [sort, setSort] = useState("createdAt");

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const cat = query.get("cat")?.replace("_", " ") || null;

  const searchInput = query.get("search");


  // console.log(searchInput)

  const minRef = useRef();
  const maxRef = useRef();

  const { isLoading:isCatPending, error:catError, data, refetch:gigsRefetch } = useQuery({
    queryKey: ["gigs",cat],
    queryFn: async () => {
      return await axios
				.get(
					`/gigs/allGigs?cat=${cat}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`,
					{
						withCredentials: true,
					}
				)
				.then((res) => {
					return res.data;
				});
    },
  });

  
  const { isLoading:isSearchPending, error:searchError, data:searchData, refetch:searchRefetch } = useQuery({
		queryKey: ["gigsSearch", searchInput],
		queryFn: async () => {
			return await axios
				.get(
					`/gigs/allGigs?search=${searchInput}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`,
					{
						withCredentials: true,
					}
				)
				.then((res) => {
					return res.data;
				});
		},
	});

  // console.log(searchData, searchError);

  useEffect(() => {
    if (cat) {
      gigsRefetch();

    } else {
          searchRefetch();

    }
  }, [sort]);

  const apply = (e) => {
    e.preventDefault();
     if (cat) {
				gigsRefetch();
			} else {
				searchRefetch();
			}
  };

  // console.log(data);
  return (
		<div className="max-w-7xl mx-auto mt-44 px-7 font-serif flex flex-col gap-5">
			{/* top */}
			<div className="w-full flex flex-col gap-2 ">
				<h3 className="text-lg text-gray-600">
					Fiverr {">"} {cat == null ? searchInput : cat}
				</h3>

				<h2 className="text-3xl font-bold">
					{" "}
					{cat == null ? searchInput : cat}
				</h2>

				<p className=" text-gray-400 w-full ">
					Explore the boundaries of art and technology with Liverr's{" "}
					{cat == null ? searchInput : cat}
				</p>

				<div className="flex flex-col md:flex-row gap-3 md:justify-between items-start md:items-center text-lg">
					<form
						action=""
						className="flex flex-col md:flex-row md:items-center w-full gap-3">
						<label>Budget</label>
						<input
							ref={minRef}
							type="number"
							placeholder="min"
							className="border rounded-lg p-1 outline-none shadow-sm"
						/>
						<input
							ref={maxRef}
							type="number"
							placeholder="max"
							className="border rounded-lg p-1 outline-none shadow-sm"
						/>
						<button
							onClick={apply}
							className="text-white bg-green-400 px-2 py-1 rounded-lg hover:bg-green-500">
							Apply
						</button>
					</form>

					<div className="flex  items-center gap-1">
						<h3 className="text-gray-500 whitespace-nowrap">sort by</h3>
						<select
							onChange={(e) => setSort(e.target.value)}
							className="border-none outline-none">
							<option value="createdAt">Newest</option>
							<option value="sales">Popular</option>
						</select>
					</div>
				</div>
			</div>

			{/* bottom */}
			{!searchInput ? (
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 my-3">
					{data?.map((gig) => (
						<GigCard key={gig._id} gig={gig} />
					))}
				</div>
			) : (
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 my-3">
					{searchData?.map((gig) => (
						<GigCard key={gig._id} gig={gig} />
					))}
				</div>
			)}
		</div>
	);
}

export default CategoryPage;
