import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { apiKey } from "../api/config";
import { Link } from "react-router-dom";
import { Infobox } from "./Infobox";

export const Recipe = () => {
  const { recipeId } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [steps, setSteps] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => setRecipe(data));

    fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => setSteps(data[0].steps));
  }, [recipeId]);
  console.log(steps);

  // if (!recipe || !steps) {
  //   return ;
  // }

  return (
    <div className="recipe text-black">
      <Link
        to="/"
        className="text-black hover:text-blue-600 bg-gray-200 rounded-md py-1 px-4 border border-black filter hover:drop-shadow-lg "
      >
        Back
      </Link>

      {!recipe || !steps ? (
        <p className="text-black">Loading...</p>
      ) : (
        <>
          <>
            <h1 className="text-6xl font-bold pb-2 pt-4 pl-2 text-center mb-4">
              {recipe.title}
            </h1>
            <img
              className="pb-4 block ml-auto mr-auto "
              src={recipe.image}
              alt={recipe.title}
            />
            <Infobox title="Basic Information">
              <div
                className="leading-6 mb-4 pl-2 pr-2"
                dangerouslySetInnerHTML={{ __html: recipe.summary }}
              />
              <h3 className="font-bold pb-2 pl-2">
                Servings: {recipe.servings}
              </h3>
              <h3 className="font-bold pb-4 pl-2">
                Time Needed: {recipe.readyInMinutes} min
              </h3>
            </Infobox>
            <Infobox title="Ingredients">
              <ul className="pt-2">
                {recipe.extendedIngredients.map((ingredient) => (
                  <li className="pb-2 flex pl-2 " key={ingredient.id}>
                    <strong className="mr-2">{ingredient.name}: </strong>
                    <p>
                      {ingredient.measures.metric.amount.toFixed(1)}{" "}
                      {ingredient.measures.metric.unitLong}
                    </p>
                  </li>
                ))}
              </ul>
            </Infobox>
          </>
          <Infobox title="Steps">
            <ul>
              {steps.map((el) => (
                <li className="mb-2 text-justify pl-2" key={el.number}>
                  <strong>{el.number}</strong> {el.step}{" "}
                  {/* <ul>
                  <h3>Ingredients needed:</h3>
                  {el.ingredients.map((ing) => (
                    <li key={ing.id}>{ing.name}</li>
                  ))}
                </ul> */}
                </li>
              ))}
            </ul>
          </Infobox>
        </>
      )}
    </div>
  );
};
