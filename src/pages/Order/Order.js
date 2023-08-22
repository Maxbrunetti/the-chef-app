import './../../styles/Order.css';
import React, { Component, useState, useReducer } from 'react';

function reducer(state, action) {
  const newState = {
    vegetables: {
      carrot: '1kg',
      onion: '2kg',
      potato: '5kg',
      tomatoes: '10kg',
    },
  };
  return newState;
}

function Order() {
  const [touchStart, setTouchStart] = useState();
  const [touchMove, setTouchMove] = useState();

  function changeInputValue(e, key) {
    const ingredient = key;
    if (touchStart > touchMove) {
      e.target.value++;
      setVegetableQuantities({
        ...vegetableQuantities,
        [ingredient]: e.target.value++,
      });
    }
    if (touchStart < touchMove) {
      e.target.value--;
      setVegetableQuantities({
        ...vegetableQuantities,
        [ingredient]: e.target.value--,
      });
    }
    console.log(vegetableQuantities);
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
                value={vegetableQuantities[key]}
                onTouchStart={e => setTouchStart(e.touches[0].clientY)}
                onTouchMove={e => {
                  setTouchMove(e.touches[0].clientY);
                  console.log(e.target);
                  changeInputValue(e, key);
                }}
                onChange={e => console.log(e)}
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
    carrot: '1kg',
    onion: '2kg',
    potato: '5kg',
  });
  return (
    <section className="main">
      {displayIngredients(vegetableQuantities)}
      <div className="btn-container">
        <button className="btn">Copy</button>
        <button className="btn">{next}</button>
      </div>
    </section>
  );
}

export default Order;
