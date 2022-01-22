import { Link } from "react-router-dom";

export const RecipeResultCard = ({ id, title, image }) => {
  return (
    <div className="w-full lg:w-4/12">
      <div className="lg:border rounded m-4 flex flex-wrap flex-column justify-center items-center transform transition hover:scale-105 hover:bg-gray-100 filter hover: drop-shadow-lg">
        <Link to={`/recipe/${id}`}>
          <div className="w-full flex justify-center ">
            <img src={image} alt={title} />
          </div>
          <div className="mb-4 text-center truncate max-w-xs">
            <strong>{title}</strong>
          </div>
        </Link>
      </div>
    </div>
  );
};
