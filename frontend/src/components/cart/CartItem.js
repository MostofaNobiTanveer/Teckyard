import React, { useState } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { additemToCart, removeCartItem } from '../../actions/cartActions';

const CartItem = ({ item, closeCart }) => {
  const dispatch = useDispatch();

  const handleRemoveCartItem = (id) => {
    dispatch(removeCartItem(id));
  };
  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty > stock) return;
    dispatch(additemToCart(id, newQty));
  };
  const decreaseQty = (id, quantity, stock) => {
    const newQty = quantity - 1;
    if (newQty < 1) {
      handleRemoveCartItem(id);
      return;
    }
    dispatch(additemToCart(id, newQty));
  };

  return (
    <li className="py-6 flex">
      <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-center object-contain"
        />
      </div>

      <div className="ml-4 flex-1 flex flex-col">
        <div>
          <div className="flex justify-between text-sm font-medium text-black">
            <Link to={`/product/${item.product}`} onClick={closeCart}>
              <h1 className="leading-5 hover:underline">{item.name}</h1>
            </Link>
            <p className="ml-4">${item.price}</p>
          </div>
        </div>
        <div className="flex-1 flex items-end justify-between text-sm">
          <div className="relative min-w-[7rem] h-auto inline-flex items-center justify-between rounded-full transition-colors text-sm font-medium p-0.5 border bg-white border-neutral-200 text-neutral-700">
            <button
              onClick={() =>
                decreaseQty(item.product, item.quantity, item.stock)
              }
              className="hover:bg-gray-100 disabled:cursor-not-allowed p-2 rounded-full flex items-center justify-center"
            >
              <BiMinus />
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() =>
                increaseQty(item.product, item.quantity, item.stock)
              }
              className="hover:bg-gray-100 disabled:cursor-not-allowed p-2 rounded-full flex items-center justify-center"
            >
              <BiPlus />
            </button>
          </div>
          <div className="flex">
            <button
              onClick={() => handleRemoveCartItem(item.product)}
              type="button"
              className="font-medium text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
