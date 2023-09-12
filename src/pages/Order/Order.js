import './../../styles/Order.css';
import React, { useState, useReducer, useEffect } from 'react';
import Popup from 'reactjs-popup';
import capitalizeAndAddSpaces from '../../utils/capitalizeAndAddSpaces';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { recipesActions } from '../../store/recipes-slice';
import { convertArrayIntoKeyValue } from '../../utils/convertArraysIntoKeyValue';

function Order() {
  const currentList = useSelector(state => state.recipes.currentList);
  const list = useSelector(state => state.recipes.lists[currentList]);
  const order = useSelector(state => state.recipes.order);

  const dispatch = useDispatch();

  function clearOrder() {
    dispatch(recipesActions.clearOrder());
  }
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
          // dispatch({ type: list, ing: ingredient, newValue: newValue });
          dispatch(recipesActions.updateOrder({ ingredient, newValue, list }));
        }, timeDelay);
      }
    }
    if (touchStart > touchMove) {
      // Increase the value
      setTimeout(() => {
        const newValue = Math.max(0, (currentValue + increment).toFixed(1));
        e.target.value = newValue;
        // dispatch({ type: list, ing: ingredient, newValue: newValue });
        dispatch(recipesActions.updateOrder({ ingredient, newValue, list }));
      }, timeDelay);
    }
  }

  function displayIngredients(ingredientsList) {
    const ingredients = [];
    if (windowWidth < desktopScreen) {
      for (const key in ingredientsList) {
        if (ingredientsList.hasOwnProperty(key)) {
          ingredients.push(
            <div className="orderContainer" key={key}>
              <div className="ingredientContainer">
                <p className="ingredientName">{capitalizeAndAddSpaces(key)}</p>
                <input
                  className="ingredientQuantity"
                  key={key}
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
      for (const key in ingredientsList) {
        if (ingredientsList.hasOwnProperty(key)) {
          ingredients.push(
            <div className="orderContainer" key={key}>
              <div className="ingredientContainer">
                <p className="ingredientName">{capitalizeAndAddSpaces(key)}</p>
                <input
                  className="ingredientQuantity"
                  key={key}
                  min={0}
                  type="number"
                  value={order[list][key]}
                  onChange={e => {
                    console.log(key);
                    dispatch({
                      type: list,
                      ing: key,
                      newValue: +e.target.value,
                    });
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

  function copyList() {
    let copiedText = [];
    for (const key in order[list]) {
      if (order[list][key] === 0) continue;
      copiedText.push(`${capitalizeAndAddSpaces(key)}: ${order[list][key]}kg`);
    }
    copiedText = copiedText.join('\n');
    return navigator.clipboard.writeText(copiedText);
  }

  return (
    <section className={`main ${list}`}>
      {displayIngredients(order[list])}
      <div className="containerBtnDelete">
        <Popup
          trigger={<button className="btn btnDelete">Clear Order</button>}
          modal
          nested
        >
          {close => (
            <div className="confirmDeleteContainer">
              <p style={{ fontWeight: 600 }}>
                Are you sure you want to clear all orders?
              </p>
              <div>
                <button className="btn btnDelete" onClick={clearOrder}>
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
        <button className="btn btnOrder" onClick={copyList}>
          Copy
        </button>
        <button
          className="btn btnOrder"
          onClick={() => {
            dispatch(recipesActions.changeList());
          }}
        >
          Next List
        </button>
      </div>
    </section>
  );
}

export default Order;
