import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col">
      <nav className="bg-white px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold">
          <Link to="/">로고</Link>
        </div>
        <ul className="flex space-x-6 text-gray-700">
          <li>
            <Link to="/login" className="hover:text-purple-500">
              로그인
            </Link>
          </li>
          <li>
            <Link to="/signup" className="hover:text-purple-500">
              회원가입
            </Link>
          </li>
        </ul>
      </nav>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};

export default HomeLayout;