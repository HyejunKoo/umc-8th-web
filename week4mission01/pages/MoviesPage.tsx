import React, { useState } from "react";
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import useCustomFetch from "../hooks/useCustomFetch";
import { Movie } from "../types/movie";

interface MoviePageProps {
  category: "popular" | "upcoming" | "top_rated" | "now_playing";
}

export default function MoviesPage({ category }: MoviePageProps) {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useCustomFetch<{ results: Movie[] }>(
    `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`
  );

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data?.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}
