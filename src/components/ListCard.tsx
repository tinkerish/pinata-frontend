import { FC, useState } from "react";
import veg from "../assets/veg.png";
import nonVeg from "../assets/non-veg.png";
import "./listCard.css";
import { useLocation } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { ActionMenu } from "./ActionMenu";
export interface ListCardProps {
  name: string;
  description: string;
  image: string;
  ratings: number;
  averageRating: number;
  owner: string;
  cookTime: string;
  difficulty: string;
  dietType: string;
  video: string;
  servings: number;
  recipe: string;
  ingredients: string[];
  _id: string;
  ownerName: string;
}
interface ListCardProp {
  isEditOrDeleteAllowed: boolean;
  editHandler?: (id: string) => void;
  deleteHandler?: (id: string) => void;
  viewDetailsHandler: (id: string) => void;
  foodItem: ListCardProps;
}
const ListCardComponent: FC<ListCardProp> = ({
  foodItem,
  isEditOrDeleteAllowed,
  editHandler,
  deleteHandler,
  viewDetailsHandler,
}) => {
  const {
    cookTime,
    dietType,
    difficulty,
    image,
    name,
    ownerName,
    averageRating,
    _id,
    servings,
  } = foodItem;
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className=" bg-white duration-[1s] rounded-lg customShadow p-1">
      <div className="p-4 flex items-center gap-4">
        <div className="w-[10%] shadow-2xl">
          <img src={image} alt={name} className="w-full rounded-lg" />
        </div>
        <div className="flex flex-col w-[87%] p-4  gap-2">
          <div className="">
            <h2 className="font-extrabold text-2xl capitalize">{name}</h2>
          </div>
          <div className="flex justify-between mb-2">
            {pathname === "/home" && <p>{ownerName}</p>}
            <p className="text-lg">{cookTime} min</p>
            <p className="text-lg">{difficulty}</p>
            <p className="text-lg">{servings} ser</p>
          </div>
          <div className="flex gap-4 justify-between items-center">
            <div className="flex items-center ">
              <div className="ratings">
                <div className="empty-stars"></div>
                <div
                  className="full-stars"
                  style={{ width: `${(averageRating / 5) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {dietType === "Vegetarian" ? (
                <img src={veg} alt="veg" className="w-10" />
              ) : (
                <img src={nonVeg} alt="nonVeg" className="w-10" />
              )}
              <div className="action relative">
                <div className="flex justify-end">
                  <button
                    className="border-2 border-solid border-black  p-1 rounded-full"
                    onClick={handleOpenMenu}
                  >
                    <BsThreeDots size={20} />
                  </button>
                </div>
                <ActionMenu
                  isOpen={isOpen}
                  isEditOrDeleteAllowed={isEditOrDeleteAllowed}
                  editHandler={editHandler}
                  deleteHandler={deleteHandler}
                  viewDetailsHandler={viewDetailsHandler}
                  id={_id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export const ListCard =         (ListCardComponent);
export const ListCard = ListCardComponent;
