import './../../styles/Order.css';
import React, { useState, useReducer, useEffect } from 'react';
import Popup from 'reactjs-popup';
import capitalizeAndAddSpaces from '../../utils/capitalizeAndAddSpaces';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { recipesActions } from '../../store/recipes-slice';

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
  const dispatchTwo = useDispatch();
  const navigate = useNavigate();
  function clearOrder() {
    localStorage.setItem(
      'orderState',
      JSON.stringify(convertSetsToKeyValuePairs(user.ingredients))
    );
    navigate(0);
  }
  const desktopScreen = 768;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  window.addEventListener('resize', () => setWindowWidth(window.innerWidth));

  const initialState = localStorage.getItem('orderState')
    ? JSON.parse(localStorage.getItem('orderState'))
    : convertSetsToKeyValuePairs(user.ingredients);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('orderState', JSON.stringify(state));
  }, [state]);

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
          dispatch({ type: list, ing: ingredient, newValue: newValue });
        }, timeDelay);
      }
    }
    if (touchStart > touchMove) {
      // Increase the value
      setTimeout(() => {
        const newValue = Math.max(0, (currentValue + increment).toFixed(1));
        e.target.value = newValue;
        dispatch({ type: list, ing: ingredient, newValue: newValue });
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
                  value={state[list][key] + 'kg'}
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
                  value={state[list][key]}
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

  function copyList() {
    let copiedText = [];
    for (const key in state[list]) {
      if (state[list][key] === 0) continue;
      copiedText.push(`${capitalizeAndAddSpaces(key)}: ${state[list][key]}kg`);
    }
    copiedText = copiedText.join('\n');
    return navigator.clipboard.writeText(copiedText);
  }

  return (
    <section className={`main ${list}`}>
      {displayIngredients(state[list])}
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
            setList(checkList(list));
            dispatchTwo(recipesActions.changeList());
          }}
        >
          Next List
        </button>
      </div>
    </section>
  );
}

export default Order;
