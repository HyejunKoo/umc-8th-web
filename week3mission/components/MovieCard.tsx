import { useState } from 'react';
import { Movie } from '../types/movie';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }: { movie: Movie }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative cursor-pointer overflow-hidden rounded-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${movie.title} 포스터`}
        className="w-full h-full object-cover transition duration-300 ease-in-out"
      />
      {isHovered && (
        <div className="absolute inset-0 backdrop-blur-sm bg-black/60 text-white flex flex-col justify-center items-center p-4 transition-all duration-300">
          <h3 className="text-lg font-bold text-center">{movie.title}</h3>
          <p className="text-sm text-gray-300 text-center mt-2 line-clamp-3">
            {movie.overview}
          </p>
        </div>
      )}
    </div>
  );
}
