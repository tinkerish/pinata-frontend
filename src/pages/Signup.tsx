import { useState } from "react";
import "./login.css";
import plate from "../assets/dinner.png";
import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { validateEmail, validatePassword } from "../utils/authFormChecks";
import axios from "axios";
import { Loader } from "../components/Loader";
const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");

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
    if (name.length === 0) {
      setNameError("Name is required");
      return;
    }
    try {
      const response = await axios.post(
        "https://pinata-backend.onrender.com/auth/signup",
        {
          name,
          email,
          password,
        }
      );
      console.log(response.data);
      // toast.success(response.data.message);
      setEmail("");
      setPassword("");
      setName("");
      setLoading(false);
    } catch (error: unknown) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        // toast.error(error.response?.data?.message || "An error occurred");
      } else {
        // toast.error("An unexpected error occurred");
      }
    }
  };
  // useEffect(() => {
  //   const element = document.getElementById("grow-animate");
  //   console.log(element);

  //   if (element) {
  //     element.classList.remove("growAnimate");
  //     void element.offsetWidth;
  //     element.classList.add("growAnimate");
  //   }
  // }, []);
  return (
    <div
      className="flex flex-col items-center justify-center w-full h-screen animate-customAnimatePulse growAnimate"
      id="gow-animate"
    >
      <div className="flex flex-col items-center justify-center w-[50%] gap-8">
        <div className="flex justify-center items-center w-full gap-4">
          <img src={plate} alt="plate" className="w-[100px] h-[100px]" />
          <h1 className="text-white text-2xl font-bold">Pinata Pockets</h1>
        </div>
        <form className="flex flex-col items-center gap-6 w-full ">
          <div className="flex flex-col items-center gap-2 w-full">
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className={`h-[50px] w-[50%] p-4 rounded-md ${
                emailError ? "border-red-500" : ""
              }`}
              placeholder="Type Your Name"
              onChange={(e) => {
                setNameError("");
                setName(e.target.value);
              }}
            />
            {nameError && (
              <span className="text-red-500 text-sm font-bold">
                {nameError}
              </span>
            )}
          </div>
          <div className="flex flex-col items-center gap-2 w-full">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
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
            {loading ? <Loader /> : "Signup"}
          </button>
          <div className="flex gap-2 text-white text-2xl font-bold">
            <span>Do you already have an account?</span>
            <span>
              <Link to="/">Login</Link>
            </span>
          </div>
        </form>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

// export const Signup = memo(SignupPage);
export const Signup = SignupPage;
