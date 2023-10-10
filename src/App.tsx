import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchUserData, sendUserData } from './store/recipes-actions';

import Home from './pages/Home';
import Navbar from './components/ui/Navbar';
import Recipes from './pages/Recipes/Recipes';
import AddRecipes from './pages/Recipes/AddRecipes';
import Order from './pages/Order/Order';
import RecipeSelected from './pages/Recipes/RecipeSelected';
import EditRecipe from './pages/Recipes/EditRecipe';
import { RootState } from './store/recipes-slice';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const recipes = useSelector((state: RootState) => state.recipes.recipes);
  const state = useSelector((state: RootState) => state.recipes);
  const order = useSelector((state: RootState) => state.recipes.order);

  // Fetch user data
  useEffect(() => {
    dispatch<any>(fetchUserData());
  }, [dispatch]);

  // Send user data
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    sendUserData(state);
  }, [recipes, dispatch, state]);

  // Update order
  useEffect(() => {
    const sendDataDelay = setTimeout(() => {
      sendUserData(state);
    }, 500);
    return () => {
      clearTimeout(sendDataDelay);
    };
  }, [order, state]);

  return (
    <>
      <header className={'header'}></header>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order" element={<Order />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipeselected" element={<RecipeSelected />} />
            <Route path="/editrecipe" element={<EditRecipe />} />
            <Route path="/addrecipes" element={<AddRecipes />} />
          </Routes>
        </main>
        <footer></footer>
      </BrowserRouter>
    </>
  );
}

export default App;
