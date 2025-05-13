import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyInfo, postLogout } from "../apis/auth";  
import type { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";

const MyPage = () => {
  const { user, setUser } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(user);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        console.log("User Info:", response);
        setData(response);
        setUser(response);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    getData();
  }, [setUser]);

  const handleLogout = async () => {
    try {
      await postLogout();
      setUser(null);
      navigate("/");
      alert("로그아웃 되었습니다.");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      {data ? (
        <div>
          <h1>{data.name}님 환영합니다.</h1>
          <img
            src={data.avatar ?? ""}
            alt="구글 프로필"
            className="w-20 h-20 rounded-full"
          />
          <h2>{data.email}</h2>
          <button
            className="cursor-pointer bg-blue-300 rounded-sm p-5 hover:scale-90"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MyPage;
