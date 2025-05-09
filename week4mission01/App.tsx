import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import MoviesPage from "./pages/MoviesPage";
import MovieDetailPage from "./pages/MovieDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MoviesPage category="popular" />} />
        <Route path="/movies/popular" element={<MoviesPage category="popular" />} />
        <Route path="/movies/upcoming" element={<MoviesPage category="upcoming" />} />
        <Route path="/movies/top-rated" element={<MoviesPage category="top_rated" />} />
        <Route path="/movies/now_playing" element={<MoviesPage category="now_playing" />} />
        <Route path="/movies/:movieId" element={<MovieDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
