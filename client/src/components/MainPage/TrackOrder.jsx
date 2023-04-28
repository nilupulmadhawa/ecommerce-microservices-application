import React, { useState } from 'react';
import Data from '../Data';

export default function TrackOrder() {
    const { orderItem } = Data;

    return (
        <>
            <section className="cart-items">
                <h3 style={{ textAlign: "center" }}>My Orders</h3>
                <div className="container d_flex" style={{ justifyContent: 'center' }}>
                    {/* if hamro cart ma kunai pani item xaina bhane no diplay */}

                    <div className="cart-details">
                        {orderItem.length === 0 && (
                            <h1 className="no-items product">No Items are add in Cart</h1>
                        )}

                        {/* yasma hami le cart item lai display garaaxa */}
                        {orderItem.map((item) => {
                            const productQty = item.price * item.qty;

                            return (
                                <div className="cart-list product d_flex" key={item.id}>
                                    <div className="img">
                                        <img src={item.cover} alt="" />
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
                                            <p style={{ fontSize: '20px', fontWeight: "bold" }}>{item.id}</p>
                                            <p style={{ fontSize: '12px' }}>{item.date}</p>
                                        </div>
                                        <div className="removeCart">
                                            <span className='btn' style={{ fontSize: "16px", backgroundColor: "#006a39", color: "#fff", padding: "10px", borderRadius: "20px" }}>{item.status}</span>
                                        </div>

                                    </div>

                                    <div className="cart-item-price"></div>
                                </div>
                            );
                        })}
                    </div>


                </div>
            </section>
        </>
    );
}
