import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import { Link } from 'react-router-dom';

const CartItem = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cartItems
      .reduce((total, item) => {
        return (
          total +
          parseFloat(item.cost.substring(1)) *
            item.quantity
        );
      }, 0)
      .toFixed(2);
  };

  const calculateTotalCost = (item) => {
    return (
      parseFloat(item.cost.substring(1)) *
      item.quantity
    ).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        amount: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          amount: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = () => {
    alert(
      'Functionality to be added for future reference'
    );
  };

  return (
    <div>
      <nav>
        <Link to='/products'>
          Continue Shopping
        </Link>
      </nav>

      <h2>
        Total Cart Amount: $
        {calculateTotalAmount()}
      </h2>

      {cartItems.map((item, index) => (
        <div key={index}>
          <img
            src={item.image}
            alt={item.name}
            width='150'
          />

          <h3>{item.name}</h3>

          <p>{item.cost}</p>

          <p>Quantity: {item.quantity}</p>

          <p>
            Total: $
            {calculateTotalCost(item)}
          </p>

          <button
            onClick={() =>
              handleIncrement(item)
            }
          >
            +
          </button>

          <button
            onClick={() =>
              handleDecrement(item)
            }
          >
            -
          </button>

          <button
            onClick={() =>
              handleRemove(item)
            }
          >
            Delete
          </button>
        </div>
      ))}

      <button
        onClick={handleCheckoutShopping}
      >
        Checkout
      </button>
    </div>
  );
};

export default CartItem;
