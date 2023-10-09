import './../../styles/Recipes.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Recipe, RootState, recipesActions } from '../../store/recipes-slice';
import { useSelector } from 'react-redux/es/hooks/useSelector';

function Recipes() {
  const dispatch = useDispatch();
  const recipes = useSelector((state: RootState) => state.recipes.recipes);
  function displayRecipes(type: string) {
    return (
      <>
        {recipes
          .filter((recipe: Recipe) => recipe.type === type)
          .sort((a: { name: string }, b: { name: string }) =>
            a.name < b.name ? -1 : 1
          )
          .map((recipe: Recipe) => (
            <div className="recipesContainer" key={recipe.name}>
              <Link
                to="/recipeselected"
                onClick={(e: any) => {
                  dispatch(recipesActions.selectRecipe<any>(e.target.text));
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
