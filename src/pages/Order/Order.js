import './../../styles/Order.css';
import React, { useState, useReducer } from 'react';
import Popup from 'reactjs-popup';

function reducer(state, action) {
  const ingredient = action.ing;
  if (action.type === 'vegetables') {
    return {
      ...state,
      vegetables: {
        ...state.vegetables,
        [ingredient]: action.newValue,
      },
    };
  }
  if (action.type === 'meat') {
    return {
      ...state,
      meat: {
        ...state.meat,
        [ingredient]: action.newValue,
      },
    };
  }
  if (action.type === 'fish') {
    return {
      ...state,
      fish: {
        ...state.fish,
        [ingredient]: action.newValue,
      },
    };
  }
  if (action.type === 'spices') {
    return {
      ...state,
      spices: {
        ...state.spices,
        [ingredient]: action.newValue,
      },
    };
  }
  if (action.type === 'misc') {
    return {
      ...state,
      misc: {
        ...state.misc,
        [ingredient]: action.newValue,
      },
    };
  }
  return state;
}

function Order({ list, setList, checkList, user }) {
  const TIME_DELAY = 70;
  const [touchStart, setTouchStart] = useState();
  const [touchMove, setTouchMove] = useState();

  function changeInputValue(e, key) {
    const ingredient = key;
    const currentValue = parseFloat(e.target.value);
    const increment = currentValue < 3 ? 0.1 : 0.5;

    if (touchStart < touchMove) {
      // Decrease the value
      if (currentValue > 0) {
        setTimeout(() => {
          const newValue = Math.max(0, (currentValue - increment).toFixed(1));
          e.target.value = newValue;
          dispatch({ type: list, ing: ingredient, newValue: newValue });
        }, TIME_DELAY);
      }
    }
    if (touchStart > touchMove) {
      // Increase the value
      setTimeout(() => {
        const newValue = (currentValue + increment).toFixed(1);
        e.target.value = newValue;
        dispatch({ type: list, ing: ingredient, newValue: newValue });
      }, TIME_DELAY);
    }
  }

  function displayIngredients(ingredientsList) {
    const ingredients = [];
    for (const key in ingredientsList) {
      if (ingredientsList.hasOwnProperty(key)) {
        ingredients.push(
          <div className="order-container" key={key}>
            <div className="ingredient-container">
              <p className="ingredient-name">{capitalizeAndAddSpaces(key)}</p>
              <input
                className="ingredient-quantity"
                key={key}
                value={state[list][key] + 'kg'}
                onTouchStart={e => setTouchStart(e.touches[0].clientY)}
                onTouchMove={e => {
                  setTouchMove(e.touches[0].clientY);
                  changeInputValue(e, key);
                }}
                onChange={e => ''}
              />
            </div>
          </div>
        );
      }
    }
    return ingredients;
  }

  function convertSetsToKeyValuePairs(objWithSets) {
    const result = {};

    for (const key in objWithSets) {
      if (objWithSets.hasOwnProperty(key)) {
        const set = objWithSets[key];
        const keyValuePairs = {};

        set.forEach(value => {
          keyValuePairs[value] = 0;
        });

        result[key] = keyValuePairs;
      }
    }

    return result;
  }

  const [state, dispatch] = useReducer(
    reducer,
    convertSetsToKeyValuePairs(user.ingredients)
  );
  function capitalizeAndAddSpaces(inputText) {
    let result = '';
    result += inputText.charAt(0).toUpperCase();
    for (let i = 1; i < inputText.length; i++) {
      const currentChar = inputText.charAt(i);
      if (currentChar === currentChar.toUpperCase() && i > 0) {
        result += ' ';
      }
      result += currentChar;
    }

    return result;
  }

  function copyList() {
    let copiedText = [];
    for (const key in state[list]) {
      copiedText.push(`${capitalizeAndAddSpaces(key)}: ${state[list][key]}`);
    }
    copiedText = copiedText.join('\n');
    return navigator.clipboard.writeText(copiedText);
  }

  return (
    <section className={`main ${list}`}>
      {displayIngredients(state[list])}
      <div className="btn-container">
        <button className="btn btnOrder" onClick={copyList}>
          Copy
        </button>
        <button
          className="btn btnOrder"
          onClick={() => setList(checkList(list))}
        >
          Next List
        </button>
      </div>
    </section>
  );
}

export default Order;
