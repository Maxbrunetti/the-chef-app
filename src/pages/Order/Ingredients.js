import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { recipesActions } from '../../store/recipes-slice';

function Ingredients() {
  const dispatch = useDispatch();
  const order = useSelector(state => state.recipes.order);
  const currentList = useSelector(state => state.recipes.currentList);
  const list = useSelector(state => state.recipes.lists[currentList]);
  const desktopScreen = 768;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  window.addEventListener('resize', () => setWindowWidth(window.innerWidth));

  const [touchStart, setTouchStart] = useState();
  const [touchMove, setTouchMove] = useState();

  function changeInputValue(e, key) {
    const ingredient = key;
    const currentValue = parseFloat(e.target.value);
    const increment = currentValue < 3 ? 0.1 : 0.5;
    const timeDelay = currentValue < 3 ? 40 : 120;
    if (touchStart < touchMove) {
      // Decrease the value
      if (currentValue > 0) {
        setTimeout(() => {
          const newValue = Math.max(0, (currentValue - increment).toFixed(1));
          e.target.value = newValue;
          dispatch(recipesActions.updateOrder({ ingredient, newValue, list }));
        }, timeDelay);
      }
    }
    if (touchStart > touchMove) {
      // Increase the value
      setTimeout(() => {
        const newValue = Math.max(0, (currentValue + increment).toFixed(1));
        e.target.value = newValue;
        dispatch(recipesActions.updateOrder({ ingredient, newValue, list }));
      }, timeDelay);
    }
  }

  function displayIngredients(ingredientsList) {
    const ingredients = [];
    if (windowWidth < desktopScreen) {
      // Mobile
      for (const key in ingredientsList) {
        if (ingredientsList.hasOwnProperty(key)) {
          ingredients.push(
            <div className="orderContainer" key={key}>
              <div className="ingredientContainer">
                <p className="ingredientName">{key}</p>
                <input
                  className="ingredientQuantity"
                  key={key}
                  id={key}
                  value={order[list][key] + 'kg'}
                  onTouchStart={e => setTouchStart(e.touches[0].clientY)}
                  onTouchMove={e => {
                    setTouchMove(e.touches[0].clientY);
                    changeInputValue(e, key);
                  }}
                  onChange={e => e}
                />
              </div>
            </div>
          );
        }
      }
    } else {
      // Desktop
      for (const key in ingredientsList) {
        if (ingredientsList.hasOwnProperty(key)) {
          ingredients.push(
            <div className="orderContainer" key={key}>
              <div className="ingredientContainer">
                <p className="ingredientName">{key}</p>
                <input
                  className="ingredientQuantity"
                  key={key}
                  id={key}
                  min={0}
                  type="number"
                  value={order[list][key]}
                  onChange={e => {
                    console.log(+e.target.value);
                    dispatch(
                      recipesActions.updateOrder({
                        list: list,
                        ingredient: key,
                        newValue: +e.target.value,
                      })
                    );
                  }}
                />
                <div className="unit">
                  <p>kg</p>
                </div>
              </div>
            </div>
          );
        }
      }
    }
    ingredients.sort((a, b) => (a.key > b.key ? 1 : -1));
    return ingredients;
  }

  return displayIngredients(order[list]);
}

export default Ingredients;
