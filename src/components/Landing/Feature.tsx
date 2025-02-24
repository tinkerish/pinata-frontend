import "../../styles/feature.css";
import { useEffect } from "react";

const foods = [
  { name: "apple", img: "feauture-foods/apple-cream.svg" },
  { name: "banana", img: "feauture-foods/banana-cream.svg" },
  { name: "lemon", img: "feauture-foods/lemon-cream.svg" },
  { name: "strawberry", img: "feauture-foods/strawberry-cream.svg" },
  { name: "circle", img: "feauture-foods/circle-cream.png" },
  { name: "cherry", img: "feauture-foods/cherries-cream.svg" },
  { name: "kiwi", img: "feauture-foods/half-kivi-cream.svg" },
  { name: "apple", img: "feauture-foods/apple-cream.svg" },
  { name: "orange", img: "feauture-foods/orange-cream.svg" },
  { name: "kiwi", img: "feauture-foods/half-kivi-cream.svg" },
  { name: "lemon", img: "feauture-foods/lemon-cream.svg" },
];
const randomFoods = [
  { name: "circle", img: "feauture-foods/circle-cream.png" },
  { name: "orange", img: "feauture-foods/orange-cream.svg" },
  { name: "cherry", img: "feauture-foods/cherries-cream.svg" },
  { name: "lemon", img: "feauture-foods/lemon-cream.svg" },
  { name: "pear", img: "feauture-foods/half-pear-cream.svg" },
  { name: "kiwi", img: "feauture-foods/half-kivi-cream.svg" },
  { name: "watermelon", img: "feauture-foods/watermelon-cream.svg" },
  { name: "banana", img: "feauture-foods/banana-cream.svg" },
];

const Feature = () => {
  useEffect(() => {
    const featureFoodsSpan =
      document.querySelectorAll<HTMLElement>(".feature-food span");
    const featureFoods =
      document.querySelectorAll<HTMLElement>(".feature-food");
    featureFoods.forEach((food) => {
      const yOffset = food.getAttribute("data-y-offset");
      console.log(yOffset);
      food.style.setProperty("--y-offset", yOffset);
    });
    featureFoodsSpan.forEach((food) => {
      const imageUrl = food.getAttribute("data-image");
      const widthOffset = food.getAttribute("data-width-offset");
      const rotationOffset = food.getAttribute("data-rotation-offset");
      food.style.setProperty("--image", imageUrl);
      food.style.setProperty("--width-offset", widthOffset);
      food.style.setProperty("--rotation", rotationOffset);
    });
  }, []);
  const handleClick = (index: number) => {
    const randomIndexExceptPrevOrNext = generateRandomIndex();
    const nodeList = document.getElementById("feature-irregular-shape");
    if (nodeList) {
      const indexNode = nodeList.childNodes[index].childNodes[0] as HTMLElement;
      indexNode.style.setProperty("--custom-transform", "scale(0)");
      setTimeout(() => {
        indexNode.style.setProperty(
          "--image",
          `url(${randomFoods[randomIndexExceptPrevOrNext].img})`
        );
        indexNode.style.setProperty("--custom-transform", "scale(1)");
      }, 400);
    }
  };
  const generateRandomIndex = () => {
    const randomIndex = Math.floor(Math.random() * randomFoods.length);
    return randomIndex;
  };
  return (
    <div className="relative py-36 text-center feature-content-irregular-shape mt-[9rem]">
      <div
        className="feature-irregular-shape flex flex-wrap justify-between overflow-hidden p-12 absolute w-full h-full top-0 left-0"
        id="feature-irregular-shape"
      >
        {foods.map((food, index) => {
          return (
            <div
              className="feature-food relative z-10"
              data-y-offset={-1 + Math.random() * 2}
            >
              <span
                data-image={`url(${food.img})`}
                onMouseOver={() => handleClick(index)}
                data-width-offset={Math.random() + 1.5}
                data-rotation-offset={-15 + Math.random() * 31}
              ></span>
            </div>
          );
        })}
      </div>
      <div className=" relative max-w-[80%] mx-auto text-[#3f9097] pointer-events-none">
        <div className=" flex flex-col gap-8 items-center">
          <h3 className="text-9xl font-garamond font-black max-xlg:text-6xl max-sm:text-4xl">
            Discover Our Story
          </h3>
          <div>
            <p className="font-itim text-3xl font-bold max-xlg:text-2xl max-sm:text-xl">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam
              possimus eveniet, distinctio sed nesciunt voluptatum nulla labore
              nisi cumque?
            </p>
          </div>
          <a
            href=""
            className="rounded-full bg-[#ffcb31] p-5 text-black max-xxsm:p-3 max-xxxsm:text-xs w-fit text-3xl font-semibold max-xlg:text-2xl max-sm:text-xl"
          >
            Explore Our Journey
          </a>
        </div>
      </div>
    </div>
  );
};

export default Feature;
