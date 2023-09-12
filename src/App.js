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

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes.recipes);
  const state = useSelector(state => state.recipes);
  const order = useSelector(state => state.recipes.order);

  // Fetch user data
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  // Send user data
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    sendUserData(state);
  }, [recipes, dispatch]);

  // Update order
  useEffect(() => {
    const sendDataDelay = setTimeout(() => {
      sendUserData(state);
    }, 500);
    return () => {
      clearTimeout(sendDataDelay);
    };
  }, [order]);

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
