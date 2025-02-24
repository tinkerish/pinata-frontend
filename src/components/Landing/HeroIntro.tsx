import { Link } from "react-router-dom";
import food from "../../assets/coffee.png";
import { IoIosArrowForward } from "react-icons/io";
import "../../styles/hero.css";

const HeroIntro = () => {
  return (
    <div className="polygon-shape text-[#efead5] pb-0 max-xlg:py-20 max-2xl:pb-10">
      <div className="w-full flex px-24 max-md:flex-col-reverse items-center max-md:gap-4 max-md:px-14">
        <div className="w-[50%] flex flex-col gap-14 max-md:w-full max-md:text-center">
          <div>
            <h1 className="font-garamond text-[10rem] leading-none font-black max-[1815px]:text-[8rem] max-2xl:text-[6rem]  max-lg:text-[5rem] max-xlg:text-[4rem] max-sm:text-[3rem]">
              Follow Your Taste
            </h1>
            <p className="text-4xl font-extrabold font-itim max-xxl:text-3xl max-lg:text-2xl max-xxsm:text-xl">
              Activate your afternoon with something delicious.
            </p>
          </div>
          <div className="flex gap-8 items-center text-4xl font-itim max-xxl:text-3xl max-lg:text-2xl max-xlg:text-xl max-md:justify-center ">
            <button className="rounded-full bg-[#ffcb31] p-5 text-black max-xxsm:p-3 max-xxxsm:text-xs">
              Order on Wolt
            </button>
            <Link
              to="/home/add-recipe"
              className="flex items-center gap-2 font-bold"
            >
              <span className="">Locations</span>
              <IoIosArrowForward />
            </Link>
          </div>
        </div>
        <div className="w-[50%] flex justify-end py-8 max-md:w-full max-md:justify-center max-md:py-0">
          <img src={food} alt="" className="floating-image w-[80%]" />
        </div>
      </div>
    </div>
  );
};

export default HeroIntro;
