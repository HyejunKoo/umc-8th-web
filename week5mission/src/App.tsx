import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

// 페이지 컴포넌트 임포트
import HomePage from "./pages/HomePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignUpPage1 from "./pages/SignUpPage1.tsx";
import SignUpPage2 from "./pages/SignUpPage2.tsx";
import SignUpPage3 from "./pages/SignUpPage3.tsx";
import MyPage from "./pages/MyPage.tsx";
import HomeLayout from "./layouts/HomeLayout.tsx";
import ProtectedLayout from "./layouts/ProtectedLayout.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

// publicRoutes : 인증 없이 접근 가능한 라우트
const publicRoutes = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup/step1", element: <SignUpPage1 /> },
      { path: "signup/step2", element: <SignUpPage2 /> },
      { path: "signup/step3", element: <SignUpPage3 /> },
    ],
  },
];

// protectedRoutes : 인증이 필요한 라우트
const protectedRoutes = [
  {
    path: "/protected",
    element: <ProtectedLayout />,
    children: [
      { path: "mypage", element: <MyPage /> }, // 예시: 마이페이지
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
