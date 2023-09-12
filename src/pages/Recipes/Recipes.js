import './../../styles/Recipes.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { recipesActions } from '../../store/recipes-slice';
import { useSelector } from 'react-redux/es/hooks/useSelector';

function Recipes() {
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes.recipes);
  function displayRecipes(type) {
    return (
      <>
        {recipes
          .filter(recipe => recipe.type === type)
          .sort((a, b) => (a.name < b.name ? -1 : 1))
          .map(recipe => (
            <div className="recipesContainer" key={recipe.name}>
              <Link
                to="/recipeselected"
                onClick={e => {
                  console.log(e.target.text);
                  dispatch(recipesActions.selectRecipe(e.target.text));
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
