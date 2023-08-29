import './../../styles/Recipes.css';
import { Link } from 'react-router-dom';

function Recipes({ user, recipeSelected, setRecipeSelected }) {
  console.log(user.recipes);
  return (
    <section>
      {user.recipes.map(recipe => (
        <div className="ingredientContainer">
          <Link
            to="/recipeselected"
            onClick={e => {
              setRecipeSelected(e.target.text);
            }}
            key={recipe.name}
          >
            {recipe.name}
          </Link>
        </div>
      ))}
    </section>
  );
}
export default Recipes;
