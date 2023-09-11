import './../../styles/Recipes.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { recipesActions } from '../../store/recipes-slice';

function Recipes({ user, setRecipeSelected }) {
  const dispatch = useDispatch();
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
                  dispatch(recipesActions.selectRecipe(e.target.text));
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
