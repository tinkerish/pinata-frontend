import { BiSolidError } from "react-icons/bi";

const Error = ({ errorMessage, id }) => {
  return (
    <div id={id}>
      <p className="flex text-red-700">
        <BiSolidError size={20} />
        {errorMessage}
      </p>
    </div>
  );
};

export default Error;
