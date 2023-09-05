import './../../styles/Recipes.css';
import { Link } from 'react-router-dom';

function Recipes({ user, setRecipeSelected }) {
  return (
    <section>
      <h1>Recipes</h1>
      <h2>Starters</h2>
      {user.recipes
        .filter(recipe => recipe.type === 'Starter')
        .map(recipe => (
          <div className="recipesContainer" key={recipe.name}>
            <Link
              to="/recipeselected"
              onClick={e => {
                console.log(e.target.text);
                setRecipeSelected(e.target.text);
              }}
            >
              {recipe.name}
            </Link>
          </div>
        ))}
      <h2>Mains</h2>
      {user.recipes
        .filter(recipe => recipe.type === 'Main')
        .map(recipe => (
          <div className="recipesContainer" key={recipe.name}>
            <Link
              to="/recipeselected"
              onClick={e => {
                console.log(e.target.text);
                setRecipeSelected(e.target.text);
              }}
            >
              {recipe.name}
            </Link>
          </div>
        ))}
      <h2>Desserts</h2>
      {user.recipes
        .filter(recipe => recipe.type === 'Dessert')
        .map(recipe => (
          <div className="recipesContainer" key={recipe.name}>
            <Link
              to="/recipeselected"
              onClick={e => {
                console.log(e.target.text);
                setRecipeSelected(e.target.text);
              }}
            >
              {recipe.name}
            </Link>
          </div>
        ))}
    </section>
  );
}
export default Recipes;
