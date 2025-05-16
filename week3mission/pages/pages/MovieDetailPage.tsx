import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MovieDetail, Credit } from '../types/movie';
import Spinner from '../components/Spinner';

export default function MovieDetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<Credit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError('');
      try {
        const [movieRes, creditRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`, {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`, {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }),
        ]);
        setMovie(movieRes.data);
        setCredits(creditRes.data.cast.slice(0, 10));
      } catch (err) {
        setError('상세 정보를 불러오는 데 실패했어요.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!movie) return null;

  return (
    <div className="p-4">
      <div className="relative mb-6">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt="backdrop"
          className="w-full h-60 object-cover rounded-lg"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 rounded-b-lg">
          <h2 className="text-2xl font-bold">{movie.title}</h2>
          <p className="text-sm">평균 평점: {movie.vote_average} / 개봉: {movie.release_date}</p>
        </div>
      </div>

      <p className="mb-6 text-gray-700">{movie.overview}</p>

      <h3 className="text-xl font-semibold mb-2">출연진</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {credits.map((person) => (
          <div key={person.id} className="text-center">
            <img
              src={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                  : 'https://via.placeholder.com/200x300?text=No+Image'
              }
              alt={person.name}
              className="w-full h-36 object-cover rounded"
            />
            <p className="text-sm mt-1 font-semibold">{person.name}</p>
            <p className="text-xs text-gray-500">{person.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
