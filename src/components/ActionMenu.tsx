import { FC } from "react";

interface ActionMenuProps {
  isOpen: boolean;
  isEditOrDeleteAllowed: boolean;
  editHandler?: (id: string) => void;
  deleteHandler?: (id: string) => void;
  viewDetailsHandler: (id: string) => void;
  id: string;
}
const ActionMenuComponent: FC<ActionMenuProps> = ({
  isOpen,
  isEditOrDeleteAllowed,
  editHandler,
  deleteHandler,
  viewDetailsHandler,
  id,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="absolute top-0 right-10 bg-[#fdd901] z-10 rounded-md p-1 shadow-xl w-[150px]">
      <div className=" p-2 flex flex-col items-center justify-center gap-2">
        {isEditOrDeleteAllowed && (
          <>
            <button
              className="font-bold hover:text-[#303030]"
              onClick={() => editHandler!(id)}
            >
              Edit
            </button>

            <button
              className="font-bold hover:text-[#303030]"
              onClick={() => deleteHandler!(id)}
            >
              Delete
            </button>
          </>
        )}
        <button
          className="font-bold hover:text-[#303030]"
          onClick={() => viewDetailsHandler(id)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export const ActionMenu = ActionMenuComponent;
