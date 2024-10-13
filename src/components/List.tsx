import { FC } from "react";
import { ListCard, ListCardProps } from "./ListCard";
interface ListProps {
  foods: ListCardProps[];
  isEditOrDeleteAllowed: boolean;
  editHandler?: (id: string) => void;
  deleteHandler?: (id: string) => void;
  viewDetailsHandler: (id: string) => void;
}
const ListComponent: FC<ListProps> = ({
  foods,
  isEditOrDeleteAllowed,
  editHandler,
  deleteHandler,
  viewDetailsHandler,
}) => {
  return (
    <div className="bg-white p-8 flex flex-col gap-8 shadow-lg rounded-md min-h-[100vh]">
      {foods.map((foodItem) => (
        <ListCard
          foodItem={foodItem}
          isEditOrDeleteAllowed={isEditOrDeleteAllowed}
          editHandler={editHandler}
          key={foodItem._id}
          deleteHandler={deleteHandler}
          viewDetailsHandler={viewDetailsHandler}
        />
      ))}
    </div>
  );
};

// export const List =         (ListComponent);
export const List = ListComponent;
