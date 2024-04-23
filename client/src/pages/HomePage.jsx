import React, { useEffect, useState } from 'react';
import Data from '../components/Data';
import Sdata from '../components/shops/Sdata';
import './Home.css';

import { Outlet, useLocation } from 'react-router-dom'; // add this import
import Footer from '../common/footer/Footer';
import Header from '../common/header/Header';
import Cart from '../common/Cart/Cart';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Pages from '../pages/Pages';
import ProductViewPage from './ProductViewPage';
import Shop from '../components/shops/Shop';
import PaymentSuccess from '../components/payments/PaymentSuccess'
import TrackOrder from '../components/MainPage/TrackOrder';
import { apiRequest, axiosInstance } from '../services/core/axios';
import { toast } from 'react-toastify';

const GestLayout = () => {
    /*
    step1 :  const { productItems } = Data 
    lai pass garne using props
    
    Step 2 : item lai cart ma halne using useState
    ==> CartItem lai pass garre using props from  <Cart CartItem={CartItem} /> ani import garrxa in cartItem ma
   
    Step 3 :  chai flashCard ma xa button ma
  
    Step 4 :  addToCart lai chai pass garne using props in pages and cart components
    */

    //Step 1 :
    // const { productItems } = Data;
    // const { shopItems } = Sdata;
    const [productItems, setProductItems] = useState([]);
    const [shopItems, setShopItems] = useState([]);

    const getItem = async () => {
        await apiRequest(() => axiosInstance.get(`/item`)).then((res) => {
            if (res.success) {
                setProductItems(res.data)
                setShopItems(res.data)
            } else {

                toast.error(res.message);
                console.log(res);
            }
        })

    };

    useEffect(() => {
        getItem();
    }, []);


    //Step 2 :
    const [CartItem, setCartItem] = useState([]);
    const [qty, setQty] = useState(1);

    //Step 4 :
    const addToCart = (product) => {
        // if hamro product alredy cart xa bhane  find garna help garxa
        const productExit = CartItem.find((item) => item._id === product._id);
        // if productExit chai alredy exit in cart then will run fun() => setCartItem
        // ani inside => setCartItem will run => map() ani yo map() chai each cart ma
        // gayara check garxa if item.id ra product.id chai match bhayo bhane
        // productExit product chai display garxa
        // ani increase  exits product QTY by 1
        // if item and product doesnt match then will add new items
        if (productExit) {
            setCartItem(
                CartItem.map((item) =>
                    item._id === product._id
                        ? { ...productExit, qty: productExit.qty + 1 }
                        : item
                )
            );
        } else {
            // but if the product doesnt exit in the cart that mean if card is empty
            // then new product is added in cart  and its qty is initalize to 1
            setCartItem([...CartItem, { ...product, qty: qty }]);
        }
    };

    // Stpe: 6
    const decreaseQty = (product) => {
        // if hamro product alredy cart xa bhane  find garna help garxa
        const productExit = CartItem.find((item) => item._id === product._id);

        // if product is exit and its qty is 1 then we will run a fun  setCartItem
        // inside  setCartItem we will run filter to check if item.id is match to product.id
        // if the item.id is doesnt match to product.id then that items are display in cart
        // else
        if (productExit.qty === 1) {
            setCartItem(CartItem.filter((item) => item._id !== product._id));
        } else {
            // if product is exit and qty  of that produt is not equal to 1
            // then will run function call setCartItem
            // inside setCartItem we will run map method
            // this map() will check if item.id match to produt.id  then we have to desc the qty of product by 1
            setCartItem(
                CartItem.map((item) =>
                    item._id === product._id
                        ? { ...productExit, qty: productExit.qty - 1 }
                        : item
                )
            );
        }
    };
    const location = useLocation(); // get the current location
    console.log(location.pathname.slice(0, 13));
    return (
        <>
            <Header CartItem={CartItem} />
            {location.pathname === '/' && (
                <Pages productItems={productItems} addToCart={addToCart} shopItems={shopItems} />
            )}

            {location.pathname === '/cart' && (
                <Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />
            )}
            {location.pathname.slice(0, 13) === '/productview/' && (
                <ProductViewPage CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} shopItems={shopItems} setQty={setQty} qty={qty} />
            )}
            {location.pathname === '/shop' && (
                <Shop CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} shopItems={shopItems} />
            )}
            {location.pathname === '/paymentsuccess' && (
                <PaymentSuccess />
            )}
            {location.pathname === '/track' && (
                <TrackOrder />
            )}


            <Footer />

        </>
    );
};

export default GestLayout;
