import React from "react";
import { Link } from "react-router-dom";
import { Movie } from "../types/movie";

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  return (
    <Link to={`/movies/${movie.id}`} className="block">
      <div className="relative cursor-pointer overflow-hidden rounded-xl">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title} 포스터`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm">
          {movie.title}
        </div>
      </div>
    </Link>
  );
}
