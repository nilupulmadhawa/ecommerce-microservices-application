import React, { useEffect, useState } from 'react';
import Data from '../Data';
import { apiRequest, axiosInstance } from '../../services/core/axios';
import { toast } from 'react-toastify';
import { useStateContext } from '../../context/ContextProvider';

export default function TrackOrder() {

    const { user } = useStateContext()
    const [orderItem, setOrderItem] = useState([]);

    const getdata = async () => {
        await apiRequest(() => axiosInstance.get(`/order/buyer/${user._id}`)).then((res) => {
            if (res.success) {
                console.log(res);
                // return
                setOrderItem(res.data)
            } else {
                toast.error(res.message);
                console.log(res);
            }
        })
    }

    useEffect(() => {
        getdata()
    }, [])



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
                            return (
                                <div className="cart-list product " key={item.id}>
                                    {item['items'].map((i) => {
                                        console.log(i[0]);
                                        return (
                                            <div style={{ display: "flex" }}>
                                                <strong>{i[0].name}</strong> -
                                                <p>
                                                    ${i[0].price}.00 * {i[0].qty} =
                                                    <span>${i[0].price * i[0].qty}.00</span>
                                                </p>
                                            </div>)
                                    })}
                                    <div className="cart-items-function">
                                        <div className="removeCart">
                                            <p style={{ fontSize: '20px', fontWeight: "bold" }}>${item.total}.00</p>
                                            <p style={{ fontSize: '12px' }}>{item.created_at}</p>
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
