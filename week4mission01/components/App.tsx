import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MoviePage from '../pages/pages/MoviesPage'; // 기존 목록 페이지
import MovieDetailPage from '../week3mission/pages/MovieDetailPage'; // 상세 페이지

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MoviePage category="popular" />} />
        <Route path="/movies/popular" element={<MoviePage category="popular" />} />
        <Route path="/movies/upcoming" element={<MoviePage category="upcoming" />} />
        <Route path="/movies/top-rated" element={<MoviePage category="top_rated" />} />
        <Route path="/movies/now_playing" element={<MoviePage category="now_playing" />} />
        <Route path="/movies/:movieId" element={<MovieDetailPage />} /> {/* 상세 */}
      </Route>
    </Routes>
  );
}

export default App;
