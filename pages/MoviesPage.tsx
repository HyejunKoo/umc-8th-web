import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
import { Movie } from '../types/movie';

interface MoviePageProps {
  category: 'popular' | 'upcoming' | 'top_rated' | 'now_playing';
}

export default function MoviePage({ category }: MoviePageProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovies(res.data.results);
      } catch (err) {
        setError('데이터를 불러오는 중 에러가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category, page]);

  return (
    <div>
      {loading && <Spinner />}
      {error && <p className="text-red-500 text-center mt-10">{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <Pagination page={page} setPage={setPage} />
        </>
      )}
    </div>
  );
}
