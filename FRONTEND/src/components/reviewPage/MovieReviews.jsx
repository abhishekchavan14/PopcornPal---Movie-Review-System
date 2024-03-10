import React, { useEffect, useState } from "react";
import RatingStar from "./RatingStar";
import { Link, useParams } from "react-router-dom";
import { getReviewsByMovie } from "../../api/review";
import { useNotification } from "../../hooks";
import { getSingleMovie } from "../../api/movie";

const getNameInitial = (name = "") => {
  return name[0].toUpperCase();
};
export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const [movie, setMovie] = useState({});

  const { movieId } = useParams();
  const { updateNotification } = useNotification();

  const fetchReviews = async () => {
    const { reviews, error } = await getReviewsByMovie(movieId);
    if (error) updateNotification("error", error);
    setReviews([...reviews]);
  };
  const fetchMovie = async () => {
    const { error, movie } = await getSingleMovie(movieId);
    if (error) updateNotification("error", error);

    setMovie(movie);
  };
  useEffect(() => {
    if (movieId) {
      fetchReviews();
      fetchMovie();
    }
  }, [movieId]);
  return (
    <div className="w-full h-full flex justify-center items-center text-white">
      <div className="md:w-[80%] mt-4">
        <div className="flex justify-between items-center">
          <h1 className="text-lg md:text-2xl px-2 md:px-4">
            <span>Reviews for: </span>
            <span className="text-primary-red">{movie.title}</span>
          </h1>
          <RatingStar rating={movie.reviews?.ratingAverage} className="text-[100%]" />
        </div>
        <div className="space-y-3">
          {reviews.map((r) => {
            return <ReviewCard review={r} key={r.id} />;
          })}
        </div>
      </div>
    </div>
  );
}
const ReviewCard = ({ review }) => {
  const { owner, content, rating } = review;
  return (
    <div className="border-b border-primary-red my-5 p-4">
      <div className="flex">
        <div className="border border-primary-red rounded-full w-10 h-10 flex justify-center items-center text-xl ">
          {getNameInitial(owner.username)}
        </div>
        <div className="flex items-center">
          <h1 className="ml-2">{owner.username}</h1>
          <RatingStar rating={rating} className=" text-[100%]" />
        </div>
      </div>
      <p className="text-sm text-dark-subtle mt-2 ">{content}</p>
    </div>
  );
};
