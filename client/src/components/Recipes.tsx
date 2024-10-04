import axios from 'axios'
import { useState } from 'react';

function Recipes() {
  const[title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const url = "http://localhost:3001/api/recipes";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("ingredients", ingredients);

    try {
      const response = await axios.post(url, formdata, {
        headers: { "Content-type": "multipart/form-data" },
      });
      console.log("Recipe saved", response.data);
      setTitle("");
      setIngredients("");
    } catch (error) {
      console.error("error saving recipe");
    }
  };

  return (
    <div className='mt-48 w-96 h-96 flex justify-center items-center'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text" className="block">
          Text
        </label>
        <input
          className="border-2 block"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="text"
        />
        <label htmlFor="ingredients" className="block">
          Ingredients
        </label>
        <input
          className="border-2 block"
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          id="ingredients"
        />
        <button type="submit" className='bg-blue-400 p-3 rounded-md mt-4'>submit</button>
      </form>
    </div>
  );
}

export default Recipes;
