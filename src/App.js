import './App.css';
import Home from './pages/Home';
import Navbar from './components/ui/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Recipes from './pages/Recipes/Recipes';
import AddRecipes from './pages/Recipes/AddRecipes';
import Order from './pages/Order/Order';
import { useEffect, useState } from 'react';
import updateUserIngredients from './utils/updateUserIngredients';
import RecipeSelected from './pages/Recipes/RecipeSelected';
import EditRecipe from './pages/Recipes/EditRecipe';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchUserData, sendUserData } from './store/recipes-actions';
let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const [recipeSelected, setRecipeSelected] = useState('');
  const recipes = useSelector(state => state.recipes.recipes);
  const order = useSelector(state => state.recipes.order);
  const ingredients = useSelector(state => state.recipes.ingredients);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    sendUserData(recipes);
  }, [recipes, dispatch]);

  useEffect(() => {
    const sendDataDelay = setTimeout(() => {
      sendUserData(recipes);
    }, 1000);
    return () => {
      clearTimeout(sendDataDelay);
    };
  }, []);

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
