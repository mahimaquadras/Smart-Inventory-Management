
const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipes');

// Create a new recipe
router.post('/', async (req, res) => {
  try {
    const { name, ingredients, instructions, imageUrl } = req.body;

    const newRecipe = new Recipe({
      name,
      ingredients,
      instructions,
      imageUrl, 
    });

    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// // Update a recipe
// router.put('/:id', async (req, res) => {
//   try {
//     const { name, ingredients, instructions, imageUrl } = req.body;

//     const recipe = await Recipe.findById(req.params.id);
//     if (!recipe) {
//       return res.status(404).json({ message: 'Recipe not found' });
//     }

//     if (name) recipe.name = name;
//     if (ingredients) recipe.ingredients = ingredients;
//     if (instructions) recipe.instructions = instructions;
//     if (imageUrl !== undefined) recipe.imageUrl = imageUrl;

//     await recipe.save();
//     res.json(recipe);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // Delete 
// router.delete('/:id', async (req, res) => {
//   try {
//     const recipe = await Recipe.findByIdAndDelete(req.params.id);
//     if (!recipe) {
//       return res.status(404).json({ message: 'Recipe not found' });
//     }
//     res.json({ message: 'Recipe deleted' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

module.exports = router;
