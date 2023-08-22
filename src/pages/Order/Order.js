import './../../styles/Order.css';
import React, { Component, useState, useReducer } from 'react';

class MyComponent extends Component {
  handleTouchStart = event => {
    event.preventDefault();
    const touchY = event.touches[0].clientY;
    console.log('Y-coordinate of touch:', touchY);
  };

  render() {
    return <div onTouchStart={this.handleTouchStart}>Touch Me</div>;
  }
}

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
  const [vegetableQuantities, setVegetableQuantities] = useState({
    carrot: 1, // Initial quantity
    onion: 2, // Initial quantity
    potato: 5, // Initial quantity
    tomatoes: 10, // Initial quantity
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
                value={vegetableQuantities[key]}
                onTouchMove={e => console.log(e)}
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
