import { FC } from "react";
import { List } from "./List";
import { ListCardProps } from "./ListCard";
interface GeneralListProps {
  data: ListCardProps[];
  isEditOrDeleteAllowed: boolean;
  editHandler?: (id: string) => void;
  deleteHandler?: (id: string) => void;
  viewDetailsHandler: (id: string) => void;
}
const GeneralListComponent: FC<GeneralListProps> = ({
  data,
  isEditOrDeleteAllowed,
  editHandler,
  deleteHandler,
  viewDetailsHandler,
}) => {
  return (
    <div className="p-4 ">
      <List
        foods={data}
        isEditOrDeleteAllowed={isEditOrDeleteAllowed}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
        viewDetailsHandler={viewDetailsHandler}
      />
    </div>
  );
};

// export const GeneralList =         (GeneralListComponent);
export const GeneralList = GeneralListComponent;
