import React, { useState } from "react";
import { PiPopcorn, PiPopcornFill } from "react-icons/pi";

export default function AddRatingModal({ onSubmit }) {
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [content, setContent] = useState("");
  const ratingPopcornArray = new Array(10).fill("");
  const handleMouseEnter = (index) => {
    const ratingPopcornArray = new Array(index + 1).fill(index);
    setSelectedRatings([...ratingPopcornArray]);
  };

  const handleContentChange = ({ target }) => {
    setContent(target.value);
  };

  const handleSubmit = () => {
    if (!selectedRatings.length) return;
    const data = {
      rating: selectedRatings.length,
      content,
    };
    onSubmit(data);
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex p-2 my-10 relative">
        {ratingPopcornArray.map((_, index) => {
          return (
            <PiPopcorn
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              className="text-white cursor-pointer text-2xl md:text-4xl"
            />
          );
        })}
        <div className="flex absolute">
          {selectedRatings.map((_, index) => {
            return (
              <PiPopcornFill
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                className="text-golden cursor-pointer text-2xl md:text-4xl"
              />
            );
          })}
        </div>
      </div>

      <textarea
        value={content}
        onChange={handleContentChange}
        className="h-24 w-full p-2 border-2 border-dark-subtle outline-none resize-none text-white rounded-md indent-1 bg-transparent hover:border-primary-red transition duration-300"
        placeholder="What do you think about this movie?"
      ></textarea>
      <button
        onClick={handleSubmit}
        className="border border-green text-white px-4 py-2 self-center hover:bg-green hover:text-black transition duration-300 cursor-pointer my-5"
      >
        Submit
      </button>
    </div>
  );
}
