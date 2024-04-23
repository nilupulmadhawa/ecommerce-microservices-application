import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { Rating } from "@mui/material";

const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="control-btn" onClick={onClick}>
            <button className="next">
                <i className="fa fa-long-arrow-alt-right"></i>
            </button>
        </div>
    );
};
const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="control-btn" onClick={onClick}>
            <button className="prev">
                <i className="fa fa-long-arrow-alt-left"></i>
            </button>
        </div>
    );
};
const FlashCard = ({ productItems, addToCart }) => {
    const [count, setCount] = useState(0);
    const increment = () => {
        setCount(count + 1);
    };
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <>
            <Slider {...settings}>
                {productItems.map((productItems) => {
                    return (
                        <div className="box">
                            <div className="product mtop">

                                <Link to={'productview'}>
                                    <div className="img">
                                        {/* <span className="discount">
                                        {productItems.discount}% Off
                                        </span> */}
                                        <img src={productItems.image} alt="" />
                                        <div className="product-like">
                                            <label>{count}</label> <br />
                                            <i
                                                className="fa-regular fa-heart"
                                                onClick={increment}
                                            ></i>
                                        </div>
                                    </div>
                                </Link>

                                <div className="product-details">
                                    <Link to={'productview'}>
                                        <h3>{productItems.name}</h3>
                                    </Link>
                                    <Rating
                                        name="simple-controlled"
                                        value={productItems.rating}
                                        readOnly
                                    // onChange={(event, newValue) => {
                                    //     setReview([newValue]);
                                    // }}
                                    />
                                    <div className="price">
                                        <h4>${productItems.price}.00 </h4>
                                        {/* step : 3  
                     if hami le button ma click garryo bahne 
                    */}
                                        <button onClick={() => addToCart(productItems)}>
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </>
    );
};

export default FlashCard;
