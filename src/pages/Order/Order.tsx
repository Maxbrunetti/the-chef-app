import './../../styles/Order.css';
import React from 'react';
import Popup from 'reactjs-popup';
import capitalizeAndAddSpaces from '../../utils/capitalizeAndAddSpaces';
import Ingredients from './Ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { recipesActions } from '../../store/recipes-slice';

function Order() {
  const dispatch = useDispatch();
  const currentList = useSelector(state => state.recipes.currentList);
  const list = useSelector(state => state.recipes.lists[currentList]);
  const order = useSelector(state => state.recipes.order);

  function clearOrder() {
    dispatch(recipesActions.clearOrder());
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
      <Ingredients />
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
                <button
                  className="btn btnDelete"
                  onClick={e => {
                    clearOrder();
                    close();
                  }}
                >
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
