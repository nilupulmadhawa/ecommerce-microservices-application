import React, { useState } from 'react';
import Pages from './Pages';
import Data from '../components/Data';
import Sdata from '../components/shops/Sdata';
import './Home.css';
import Footer from '../components/common/footer/Footer';
import Cart from '../components/newarrivals/Cart';
import Header from '../components/common/header/Header';

const HomePage = () => {
  const { productItems } = Data;
  const { shopItems } = Sdata;

  const [CartItem, setCartItem] = useState([]);

  const addToCart = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id);

    if (productExit) {
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id
            ? { ...productExit, qty: productExit.qty + 1 }
            : item
        )
      );
    } else {
      setCartItem([...CartItem, { ...product, qty: 1 }]);
    }
  };

  const decreaseQty = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id);

    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id));
    } else {
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id
            ? { ...productExit, qty: productExit.qty - 1 }
            : item
        )
      );
    }
  };

  return (
    <>
      <Header CartItem={CartItem} />

      <Pages
        productItems={productItems}
        addToCart={addToCart}
        shopItems={shopItems}
      />
      <Cart
        CartItem={CartItem}
        addToCart={addToCart}
        decreaseQty={decreaseQty}
      />

      <Footer />
    </>
  );
};

export default HomePage;
