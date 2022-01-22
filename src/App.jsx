import { Search } from "./components/Search";
import { Recipe } from "./components/Recipe";
import { Routes, Route } from "react-router-dom";

export function App() {
  return (
    <div className="bg-gray-100">
      <div className="bg-white max-w-6xl mx-auto min-h-screen p-5">
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/recipe/:recipeId" element={<Recipe />} />
          <Route path="*" element={<p>Not found</p>} />
        </Routes>
      </div>
    </div>
  );
}
