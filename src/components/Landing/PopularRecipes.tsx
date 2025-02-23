// import { useState } from "react";
import cake from "../../assets/cake.jpg";
import burger from "../../assets/burger.jpg";
import chicken from "../../assets/chicken.jpg";
import egg from "../../assets/egg.jpg";
import pancake from "../../assets/pancake.jpg";
import paneer from "../../assets/paneer.jpg";
import "../../styles/pop_recipes.css";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
const popularRecipes = [
  { id: 1, name: "Burger", image: burger, rating: 4.5, cookTime: "15 min" },
  { id: 2, name: "Cake", image: cake, rating: 4.8, cookTime: "45 min" },
  {
    id: 3,
    name: "Paneer Tikka",
    image: paneer,
    rating: 4.7,
    cookTime: "30 min",
  },
  { id: 4, name: "Egg Curry", image: egg, rating: 4.6, cookTime: "25 min" },
  {
    id: 5,
    name: "Chicken Curry",
    image: chicken,
    rating: 4.9,
    cookTime: "40 min",
  },
  { id: 6, name: "Pancakes", image: pancake, rating: 4.7, cookTime: "20 min" },
];
type DragConstraints = {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
};
const PopularRecipes = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState<
    DragConstraints | undefined
  >(undefined);
  // const []
  useEffect(() => {
    const updateConstraints = () => {
      if (carouselRef.current) {
        const container = carouselRef.current;
        const parentWidth = container!.parentElement!.offsetWidth;
        const scrollWidth = container.scrollWidth;

        setDragConstraints({ left: -(scrollWidth - parentWidth), right: 0 });
      }
    };

    updateConstraints();

    window.addEventListener("resize", updateConstraints);

    return () => {
      window.removeEventListener("resize", updateConstraints);
    };
  }, []);

  return (
    <div className="w-full flex flex-col gap-48 max-xl:gap-48 max-xxl:gap-36 max-xlg:gap-24 max-md:gap-12 max-xsm:gap-8 overflow-hidden mt-[9rem]">
      <div className="flex flex-col gap-4 text-white max-xsm:px-4">
        <h2 className="pl-32 font-garamond text-8xl font-black max-xxl:text-[6xl] max-xxl:pl-16 max-xlg:text-5xl max-sm:text-4xl max-sm:pl-0 max-sm:text-center">
          Browse Most Popular Recipes
        </h2>
        <span className="pl-96 font-itim text-3xl opacity-80 max-xxl:h-[3xl] max-xxl:pl-32 max-xlg:text-2xl max-sm:text-xl max-sm:pl-0 max-sm:text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cumque
        </span>
      </div>

      <motion.div
        className="cursor-grab relative"
        drag="x"
        dragConstraints={dragConstraints}
      >
        <div className="static h-[100px] translate-y-[350%] slider-path w-[10000px] -translate-x-48 max-xl:translate-y-[300%] max-xxl:translate-y-[240%] max-xxsm:translate-y-[180%]"></div>
        <div
          className="flex gap-[30rem] px-[350px] max-xl:gap-[20rem] max-xl:px-[250px]  max-xxl:px-[150px] max-xsm:px-[100px] max-xxl:gap-[10rem] max-sm:gap-[7rem] max-xxsm:gap-[3rem]"
          ref={carouselRef}
        >
          {[...popularRecipes].map((recipe, index) => (
            <div
              key={index}
              className="flex flex-col gap-8 items-center w-[300px] max-sm:gap-4 relative"
            >
              <div className="irregular-wrapper w-[600px] h-[600px] max-xl:w-[500px] max-xl:h-[500px] max-xxl:w-[400px] max-xxl:h-[400px] max-lg:w-[350px] max-lg:h-[350px] max-xxsm:w-[250px] max-xxsm:h-[250px] flex items-center justify-center glowy-wrapper">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-[500px] h-[500px] max-xl:w-[400px] max-xl:h-[400px]  max-xxl:w-[300px] max-xxl:h-[300px] max-lg:w-[250px] max-lg:h-[250px] max-xxsm:w-[150px] max-xxsm:h-[150px] object-cover rounded-full pointer-events-none"
                />
              </div>
              <h3 className="font-semibold font-itim text-5xl max-xlg:text-3xl max-sm:text-2xl text-white">
                {recipe.name}
              </h3>
              <p className="font-semibold font-itim text-3xl max-xlg:text-2xl max-sm:text-xl text-white">
                ⭐ {recipe.rating}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PopularRecipes;
