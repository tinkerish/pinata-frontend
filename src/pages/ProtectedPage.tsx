import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { FullLoader } from "../components/FullLoader";

const ProtectedPageComponent = () => {
  const { token } = useAuth();
  const [userData, setUserData] = useState<{
    email: string;
    name: string;
    rating: number;
  } | null>(null);
  // useEffect(() => {
  //   if (!token) {
  //     window.location.href = "/";
  //   }
  // }, [token]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       setLoading(true);
  //       const resp = await axios.get(`https://pinata-backend.onrender.com/user/getUser`, {
  //         headers: {
  //           Authorization: `${token}`,
  //         },
  //       });
  //       if (resp.status !== 200) {
  //         setUserData(null);
  //         return;
  //       }

  //       setUserData(resp.data.user);
  //       setLoading(false);
  //     } catch (err) {
  //       setLoading(false);
  //       console.error(err);
  //     }
  //   };
  //   fetchUserData();
  // }, [token]);

  // if (!token) return null;
  // if (loading) return <FullLoader variant="full-screen" />;
  return (
    <main className="min-h-[100vh] flex flex-col justify-between gap-8">
      <Navbar
        email={userData?.email || "priya"}
        name={userData?.name || "priya"}
        rating={userData?.rating || 0}
      />
      <Outlet />
      <Footer />
    </main>
  );
};

// export const ProtectedPage = memo(ProtectedPageComponent);
export const ProtectedPage = ProtectedPageComponent;
