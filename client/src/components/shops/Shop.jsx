import React from 'react';
import Categories from '../MainPage/Categories';
import ShopCart from './ShopCart';
import {
    Link, useLocation
} from 'react-router-dom';
import './style.css';

const Shop = ({ addToCart, shopItems }) => {

    const location = useLocation();

    return (
        <>
            <section className="shop background">
                <div className="container d_flex">
                    <Categories />

                    <div className="contentWidth">
                        <div className="heading d_flex">
                            <div className="heading-left row  f_flex">
                                <h2>Herbel Products</h2>
                            </div>
                            {location.pathname === '/' && (
                                <Link to="/shop" className="heading-right row ">
                                    <span>View all</span>
                                    <i className="fa-solid fa-caret-right"></i>
                                </Link>
                            )}

                        </div>
                        <div className="product-content  grid1">
                            <ShopCart addToCart={addToCart} shopItems={shopItems} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Shop;
