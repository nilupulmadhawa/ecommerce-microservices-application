import { useState } from 'react';

const useCart = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const productExit = cartItems.find((item) => item.id === product.id);
    if (productExit) {
      setCartItems(cartItems.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty + 1 } : item)));
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const decreaseQty = (product) => {
    const productExit = cartItems.find((item) => item.id === product.id);
    if (productExit.qty === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    } else {
      setCartItems(cartItems.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty - 1 } : item)));
    }
  };

  return { cartItems, addToCart, decreaseQty };
};

export default useCart;
