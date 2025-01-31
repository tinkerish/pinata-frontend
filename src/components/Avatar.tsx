import { FC } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { getInitials } from "../utils/getInitials";

export type AvatarImageSize = "medium" | "large" | "small";

interface AvatarProps {
  username?: string;
  imageUrl?: string;
  size?: AvatarImageSize;
  onEditImage?: () => void;
  loading?: boolean;
}

const AvatarComponent: FC<AvatarProps> = ({
  username,
  imageUrl,
  size,
  onEditImage,
  loading,
}) => {
  return (
    <>
      {/* {loading ? (
        <AvatarLoader size={size} />
      ) : ( */}
      <div
        className={`rounded-[100%] border border-solid border-[#f1f1f1] ${
          size === "large"
            ? "w-24 h-24"
            : size === "medium"
            ? "w-16 h-16"
            : "w-10 h-10"
        } flex items-center justify-center`}
      >
        {!imageUrl ? (
          <span
            className={`bg-[#00033e] text-[#f9f9f9] rounded-[100%] flex items-center justify-center font-bold ${
              size === "large"
                ? "text-2xl w-24 h-24"
                : size === "medium"
                ? "text-xl w-16 h-16"
                : "text-lg w-10 h-10"
            }`}
          >
            {getInitials(username)}
          </span>
        ) : (
          <img
            src={imageUrl}
            alt={username}
            className={`${
              size === "large"
                ? "w-24 h-24"
                : size === "medium"
                ? "w-16 h-16"
                : "w-10 h-10"
            } rounded-[100%] flex items-center justify-center`}
            loading="eager"
            decoding="async"
          />
        )}
        {onEditImage ? (
          <button onClick={onEditImage} className={`edit-image ${size}`}>
            <BiSolidEdit />
          </button>
        ) : null}
      </div>
      {/* )} */}
    </>
  );
};

export default AvatarComponent;
