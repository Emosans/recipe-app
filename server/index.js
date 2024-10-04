const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());
app.use(multer().none());

let recipes = [];

app.post("/api/recipes", (req, res) => {
  console.log(req.body);
  const { title, ingredients } = req.body;

  const newRecipe = {
    id: recipes.length+1,
    title,
    ingredients
  };

  recipes.push(newRecipe);
  
});

app.put("/api/recipes/:id",(req,res)=>{
  const {id} = req.params
  const {title,ingredients} = req.body;

  //find recipe with id
  const recipeIndex = recipes.findIndex(recipe=>recipe.id.toString()===id)
  
  if(recipeIndex==-1){
    return res.status(404).send({message:"Not found"})
  }

  recipes[recipeIndex].title = title
  recipes[recipeIndex].ingredients = ingredients

  res.send({message:"updated",updatedRecipe: recipes[recipeIndex]})
})


app.get("/api", (req, res) => {
  res.status(200).json(recipes);
});

app.listen(port, () => {
  console.log("Listening");
});
