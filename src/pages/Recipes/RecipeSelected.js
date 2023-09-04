import './../../styles/Recipes.css';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';

function RecipeSelected({ user, setUser, recipeSelected }) {
  function deleteRecipe() {
    const newRecipeArray = [...user.recipes];
    const recipeIndex = user.recipes.findIndex(
      recipe => recipe.name === recipeSelected
    );

    newRecipeArray.splice(recipeIndex, 1);
    console.log([...user.recipes]);
    console.log(newRecipeArray);

    const updatedRecipes = [...newRecipeArray];

    setUser({
      ...user,
      recipes: updatedRecipes,
    });
    localStorage.removeItem('orderState');
    navigate('/recipes');
  }

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
        <p className="portions">Type: {currentRecipe.type}</p>
        <p className="portions">Portions: {currentRecipe.portions}</p>
        <p>Ingredients</p>
        <ul>{ingredientsList}</ul>
        <div className="containerBtnDelete">
          <Popup
            trigger={<button className="btn btnDelete">Delete Recipe</button>}
            modal
            nested
          >
            {close => (
              <div className="confirmDeleteContainer">
                <p style={{ fontWeight: 600 }}>
                  Are you sure you want to delete this recipe?
                </p>
                <p>
                  This will also remove its ingredients from the order list.
                </p>
                <div>
                  <button className="btn btnDelete" onClick={deleteRecipe}>
                    Confirm
                  </button>
                  <button className="btn" onClick={close}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </div>
        <div className="btnContainer">
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
