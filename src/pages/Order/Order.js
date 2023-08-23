import './../../styles/Order.css';
import React, { useEffect, useState, useReducer } from 'react';

function reducer(state, action) {
  const ingredient = action.ing;
  console.log(action);
  if (action.type === 'vegetables') {
    return {
      ...state,
      vegetables: {
        ...state.vegetables,
        [ingredient]: action.newValue,
      },
    };
  }
  return state;
}
function Order() {
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
          dispatch({ type: 'vegetables', ing: ingredient, newValue: newValue });
          //   setVegetableQuantities({
          //     ...vegetableQuantities,
          //     [ingredient]: newValue,
          //   });
        }, TIME_DELAY);
      }
    }
    if (touchStart > touchMove) {
      // Increase the value
      setTimeout(() => {
        const newValue = (currentValue + increment).toFixed(1);
        e.target.value = newValue;
        dispatch({ type: 'vegetables', ing: ingredient, newValue: newValue });
      }, TIME_DELAY);
    }
  }

  const [vegetableQuantities, setVegetableQuantities] = useState({
    carrot: 1,
    onion: 2,
    potato: 5,
    tomatoes: 10,
  });

  function displayIngredients(obj) {
    const ingredients = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        ingredients.push(
          <div className="order-container" key={key}>
            <div className="ingredient-container">
              <p className="ingredient-name">{key}</p>
              <input
                className="ingredient-quantity"
                key={key}
                value={state.vegetables[key] + 'kg'}
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

  const [next, setNext] = useState('Vegetables');
  const [state, dispatch] = useReducer(reducer, {
    vegetables: {
      carrots: 1,
      onions: 2,
      potatoes: 5,
      tomatoes: 10,
    },
  });
  return (
    <section className="main order">
      {displayIngredients(state.vegetables)}
      <div className="btn-container">
        <button className="btn">Copy</button>
        <button className="btn">{next}</button>
      </div>
    </section>
  );
}

export default Order;
