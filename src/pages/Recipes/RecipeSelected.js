import './../../styles/Recipes.css';

function RecipeSelected({ user, recipeSelected }) {
  if (recipeSelected) {
    const [currentRecipe] = user.recipes.filter(
      recipe => recipe.name === recipeSelected
    );
    const ingredientsList = currentRecipe.ingredients.map(ing => (
      <li>
        {ing.weight}kg: {ing.ingredient}
      </li>
    ));
    console.log(currentRecipe);

    return (
      <section className="recipeSelected">
        <h1>{currentRecipe.name}</h1>
        <p>Portions: {currentRecipe.portions}</p>
        <p>Ingredients</p>
        <ul>{ingredientsList}</ul>
        <div className="btn-container">
          <button className="btn btnOrder">Back</button>
          <button className="btn btnOrder">Edit</button>
        </div>
      </section>
    );
  }
}
export default RecipeSelected;
