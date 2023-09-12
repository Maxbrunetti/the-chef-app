import './../../styles/Recipes.css';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { useDispatch } from 'react-redux';
import { recipesActions } from '../../store/recipes-slice';
import { useSelector } from 'react-redux/es/hooks/useSelector';
function RecipeSelected() {
  const recipes = useSelector(state => state.recipes.recipes);
  const recipeSelected = useSelector(state => state.recipes.recipeSelected);

  const dispatch = useDispatch();

  function deleteRecipe() {
    dispatch(recipesActions.deleteRecipe(recipeSelected));
    navigate('/recipes');
  }

  const navigate = useNavigate();

  if (recipeSelected) {
    const [currentRecipe] = recipes.filter(
      recipe => recipe.name === recipeSelected
    );
    const ingredientsList = currentRecipe.ingredients.map(ing => (
      <li key={ing.ingredient}>
        {ing.weight}kg: {ing.ingredient}
      </li>
    ));

    return (
      <section className="recipeSelected">
        <h1>{currentRecipe.name}</h1>
        <p className="details">Type: {currentRecipe.type}</p>
        <p className="details">Portions: {currentRecipe.portions}</p>
        <div className="instructions">
          <h2>Ingredients</h2>
          <ul>{ingredientsList || ''}</ul>
          <h2>Instructions</h2>
          <p>{currentRecipe.instructions || ''}</p>
          <h2>Allergens</h2>
          <ul>
            {currentRecipe.allergens
              ? currentRecipe.allergens.map(el => <li>{el}</li>)
              : ''}
          </ul>
        </div>
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
