import { apiKey, useFakeData } from "./config.js";
import { fakeRecipeSearchResults } from "./fakes/search-recipes";

export const searchRecipes = async ({
  query = "",
  cuisines = [],
  glutenFree = false,
}) => {
  if (!useFakeData) {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query.trim()}&cuisine=${cuisines.join(
        ","
      )}&intolerances=${glutenFree ? "gluten" : ""}&number=10`
    );

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  }

  return fakeRecipeSearchResults;
};
