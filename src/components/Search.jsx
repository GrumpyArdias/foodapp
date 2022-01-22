import { useState } from "react";
import { cuisineTypes } from "./cuisine-types";
import { searchRecipes } from "../api/search-recipes";
import { RecipeResultCard } from "./RecipeResultCard";

export const Search = () => {
  const [search, setSearch] = useState("");
  const [cuisines, setCuisines] = useState([]);
  const [isGlutenFree, setIsGlutenFree] = useState(false);

  const [searchResults, setSearchResults] = useState({
    isLoading: false,
    error: "",
    results: [],
  });

  const cuisinesHandler = (e, cuisineType) => {
    console.log(cuisineType);
    if (e.target.checked && cuisines.length < 3) {
      setCuisines([...cuisines, cuisineType]);
    } else {
      setCuisines(cuisines.filter((cuisine) => cuisine !== cuisineType));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setSearchResults({
      ...searchResults,
      isLoading: true,
    });

    try {
      const response = await searchRecipes({
        query: search,
        cuisines,
        isGlutenFree,
      });

      setSearchResults({
        ...searchResults,
        isLoading: false,
        results: response.results,
      });
    } catch (error) {
      setSearchResults({
        ...searchResults,
        isLoading: false,
        error: error.message,
      });
    }
  };

  const renderSearchResults = () => {
    if (searchResults.isLoading) {
      return <p>Loading...</p>;
    }

    if (searchResults.error) {
      return <p>{searchResults.error}</p>;
    }

    if (searchResults.results.length === 0) {
      return <p>No results found</p>;
    }

    return (
      <div className="flex flex-wrap">
        {searchResults.results.map(({ id, title, image }) => (
          <RecipeResultCard key={id} id={id} title={title} image={image} />
        ))}
      </div>
    );

    // return searchResults.results.map((recipe, index) => {
    //   if (index === 0 || index % 3 === 0) {
    //     const slice = searchResults.results.slice(index, index + 3);
    //     return (
    //       <div className="flex flex-wrap lg:flex-nowrap">
    //         {slice.map(({ id, title, image }) => (
    //           <RecipeResultCard key={id} id={id} title={title} image={image} />
    //         ))}
    //       </div>
    //     );
    //   }
    //   return null;
    // });
  };

  return (
    <div className="search text-black">
      <form onSubmit={submitHandler}>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search recipes..."
            className="border w-full p-2 focus:outline-none focus:border-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gray-500 transition hover:bg-gray-400 active:bg-gray-700 text-white py-2 px-4 text-xs font-bold"
          >
            Search
          </button>
        </div>
        <h3>
          <strong className="text-black">Cuisine</strong>
        </h3>
        <hr className="mt-2 mb-4" />
        <div className="flex flex-wrap">
          {cuisineTypes.map((cuisineType) => (
            <label
              className="w-3/12 text-black"
              htmlFor={cuisineType}
              key={cuisineType}
            >
              <input
                type="checkbox"
                id={cuisineType}
                name={cuisineType}
                className="mr-2 text-gray-500 mr-2 focus:ring-gray-400 focus:ring-opacity-50 border border-gray-300"
                checked={cuisines.includes(cuisineType)}
                onChange={(e) => cuisinesHandler(e, cuisineType)}
              />
              <span className="select-none text-sm font-bold">
                {cuisineType}
              </span>
            </label>
          ))}
        </div>

        <hr className="mt-2 mb-4" />
        <label className="w-3/12 text-black" htmlFor="gluten-free">
          <input
            type="checkbox"
            id="gluten-free"
            name="gluten-free"
            className="mr-2 text-gray-500 mr-2 focus:ring-gray-400 focus:ring-opacity-50 border border-gray-300"
            checked={isGlutenFree}
            onChange={() => setIsGlutenFree(!isGlutenFree)}
          />
          <span className="select-none text-sm font-bold">Gluten-Free</span>
        </label>
      </form>
      {renderSearchResults()}
    </div>
  );
};
