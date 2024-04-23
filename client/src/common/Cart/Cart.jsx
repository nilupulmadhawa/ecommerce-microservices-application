import React from 'react';
import './style.css';
import axios from 'axios';
import { useStateContext } from '../../context/ContextProvider';
import { apiRequest, axiosInstance } from '../../services/core/axios';
import { toast } from 'react-toastify';


const Cart = ({ CartItem, addToCart, decreaseQty }) => {

    const { user } = useStateContext()
    // Stpe: 7   calucate total of items
    const totalPrice = CartItem.reduce(
        (price, item) => price + item.qty * item.price,
        0
    );

    const handleCheckout = () => {

        axios.post(process.env.REACT_APP_BACKEND_URL + '/create-payment-intent', { cartItems: CartItem })
            .then(function (res) {
                window.location.href = res.data.url;
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    const submitvalue = async () => {
        await apiRequest(() => axiosInstance.post(`/order`,
            {
                "buyer_id": user._id,
                "seller_id": "6443bda95337082dba23daf7",
                "total": totalPrice,
                "commission": totalPrice * 0.1,
                "seller_profit": totalPrice * 0.9,
                "items": CartItem

            })).then((res) => {
                if (res.success) {
                    console.log(res);
                    // return
                    handleCheckout()
                } else {
                    toast.error(res.message);
                    console.log(res);
                }
            })
    }

    // prodcut qty total
    return (
        <>
            <section className="cart-items">
                <div className="container d_flex">
                    {/* if hamro cart ma kunai pani item xaina bhane no diplay */}

                    <div className="cart-details">
                        {CartItem.length === 0 && (
                            <h1 className="no-items product">No Items are add in Cart</h1>
                        )}

                        {/* yasma hami le cart item lai display garaaxa */}
                        {CartItem.map((item) => {
                            const productQty = item.price * item.qty;

                            return (
                                <div className="cart-list product d_flex" key={item.id}>
                                    <div className="img">
                                        <img src={item.image} alt="" />
                                    </div>
                                    <div className="cart-details">
                                        <h3>{item.name}</h3>
                                        <h4>
                                            ${item.price}.00 * {item.qty}
                                            <span>${productQty}.00</span>
                                        </h4>
                                    </div>
                                    <div className="cart-items-function">
                                        <div className="removeCart">
                                            {/* <button className="removeCart">
                                                <i className="fa-solid fa-xmark"></i>
                                            </button> */}
                                        </div>
                                        {/* stpe: 5 
                    product ko qty lai inc ra des garne
                    */}
                                        <div className="cartControl d_flex">
                                            <button
                                                className="incCart"
                                                onClick={() => addToCart(item)}
                                            >
                                                <i className="fa-solid fa-plus"></i>
                                            </button>
                                            <button
                                                className="desCart"
                                                onClick={() => decreaseQty(item)}
                                            >
                                                <i className="fa-solid fa-minus"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="cart-item-price"></div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="cart-total product">
                        <h2>Cart Summary</h2>
                        <div className=" d_flex">
                            <h4>Total Price :</h4>
                            <h3>${totalPrice}.00</h3>
                        </div>
                        <div class="form-floating mb-2">
                            <h4>Shipping Method :</h4>
                            <div style={{ display: "flex", justifyContent: "space-around", margin: "15px" }}>
                                <div style={{ display: "flex" }}>
                                    <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off" checked value="talaba" />
                                    <label class="btn btn-outline-primary" for="option1">
                                        <img style={{ width: "50px", marginLeft: "5px" }} src="https://logodownload.org/wp-content/uploads/2015/12/dhl-logo-0-1.png" /></label>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <input type="radio" class="btn-check" name="options" id="option2" autocomplete="off" checked value="talaba" />
                                    <label class="btn btn-outline-primary" for="option2">
                                        <img style={{ width: "50px", marginLeft: "5px" }} src="https://companieslogo.com/img/orig/FDX_BIG-6371a0f3.png?t=1648042471" /></label>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary" onClick={submitvalue}>Checkout</button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Cart;
