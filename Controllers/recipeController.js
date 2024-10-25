/* const Recipes = [
  {
    id: 1,
    name: "Scrambled Eggs",
    procedure:
      "In a bowl, whisk together the eggs, milk, salt, and pepper.Heat the butter in a skillet over medium heat.Pour in the egg mixture and gently stir with a spatula.Cook until the eggs are just set but still creamy, about 3-4 minutes. Serve immediately.",
    ingredients: [
      "4 eggs",
      "2 tbsp milk",
      "Salt and pepper to taste",
      "1 tbsp butter",
    ],
    duration: "10 minutes",
  },
  {
    id: 2,
    "name": "Vegetable Soup",
    "procedure":
      "In a pot, heat olive oil over medium heat and sauté the onion, carrots, and celery for 5 minutes until softened.Add the diced tomatoes and vegetable broth, and bring to a boil.Stir in the green beans, salt, and pepper.Reduce heat and simmer for 20 minutes. Serve hot.",
    "ingredients": [
      "1 onion chopped",
      "2 carrots diced",
      "2 celery stalks diced",
      "1 can (400g) diced tomatoes",
      "4 cups vegetable broth",
      "1 cup green beans chopped",
      "Salt and pepper to taste",
      "1 tbsp olive oil",
    ],
    "duration": "30 minutes",
  },
  {
    id: 3,
    "name": "Pasta with Garlic and Olive Oil",
    "procedure":
      "Cook the spaghetti according to package instructions; drain.In a skillet, heat the olive oil over medium heat and sauté the sliced garlic until golden (2-3 minutes).Toss the cooked spaghetti into the skillet, adding salt and optional red pepper flakes.Mix well and garnish with fresh parsley before serving.",
    "ingredients": [
      "200g spaghetti",
      "4 cloves garlic sliced",
      "1/4 cup olive oil",
      "Red pepper flakes (optional)",
      "Salt to taste",
      "Fresh parsley chopped (for garnish)",
    ],
    "duration": "15 minutes",
  },
  {
    id: 4,
    "name": "Fruit Salad",
    "procedure":
      "In a large bowl, combine the sliced strawberries, blueberries, cubed melon, and sliced banana.Drizzle with honey if desired and toss gently to mix.Serve chilled.",
    "ingredients": [
      "1 cup strawberries sliced",
      "1 cup blueberries",
      "1 cup melon cubed",
      "1 banana sliced",
      "1 tbsp honey (optional)",
    ],
    "duration": "10 minutes",
  },
  {
    id: 5,
    "name": "Grilled Cheese Sandwich",
    "procedure":
      "Butter one side of each slice of bread.Place the cheese between the unbuttered sides of the bread.Heat a skillet over medium heat and place the sandwich in it.Cook until golden brown, about 3-4 minutes on each side. Slice and serve hot.",
    "ingredients": [
      "2 slices of bread",
      "2 slices of cheese (cheddar or your choice)",
      "1 tbsp butter",
    ],
    "duration": "10 minutes",
  },
];

export const getallrecipe = (req, res) => {
  res.status(200).json({ messages: "Recipes List", data: Recipes });
};

export const getrecipebyid = (req, res) => {
  const recipeId = req.params.id;
  const recipeDetails = Recipes.find((ele) => ele.id == recipeId);
  if (!recipeDetails) {
    return res.status(404).json({ messages: "Recipe Not Found" });
  }
  res.status(200).json({ messages: "Your Recipes", data: recipeDetails });
};

export const createrecipe = (req, res) => {
  const { name, procedure, ingredients, duration } = req.body;
  const newRecipe = {
    id: Recipes.length + 1,
    name: name,
    procedure: procedure,
    ingredients: ingredients,
    duration: duration,
  };
  Recipes.push(newRecipe);
  res.status(200).json({ messages: "New Recipe Created", data: newRecipe });
};

export const updaterecipe = (req, res) => {
  const recipeId = req.params.id;
  const { name, procedure, ingredients, duration } = req.body;
  const index = Recipes.findIndex((ele) => ele.id == recipeId);
  if (index === -1) {
    return res.status(404).json({ messages: "Recipe Not Found" });
  }
  Recipes[index].name = name;
  Recipes[index].procedure = procedure;
  Recipes[index].ingredients = ingredients;
  Recipes[index].duration = duration;
  res.status(200).json({ messages: "Recipe Updated", data: Recipes[index] });
};

export const deleterecipe = (req, res) => {
  const recipeId = req.params.id;
  const index = Recipes.findIndex((ele) => ele.id == recipeId);
  if (index === -1) {
    return res.status(404).json({ messages: "Recipe Not Found" });
  }
  Recipes.splice(index, 1);
  res.status(200).json({ messages: "Recipe Deleted" });
};
 */

import Recipes from "../Models/recipeSchema.js";

export const createrecipe = async(req,res)=>{
    try {
        const Recipe = new Recipes(req.body)
        await Recipe.save();
        res.status(200).json({message:"Recipe Added Sucessfully",data:Recipe})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error in create Recipe",data:error})
    }
}

export const getallrecipe = async(req,res)=>{
    try {
        const getallrecipes = await Recipes.find();
        res.status(200).json({ messages: "Recipes List", data: getallrecipes});
    } catch (error) {
        res.status(500).json({message:error.message,})
    }
}

export const getrecipebyid = async(req, res) => {
    try {
        const recipeId = req.params.id;
        const recipe = await Recipes.findById(recipeId)
        if(!recipe){
            return res.status(404).json({ messages: "Recipe Not Found" });
        }
        res.status(200).json({ messages: "Your Recipes", data: recipe});
    } catch (error) {
        res.status(500).json({message:error.message,});
    }
};

export const updaterecipe = async(req,res)=>{
    try {
        const recipeId = req.params.id;
        const { name, procedure, ingredients, duration } = req.body;
        const result = await Recipes.findByIdAndUpdate(
            {_id:recipeId},
            {name,procedure, ingredients, duration},
            {new:true},
        );
        if(result.matchedCount ===0){
            return res.status(404).json({ messages: "Recipe Not Found" });
        }
        res.status(200).json({ messages: "Recipe Updated", data: result});
    } catch (error) {
        res.status(500).json({message:error.message,});
    }
};

export const deleterecipe = async(req,res)=>{
    try {
        const recipeId = req.params.id;
    const result = await Recipes.findByIdAndDelete(
        {_id:recipeId})
        if(!result){
            return res.status(404).json({ messages: "Recipe Not Found" });
        }
        const recipe = await Recipes.find();
        res.status(200).json({ messages: "Recipe Deleted",data:recipe});
    } catch (error) {
        res.status(500).json({message:error.message,});
    }
    

}