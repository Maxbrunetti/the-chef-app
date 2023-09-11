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
import { recipesActions } from './store/recipes-slice';
import { useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const previousSession = localStorage.getItem('user');
  const [recipeSelected, setRecipeSelected] = useState('');
  const recipes = useSelector(state => state.recipes.recipes);
  const [user, setUser] = useState({
    recipes: JSON.parse(previousSession) || [],
    ingredients: {
      vegetables: new Set(),
      meat: new Set(),
      fish: new Set(),
      spices: new Set(),
      misc: new Set(),
    },
  });

  // Update user ingredients on change
  useEffect(() => {
    setUser({
      ...user,
      ingredients: updateUserIngredients(user.recipes),
    });
    localStorage.setItem('user', JSON.stringify(user.recipes));
    // eslint-disable-next-line
  }, [user.recipes]);

  useEffect(() => {
    dispatch(recipesActions.setIngredientsList(recipes));
  }, [recipes, dispatch]);

  const [list, setList] = useState('vegetables');

  function checkList(list) {
    switch (list) {
      case 'vegetables':
        return 'meat';

      case 'meat':
        return 'fish';

      case 'fish':
        return 'spices';

      case 'spices':
        return 'misc';

      case 'misc':
        return 'vegetables';

      default:
        return list;
    }
  }

  return (
    <>
      <header className={'header'}></header>
      <BrowserRouter>
        <Navbar list={list} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/order"
              element={
                <Order
                  list={list}
                  setList={setList}
                  checkList={checkList}
                  user={user}
                  setUser={setUser}
                />
              }
            />
            <Route
              path="/recipes"
              element={
                <Recipes
                  user={user}
                  recipeSelected={recipeSelected}
                  setRecipeSelected={setRecipeSelected}
                />
              }
            />
            <Route
              path="/recipeselected"
              element={
                <RecipeSelected
                  user={user}
                  setUser={setUser}
                  recipeSelected={recipeSelected}
                />
              }
            />
            <Route
              path="/editrecipe"
              element={
                <EditRecipe
                  user={user}
                  setUser={setUser}
                  recipeSelected={recipeSelected}
                />
              }
            />
            <Route
              path="/addrecipes"
              element={<AddRecipes user={user} setUser={setUser} />}
            />
          </Routes>
        </main>
        <footer></footer>
      </BrowserRouter>
    </>
  );
}

export default App;
