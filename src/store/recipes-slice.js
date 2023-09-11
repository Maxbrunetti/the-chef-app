import { createSlice } from '@reduxjs/toolkit';

const recipesInitialState = {
  recipes: [],
  ingredients: {
    vegetables: new Set(),
    meat: new Set(),
    fish: new Set(),
    spices: new Set(),
    misc: new Set(),
  },
  list: 'vegetables',
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: recipesInitialState,
  reducers: {
    addRecipe(state, action) {
      console.log(action.payload);
      const newRecipe = action.payload;
      state.recipes.push(newRecipe);
      console.log(state);
    },
    editRecipe(state, action) {},
    deleteRecipe(state, action) {
      const recipeIndex = state.recipes.findIndex(
        recipe => recipe.name === action.payload
      );
      state.recipes.splice(recipeIndex, 1);
    },
  },
});
export const recipesActions = recipesSlice.actions;
export default recipesSlice;
