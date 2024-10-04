import axios from "axios";
import { useEffect, useState } from "react";

interface Recipe {
  id: number;
  title: string;
  ingredients: string;
}

function Recipe() {
  const [recipeTitle, setRecipeTitle] = useState<Recipe[]>([]);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedIngredients, setUpdatedIngredients] = useState("");

  const url = "http://localhost:3001/api/";

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const resp = await axios.get(url);
        setRecipeTitle(resp.data);
      } catch (error) {
        console.error("Error in fetching recipe", error);
      }
    };

    fetchRecipes();
  }, []); 

  const startEditing = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setUpdatedTitle(recipe.title);
    setUpdatedIngredients(recipe.ingredients);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRecipe) return;

    try {
      const response = await axios.put(
        `http://localhost:3001/api/recipes/${editingRecipe.id}`,
        {
          title: updatedTitle,
          ingredients: updatedIngredients,
        }
      );

      console.log("Recipe updated", response.data);

      setRecipeTitle((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.id === editingRecipe.id
            ? { ...recipe, ...response.data.updatedRecipe }
            : recipe
        )
      );

      // Reset the editing state
      setEditingRecipe(null);
      setUpdatedTitle("");
      setUpdatedIngredients("");
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Recipes</h2>
      {recipeTitle.length === 0 ? (
        <p className="text-gray-500">No recipes found</p>
      ) : (
        <ul className="space-y-4">
          {recipeTitle.map((recipe) => (
            <li key={recipe.id} className="border p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{recipe.title}</h3>
              <p className="text-gray-700">{recipe.ingredients}</p>
              <button
                onClick={() => startEditing(recipe)}
                className="mt-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}

      {editingRecipe && (
        <div className="mt-6 border p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Edit Recipe</h2>
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label htmlFor="edit-title" className="block text-sm font-medium">
                Title
              </label>
              <input
                id="edit-title"
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="edit-ingredients"
                className="block text-sm font-medium"
              >
                Ingredients
              </label>
              <textarea
                id="edit-ingredients"
                value={updatedIngredients}
                onChange={(e) => setUpdatedIngredients(e.target.value)}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Update Recipe
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Recipe;
