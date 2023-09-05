import './../../styles/Recipes.css';
import { Link } from 'react-router-dom';

function Recipes({ user, setRecipeSelected }) {
  function displayRecipes(type) {
    return (
      <>
        {user.recipes
          .filter(recipe => recipe.type === type)
          .sort((a, b) => (a.name < b.name ? -1 : 1))
          .map(recipe => (
            <div className="recipesContainer" key={recipe.name}>
              <Link
                to="/recipeselected"
                onClick={e => {
                  setRecipeSelected(e.target.text);
                }}
              >
                {recipe.name}
              </Link>
            </div>
          ))}
      </>
    );
  }
  return (
    <section className="recipeList">
      <h1>Recipes</h1>
      <h2>Starters</h2>
      {displayRecipes('Starter')}
      <h2>Mains</h2>
      {displayRecipes('Main')}
      <h2>Desserts</h2>
      {displayRecipes('Dessert')}
    </section>
  );
}
export default Recipes;
