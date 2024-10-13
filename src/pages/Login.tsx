import { useEffect, useState } from "react";
import plate from "../assets/dinner.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import { validateEmail, validatePassword } from "../utils/authFormChecks";
import axios from "axios";
import { Loader } from "../components/Loader";
import { useAuth } from "../hooks/useAuth";
const LoginPage = () => {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("priya");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { setAuthData } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLoading(true);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    if (emailError) {
      setEmailError(emailError);
      return;
    }
    if (passwordError) {
      setPasswordError(passwordError);
      return;
    }
    try {
      const response = await axios.post(
        "https://pinata-backend.onrender.com/auth/login",
        {
          email,
          password,
        }
      );
      toast.success(response.data.message);
      const expirationTime = new Date().getTime() + 60 * 60 * 1000;
      setAuthData(response.data.token, response.data.userId, expirationTime);
      setEmail("");
      setPassword("");
      setLoading(false);
      navigate("/home");
    } catch (error: unknown) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  useEffect(() => {
    const elements = document.querySelectorAll(".growAnimate");
    elements.forEach((element) => {
      element.classList.add("growAnimate");
    });
  }, []);
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen animate-customAnimatePulse growAnimate">
      <div className="flex flex-col items-center justify-center w-[50%] gap-8">
        <div className="flex justify-center items-center w-full gap-4">
          <img src={plate} alt="plate" className="w-[100px] h-[100px]" />
          <h1 className="text-white text-2xl font-bold">Pinata Pockets</h1>
        </div>
        <form className="flex flex-col items-center gap-6 w-full ">
          <div className="flex flex-col items-center gap-2 w-full">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              value={email}
              type="email"
              id="email"
              name="email"
              required
              className={`h-[50px] w-[50%] p-4 rounded-md ${
                emailError ? "border-red-500" : ""
              }`}
              placeholder="Type Email ID"
              onChange={(e) => {
                setEmailError("");
                setEmail(e.target.value);
              }}
            />
            {emailError && (
              <span className="text-red-500 text-sm font-bold">
                {emailError}
              </span>
            )}
          </div>
          <div className="flex flex-col items-center gap-2 w-full ">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              value={password}
              type="password"
              id="password"
              name="password"
              className={`h-[50px] w-[50%] p-4 rounded-md ${
                passwordError ? "border-red-500" : ""
              }`}
              placeholder="Type Password"
              onChange={(e) => {
                setPasswordError("");
                setPassword(e.target.value);
              }}
            />
            {passwordError && (
              <span className="text-red-500 text-sm font-bold">
                {passwordError}
              </span>
            )}
          </div>
          <button
            type="submit"
            onClick={(e) => onSubmit(e)}
            className={`h-[50px] w-[50%] bg-[#ff2100] text-white text-xl rounded-md font-bold flex justify-center items-center text-center ${
              loading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {loading ? <Loader /> : "Login"}
          </button>
          <div className="flex gap-2 text-white text-2xl font-bold">
            <span>Don't have an account?</span>
            <span>
              <Link to="/signup">Register</Link>
            </span>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

// export const Login = memo(LoginPage);
export const Login = LoginPage;
