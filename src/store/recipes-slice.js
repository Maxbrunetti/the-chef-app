import { createSlice } from '@reduxjs/toolkit';
import updateUserIngredients from '../utils/updateUserIngredients';

const recipesInitialState = {
  recipes: [],
  ingredients: {
    vegetables: [],
    meat: [],
    fish: [],
    spices: [],
    misc: [],
  },
  lists: ['vegetables', 'meat', 'fish', 'spices', 'misc'],
  currentList: 0,
  recipeSelected: '',
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: recipesInitialState,
  reducers: {
    addRecipe(state, action) {
      const newRecipe = action.payload;
      state.recipes.push(newRecipe);
      state.ingredients = updateUserIngredients(state.recipes);
      // action.payload.ingredients.forEach(ingredient => {
      //   state.ingredients[ingredient.list].add(ingredient.name);
      // });
    },
    editRecipe(state, action) {
      const recipeIndex = state.recipes.findIndex(
        recipe => recipe.name === action.payload.recipeName
      );
      const updatedRecipe = action.payload.recipe;
      state.recipes[recipeIndex] = updatedRecipe;
    },
    deleteRecipe(state, action) {
      const recipeIndex = state.recipes.findIndex(
        recipe => recipe.name === action.payload
      );
      state.recipes.splice(recipeIndex, 1);
    },
    selectRecipe(state, action) {
      state.recipeSelected = action.payload;
    },
    changeList(state) {
      const arrLength = state.lists.length - 1;
      if (state.currentList === arrLength) {
        state.currentList = 0;
      } else state.currentList++;
    },
    setIngredientsList(state) {
      if (!state.recipes) return;
      state.ingredients = updateUserIngredients(state.recipes);
    },
  },
});
export const recipesActions = recipesSlice.actions;
export default recipesSlice;
