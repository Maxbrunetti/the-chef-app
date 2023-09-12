import { createSlice } from '@reduxjs/toolkit';
import updateUserIngredients from '../utils/updateUserIngredients';
import { convertArrayIntoKeyValue } from '../utils/convertArraysIntoKeyValue';
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
  order: {},
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: recipesInitialState,
  reducers: {
    addRecipe(state, action) {
      const newRecipe = action.payload;
      state.recipes.push(newRecipe);
      state.ingredients = updateUserIngredients(state.recipes);
      state.order = convertArrayIntoKeyValue(state.ingredients);
    },
    editRecipe(state, action) {
      const recipeIndex = state.recipes.findIndex(
        recipe => recipe.name === action.payload.recipeName
      );
      const updatedRecipe = action.payload.recipe;
      state.recipes[recipeIndex] = updatedRecipe;
      state.ingredients = updateUserIngredients(state.recipes);
      state.order = convertArrayIntoKeyValue(state.ingredients);
    },
    deleteRecipe(state, action) {
      const recipeIndex = state.recipes.findIndex(
        recipe => recipe.name === action.payload
      );
      state.recipes.splice(recipeIndex, 1);
      state.ingredients = updateUserIngredients(state.recipes);
      state.order = convertArrayIntoKeyValue(state.ingredients);
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
    updateOrder(state, action) {
      const ingredient = action.payload.ingredient;
      const list = action.payload.list;
      state.order[list][ingredient] = action.payload.newValue;
    },
    updateUser(state, action) {
      state.recipes = action.payload.recipes;
      state.lists = action.payload.lists;
      state.currentList = action.payload.currentList;
      state.recipeSelected = action.payload.recipeSelected;
      state.ingredients = action.payload.ingredients;
      state.order = action.payload.order;
    },
    clearOrder(state) {
      state.order = convertArrayIntoKeyValue(state.ingredients);
    },
  },
});
export const recipesActions = recipesSlice.actions;
export default recipesSlice;
