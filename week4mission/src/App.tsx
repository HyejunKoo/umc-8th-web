import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

// 페이지 컴포넌트 임포트
import HomePage from "./pages/HomePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignUpPage1 from "./pages/SignUpPage1.tsx";
import SignUpPage2 from "./pages/SignUpPage2.tsx";
import SignUpPage3 from "./pages/SignUpPage3.tsx";
import HomeLayout from "./layouts/HomeLayout.tsx";


//1. 홈페이지
//2. 로그인 페이지
//3. 회원가입 페이지
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUpPage1 /> },
      { path: "signup2", element: <SignUpPage2 /> },
      { path: "signup3", element: <SignUpPage3 /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;