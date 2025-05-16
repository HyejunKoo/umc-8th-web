import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'text-purple-600 font-bold' : 'text-gray-600';

  return (
    <div className="p-4">
      <nav className="flex gap-4 border-b pb-2 mb-4 text-sm">
        <NavLink to="/movies/popular" className={linkStyle}>
          인기 영화
        </NavLink>
        <NavLink to="/movies/upcoming" className={linkStyle}>
          개봉 예정
        </NavLink>
        <NavLink to="/movies/top-rated" className={linkStyle}>
          평점 높은
        </NavLink>
        <NavLink to="/movies/now_playing" className={linkStyle}>
          상영 중
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
