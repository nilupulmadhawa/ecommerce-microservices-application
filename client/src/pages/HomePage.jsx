import React from 'react';
import Pages from './Pages';
import Data from '../components/Data';
import Sdata from '../components/shops/Sdata';
import useCart from '../components/useCart';

const HomePage = () => {
  const { addToCart, decreaseQty } = useCart();
  const { productItems } = Data;
  const { shopItems } = Sdata;

  return <Pages productItems={productItems} addToCart={addToCart} decreaseQty={decreaseQty} shopItems={shopItems} />;
};

export default HomePage;
