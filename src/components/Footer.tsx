import {} from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 bg-black text-white pt-10">
      <h1 className="text-4xl ">Pinata Pockets</h1>
      <p className="text-xl">Food is life. We live to eat and we work to eat</p>
      <div className="social-media flex gap-4 items-center">
        <Link to="/">
          <FaFacebook size={25} />
        </Link>
        <Link to="/">
          <FaInstagram size={25} />
        </Link>
        <Link to="/">
          <FaLinkedin size={25} />
        </Link>
        <Link to="/">
          <FaTwitter size={25} />
        </Link>
        <Link to="/">
          <FaGithub size={25} />
        </Link>
      </div>
      <p className="mt-8 mb-2">
        Copywright &copy;2024 Pinata Pockets. Design By{" "}
        <span>Priya Pandey</span>
      </p>
    </div>
  );
};

// export const Footer =         (FooterComponent);
export const Footer = FooterComponent;
