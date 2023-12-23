import React, { useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { ImFilePicture } from "react-icons/im";

function AddPostPage() {
  const [sFile, setSFile] = useState();
  const [mFile, setMFile] = useState([]);
  const [title, setTitle] = useState("");
  const [serviceTitle, setServiceTitle] = useState("");
  const [revision, setRevision] = useState(0);
  const [price, setprice] = useState(1);
  const [category, setCategory] = useState("");
  const [delivery, setdelivery] = useState(1);
  const [personalDesc, setpersonalDesc] = useState("");
  const [serviceDesc, setserviceDesc] = useState("");

  // console.log(sFile);

  const multiImg = (e) => {
    let arr = [];

    [...e.target.files].forEach((f) => arr.push(f));

    // console.log(arr);
    setMFile(arr);
  };

  const deleteImg = (index) => {
    let newMFile = mFile.filter((item, i) => i !== index);

    // console.log(newMFile);

    setMFile(newMFile);
  };

  // console.log(mFile);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-7xl text-gray-400  mx-auto mt-44 px-7 font-serif flex flex-col gap-5">
      {/* top */}
      <div className="flex justify-between items-center p-3">
        <h1 className="text-3xl ">Add New Gig</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex  flex-col-reverse md:grid grid-cols-2 w-full p-3 gap-6"
      >
        {/* left */}
        <div className="flex flex-col gap-4 flex-grow">
          <label className="text-xl">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            autoFocus
            className="p-3 outline-none border rounded-lg text-black shadow-sm focus-within:shadow-lg"
            placeholder="e.g. I will do something I'm really good at.. "
          />

          <label className="text-xl  hidden md:inline">Service Title</label>
          <input
            value={serviceTitle}
            onChange={(e) => setServiceTitle(e.target.value)}
            type="text"
            className="p-3 hidden md:inline outline-none border rounded-lg text-black shadow-sm focus-within:shadow-lg"
            placeholder="e.g. One-page web design "
          />

          <label className="text-xl ">Category</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 outline-none border rounded-lg text-black shadow-sm focus-within:shadow-lg"
          >
            <option value="design">Design</option>
            <option value="web">Web Development</option>
            <option value="animation">Animation</option>
            <option value="music">Music</option>
          </select>

          <label className="text-xl">Cover Image</label>
          <input
            type="file"
            id="singlefile"
            hidden
            onChange={(e) => setSFile(e.target.files[0])}
          />
          {sFile ? (
            <img
              onClick={() => setSFile()}
              src={URL.createObjectURL(sFile)}
              alt=""
              className="w-[100px] hover:shadow-lg cursor-pointer rounded-lg shadow-md h-[100px] object-cover"
            />
          ) : (
            <label
              htmlFor="singlefile"
              className="w-[100px] flex items-center justify-center hover:shadow-lg h-[100px] rounded-lg shadow-md cursor-pointer bg-gray-100"
            >
              <AiOutlinePicture className="w-6 h-6 text-gray-500" />
            </label>
          )}

          <label className="text-xl">Upload Images</label>
          <input
            onChange={(e) => multiImg(e)}
            type="file"
            id="multifile"
            multiple
            hidden
          />

          <div className="w-full flex flex-wrap items-center gap-3 ">
            {mFile?.length > 0 &&
              mFile?.map((file, index) => (
                <div
                  onClick={() => deleteImg(index)}
                  key={index}
                  className="flex  items-center gap-5 hover:shadow-lg  rounded-lg shadow-md cursor-pointer"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt=""
                    className="w-[100px] rounded-lg shadow-md h-[100px] object-cover"
                  />
                </div>
              ))}
            <label
              htmlFor="multifile"
              className="flex items-center p-2 justify-center w-[100px] h-[100px] bg-gray-100 hover:shadow-lg  rounded-lg shadow-md cursor-pointer"
            >
              <ImFilePicture className="w-6 h-6 text-gray-500" />
            </label>
          </div>

          <label className="text-xl">Description</label>
          <textarea
            value={personalDesc}
            onChange={(e) => setpersonalDesc(e.target.value)}
            name=""
            id=""
            placeholder="Brief descriptions to introduce your service to customers"
            className="p-4 outline-none border rounded-lg text-black shadow-sm focus-within:shadow-lg"
            rows={4}
          />
          <button
            type="submit"
            className="py-3 bg-green-400 text-white rounded-lg shadow-md hover:bg-green-500"
          >
            Create
          </button>
        </div>
        {/* right */}
        <div className="flex flex-col gap-4">
          <label className="text-xl md:hidden">Service Title</label>
          <input
            value={serviceTitle}
            onChange={(e) => setServiceTitle(e.target.value)}
            type="text"
            className="p-3 md:hidden outline-none border rounded-lg text-black shadow-sm focus-within:shadow-lg"
            placeholder="e.g. One-page web design "
          />

          <label className="text-xl">Short Description</label>
          <textarea
            value={serviceDesc}
            onChange={(e) => setserviceDesc(e.target.value)}
            name=""
            id=""
            placeholder="Short description of your service"
            className="p-3 outline-none border rounded-lg text-black shadow-sm focus-within:shadow-lg"
            rows={8}
          />

          <label className="text-xl">Delivery Time (e.g. 3 days)</label>
          <input
            type="number"
            min={0}
            className="p-3 outline-none border rounded-lg text-black shadow-sm focus-within:shadow-lg"
          />

          <label className="text-xl">Revision Number</label>
          <input
            onChange={(e) => setRevision(e.target.value)}
            type="number"
            min={0}
            className="p-3 outline-none border rounded-lg text-black shadow-sm focus-within:shadow-lg"
          />

          <label className="text-xl">Add Features</label>
          <input
            type="text"
            className="p-3 outline-none border rounded-lg text-black shadow-sm focus-within:shadow-lg"
            placeholder="e.g. page design"
          />
          <input
            type="text"
            className="p-3 outline-none border rounded-lg text-black shadow-sm focus-within:shadow-lg"
            placeholder="e.g. file uploading"
          />
          <input
            type="text"
            className="p-3 outline-none border rounded-lg text-black shadow-sm focus-within:shadow-lg"
            placeholder="e.g. setting up a domain"
          />
          <input
            type="text"
            className="p-3 outline-none border rounded-lg text-black shadow-sm focus-within:shadow-lg"
            placeholder="e.g. hosting"
          />

          <label className="text-xl">Price</label>
          <input
            onChange={(e) => setprice(e.target.value)}
            min={0}
            type="number"
            className="p-3 outline-none border rounded-lg text-black shadow-sm focus-within:shadow-lg"
          />
        </div>
      </form>
    </div>
  );
}

export default AddPostPage;
