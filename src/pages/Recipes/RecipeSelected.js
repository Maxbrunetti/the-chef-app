import './../../styles/Recipes.css';
import { useNavigate } from 'react-router-dom';

function RecipeSelected({ user, recipeSelected }) {
  const navigate = useNavigate();

  if (recipeSelected) {
    const [currentRecipe] = user.recipes.filter(
      recipe => recipe.name === recipeSelected
    );
    const ingredientsList = currentRecipe.ingredients.map(ing => (
      <li key={ing.ingredient}>
        {ing.weight}kg: {ing.ingredient}
      </li>
    ));
    console.log(currentRecipe);

    return (
      <section className="recipeSelected">
        <h1>{currentRecipe.name}</h1>
        <p className="portions">Portions: {currentRecipe.portions}</p>
        <p>Ingredients</p>
        <ul>{ingredientsList}</ul>

        <div className="btn-container">
          <button className="btn btnOrder" onClick={() => navigate(-1)}>
            Back
          </button>
          <button
            className="btn btnOrder"
            onClick={() => navigate('/editrecipe')}
          >
            Edit
          </button>
        </div>
      </section>
    );
  }
}
export default RecipeSelected;
