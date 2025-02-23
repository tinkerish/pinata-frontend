import { FC, useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { TbMenu3 } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import greenLogo from "../assets/green-logo.png";
import "../styles/navbar.css";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
export type userData = {
  name?: string;
  email?: string;
  rating?: number;
};
interface ExpandedNavbarProps {
  onAnimationComplete: () => void;
  isOpen: boolean;
}
const ExpandedNavbarComponent: FC<ExpandedNavbarProps> = ({
  isOpen,
  onAnimationComplete,
}) => {
  useEffect(() => {
    const nav = document.querySelector(".nav") as HTMLElement;
    const listItems = document.querySelectorAll(
      ".nav ul li"
    ) as NodeListOf<HTMLElement>;
    const socialLinks = document.querySelectorAll(
      ".nav ul div a"
    ) as NodeListOf<HTMLElement>;
    if (nav) {
      if (isOpen) {
        nav.style.height = "100vh";
        nav.style.padding = "4rem";
        let lastIndex = -1;
        listItems.forEach((item, index) => {
          item.style.transitionDelay = `${index * 0.1}s`;
          item.style.transform = "translateY(0) scaleY(1)";
          item.style.opacity = "1";
          lastIndex = index;
        });
        socialLinks.forEach((link) => {
          link.style.transitionDelay = `${lastIndex * 0.1}s`;
          link.style.scale = "1";
        });
      } else {
        nav.style.height = "0";
        nav.style.padding = "0";
        listItems.forEach((item) => {
          item.style.transitionDelay = "0s";
          item.style.transform = "translateY(100%) scaleY(0)";
        });
        socialLinks.forEach((link) => {
          link.style.transitionDelay = "0s";
          link.style.scale = "0";
        });
      }
    }
  }, [isOpen]);
  useEffect(() => {
    if (!isOpen) {
      const nav = document.querySelector(".nav");
      if (nav) {
        nav.addEventListener("transitionend", onAnimationComplete);
      }
      return () => {
        nav?.removeEventListener("transitionend", onAnimationComplete);
      };
    }
  }, [isOpen, onAnimationComplete]);
  return (
    <div className="nav">
      <div
        className="flex items-center justify-center gap-4 pt-16 opacity-0"
        role="presentation"
      >
        <Link to="/home">
          <img src={logo} alt="Pinnata Logo" className="w-80" />
        </Link>
        <button>
          <TbMenu3 size={60} color="#efead5" />
        </button>
      </div>
      <ul className="flex flex-col items-center font-garamond text-[#50a3ab] text-5xl font-black overflow-y-scroll gap-8 no-scrollbar flex-1 max-md:text-4xl">
        <li>
          <Link to="/home" className="nav-link" data-text="Home">
            Home
          </Link>
        </li>
        <li>
          <Link to="/" className="nav-link" data-text="My Profile">
            My Profile
          </Link>
        </li>
        <li>
          <Link to="/" className="nav-link" data-text="Recipes">
            Recipes
          </Link>
        </li>
        <li>
          <Link to="/" className="nav-link">
            Favorites
          </Link>
        </li>
        <li>
          <Link to="/" className="nav-link">
            Notifications
          </Link>
        </li>
        <li>
          <button>Logout</button>
        </li>
        <div className="flex items-center justify-center gap-8 mt-8">
          <Link to="/" className="nav-link" aria-label="Facebook">
            <FaFacebook />
          </Link>
          <Link to="/" className="nav-link" aria-label="Instagram">
            <FaInstagram />
          </Link>
          <Link to="/" className="nav-link" aria-label="Twitter">
            <FaTwitter />
          </Link>
        </div>
      </ul>
    </div>
  );
};
const NavbarComponent: FC<userData> = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimationEnded, setIsAnimationEnded] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setIsExpanded(false);
  }, [location]);
  const handleExpand = () => {
    if (!isExpanded) {
      setIsAnimationEnded(true);
    }
    setIsExpanded((prev) => !prev);
  };
  const handleAnimationEnd = () => {
    setIsAnimationEnded(false);
  };
  return (
    <nav className="flex items-center justify-between px-24 pt-16 pb-4 nav-background-color max-xsm:px-16 max-xxsm:px-8">
      <div className="cursor-pointer huh flex items-center justify-between w-full relative z-[100]">
        <Link to="/home">
          <img
            src={isAnimationEnded ? greenLogo : logo}
            alt="Pinnata Logo"
            className="w-72 max-md:w-60 flex-shrink-0 max-xxsm:w-48"
          />
        </Link>
        <button
          onClick={handleExpand}
          className={`${isAnimationEnded ? "close-button" : ""}`}
        >
          {isAnimationEnded ? (
            <IoIosClose
              size={60}
              color="#efead5"
              className="max-md:w-12 max-md:h-12 max-xxsm:w-10 max-xxsm:h-10"
            />
          ) : (
            <TbMenu3 size={60} color="#efead5" className="max-md:w-12 max-xxsm:w-10" />
          )}
        </button>
      </div>
      <ExpandedNavbarComponent
        isOpen={isExpanded}
        onAnimationComplete={handleAnimationEnd}
      />
    </nav>
  );
};

export const Navbar = NavbarComponent;
