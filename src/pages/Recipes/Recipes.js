import './../../styles/Recipes.css';
import { Link } from 'react-router-dom';

function Recipes({ user, setRecipeSelected }) {
  console.log(user.recipes);
  return (
    <section>
      {user.recipes.map(recipe => (
        <div className="ingredientContainer" key={recipe.name}>
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
