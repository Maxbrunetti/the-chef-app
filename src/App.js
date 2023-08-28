import './App.css';
import Home from './pages/Home';
import Navbar from './components/ui/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Recipes from './pages/Recipes/Recipes';
import AddRecipes from './pages/Recipes/AddRecipes';
import Order from './pages/Order/Order';
import { useEffect, useState } from 'react';
import updateUserIngredients from './utils/updateUserIngredients';

function App() {
  const [user, setUser] = useState({
    recipes: [],
    ingredients: {
      vegetables: new Set(),
      meat: new Set(),
      fish: new Set(),
      spices: new Set(),
      misc: new Set(),
    },
  });
  // useEffect(() => {
  //   if (localStorage.user) {
  //     setUser();
  //   }
  // }, []);

  // Update user ingredients on change
  useEffect(() => {
    setUser({
      ...user,
      ingredients: updateUserIngredients(user.recipes),
    });
    // eslint-disable-next-line
  }, [user.recipes]);

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
        {/* <head>
          <meta name="og:title" content="The Chef App" />
          <meta name="og:description" content="" />
          <meta name="og:image" content="" />
        </head>
        <body> */}
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
                />
              }
            />
            <Route path="/recipes" element={<Recipes />} />
            <Route
              path="/addrecipes"
              element={<AddRecipes user={user} setUser={setUser} />}
            />
          </Routes>
        </main>
        <footer></footer>
        {/* </body> */}
      </BrowserRouter>
    </>
  );
}

export default App;
