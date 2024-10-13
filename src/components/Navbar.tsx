import { FC, useEffect, useState } from "react";
import { CgMenuRound } from "react-icons/cg";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoFastFood } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { Rating } from "./Rating";
import { useAuth } from "../hooks/useAuth";
export type userData = {
  name?: string;
  email?: string;
  rating?: number;
};
interface ExpandedNavbarProps {
  onClose: () => void;
  isOpen: boolean;
  user: userData;
}
const ExpandedNavbarComponent: FC<ExpandedNavbarProps> = ({
  onClose,
  isOpen,
  user: { name, rating },
}) => {
  const { setAuthData, token } = useAuth();
  const handleLogout = () => {
    setAuthData(null, null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authId");
    localStorage.removeItem("authTokenExpiration");

    onClose();
  };
  return (
    <div
      className={`fixed inset-0 z-10 bg-black transition-opacity duration-300 ${
        isOpen ? "bg-opacity-50" : "bg-opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`absolute top-0 right-0 bg-white w-96 h-96 flex flex-col justify-center items-center rounded-bl-full transform transition-transform duration-300 z-20  ${
          isOpen
            ? "scale-100 translate-x-0 bg-opacity-100"
            : "scale-5 translate-x-[100%] bg-opacity-50"
        } `}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
          aria-label="Close Menu"
        >
          <IoIosCloseCircleOutline size={32} />
        </button>
        <div className="flex flex-col ml-20  items-center gap-4">
          <div className=" border-2 border-solid border-black rounded-full shadow-inner w-[2.5rem] h-[2.5rem] flex items-center justify-center bg-[#fdd901]">
            <h1 className="text-black text-lg font-semibold uppercase r">
              {name?.substring(0, 2)}
            </h1>
          </div>
          <ul className="flex flex-col items-center gap-2 text-center text-lg font-semibold ">
            <Rating rating={rating} />
            <li className="hover:text-blue-500 cursor-pointer">
              <Link to="add-recipe">Add Recipe</Link>
            </li>
            <li className="hover:text-blue-500 cursor-pointer">
              <Link to="my-recipe">My Recipes</Link>
            </li>
            {token && (
              <li
                className="hover:text-blue-500 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
const NavbarComponent: FC<userData> = ({ email, name, rating }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setIsExpanded(false);
  }, [location]);
  const handleExpand = () => {
    setTimeout(() => {
      setIsExpanded(!isExpanded);
    }, 300);
  };
  const handleClose = () => {
    setTimeout(() => {
      setIsExpanded(false);
    }, 300);
  };

  return (
    <nav className="max-h-[200px] h-[100px] flex items-center justify-between p-6">
      <div className="cursor-pointer">
        <Link to="/home">
          <IoFastFood size={50} color="black" />
        </Link>
      </div>
      <div>
        <div onClick={handleExpand}>
          <CgMenuRound size={50} />
        </div>

        <ExpandedNavbarComponent
          onClose={handleClose}
          isOpen={isExpanded}
          user={{
            email,
            name,
            rating,
          }}
        />
      </div>
    </nav>
  );
};

// export const Navbar =         (NavbarComponent);
export const Navbar = NavbarComponent;
