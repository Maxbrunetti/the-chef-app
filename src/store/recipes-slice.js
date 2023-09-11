import { createSlice } from '@reduxjs/toolkit';
import updateUserIngredients from '../utils/updateUserIngredients';

const recipesInitialState = {
  recipes: [],
  ingredients: {
    vegetables: new Set(),
    meat: new Set(),
    fish: new Set(),
    spices: new Set(),
    misc: new Set(),
  },
  lists: ['vegetables', 'meat', 'fish', 'spices', 'misc'],
  currentList: 0,
  recipeSelected: '',
  changed: false,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: recipesInitialState,
  reducers: {
    addRecipe(state, action) {
      const newRecipe = action.payload;
      state.recipes.push(newRecipe);
      state.changed = true;
    },
    editRecipe(state, action) {
      const recipeIndex = state.recipes.findIndex(
        recipe => recipe.name === action.payload.recipeName
      );
      const updatedRecipe = action.payload.recipe;
      state.recipes[recipeIndex] = updatedRecipe;
      state.changed = true;
    },
    deleteRecipe(state, action) {
      const recipeIndex = state.recipes.findIndex(
        recipe => recipe.name === action.payload
      );
      state.recipes.splice(recipeIndex, 1);
      state.changed = true;
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
    setIngredientsList(state, action) {
      // if (state.recipes === []) return;
      state.ingredients = updateUserIngredients(action.payload);
      state.changed = false;
    },
  },
});
export const recipesActions = recipesSlice.actions;
export default recipesSlice;
