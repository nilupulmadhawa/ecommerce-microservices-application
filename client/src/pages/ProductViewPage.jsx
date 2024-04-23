

import React, { useEffect, useState } from "react";
import "./productViewPage.css";
import Gallery from "../components/Gallery";
import Description from "../components/Description";
import { Rating, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { apiRequest, axiosInstance } from "../services/core/axios";
import { toast } from "react-toastify";
import { useStateContext } from "../context/ContextProvider";
export default function ProductViewPage({ shopItems, addToCart, setQty, qty }) {
    const { user } = useStateContext()
    const [quant, setQuant] = useState(0);
    const [orderedQuant, setOrderedQuant] = useState(0);
    const [review, setReview] = useState([]);
    const [value, setValue] = useState({ user: "Kasun Perera" })
    const [shopItem, setShopItem] = useState({})
    let { id } = useParams();
    const addQuant = () => {
        setQty(qty + 1);
    };

    const removeQuant = () => {
        setQty(qty - 1);
    };

    const resetQuant = () => {
        setQty(0);
        setOrderedQuant(0);
    };

    const handleAddReview = async () => {
        if (!value.rating) {
            toast.error("Please add a rating");
            return
        }
        console.log({ buyer_id: user._id, item_id: id, rating: value.rating, review: value.review });
        await apiRequest(() => axiosInstance.post(`/rating`, { buyer_id: user._id, item_id: id, user_name: user.name, item_name: shopItem.name, rating: value.rating, review: value.review })).then((res) => {
            if (res.success) {
                getReview()
                toast.success(res.message);
                setValue({ ...value, review: "", rating: 0 })
            } else {

                toast.error(res.message);
                console.log(res);
            }
        })
    }

    const getItem = async () => {
        await apiRequest(() => axiosInstance.get(`/item/${id}`)).then((res) => {
            if (res.success) {
                setShopItem(res.data[0])
                console.log(res.data);
            } else {

                toast.error(res.message);
                console.log(res);
            }
        })

    };

    const getReview = async () => {
        await apiRequest(() => axiosInstance.get(`/rating/item/${id}`)).then((res) => {
            if (res.success) {
                setReview(res.data)
                console.log(res.data);
            } else {
                console.log(res);
            }
        })

    };

    useEffect(() => {
        getItem();
        setQty(1)
        getReview();
    }, [])


    return (
        <>
            <section className="core">
                <Gallery shopItem={shopItem} />
                {/* <MobileGallery shopItem={shopItem} /> */}
                <Description
                    onQuant={qty}
                    onAdd={addQuant}
                    onRemove={removeQuant}
                    onSetOrderedQuant={setOrderedQuant}
                    shopItem={shopItem}
                    addToCart={addToCart}
                />
            </section>
            <hr style={{ borderTop: "2px solid #ededed" }} />
            <div className="cart-details" style={{ display: "flex", justifyContent: "center", flexDirection: "column", marginBottom: "20px" }}>
                <h1 style={{ textAlign: "center", margin: "10px 0" }}>Review</h1>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="cart-list product d_flex" style={{ width: "700px", display: "flex", justifyContent: "center", flexDirection: 'column', textAlign: "center" }}>
                        <div>
                            <Rating
                                name="simple-controlled"
                                value={value.rating}
                                onChange={(event, newValue) => {
                                    setValue({ ...value, rating: newValue });
                                }}
                            />
                        </div>
                        <TextField
                            sx={{ mt: 2, width: '100%', marginBottom: '10px' }}
                            id="Comment"
                            value={value.review}
                            label="Comment"
                            variant="outlined"
                            onChange={(e) => setValue({ ...value, review: e.target.value })}
                        />
                        <button className="btn-primary" onClick={handleAddReview}>
                            Add Review
                        </button>
                    </div>
                </div>
                {review.length === 0 && (
                    <h1 className="no-items product">No reviews</h1>
                )}

                {/* yasma hami le cart item lai display garaaxa */}
                {review.map((r) => {

                    return (
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <div className="cart-list product d_flex" key={r.id} style={{ width: "700px", display: "flex", justifyContent: "center", flexDirection: 'column', textAlign: "center" }}>
                                <strong style={{ textAlign: "left" }}>{r.user_name}</strong>
                                <div>
                                    <Rating
                                        name="simple-controlled"
                                        value={r.rating}
                                        readOnly
                                    // onChange={(event, newValue) => {
                                    //     setReview([newValue]);
                                    // }}
                                    />
                                </div>

                                <span>{r.review}</span>

                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
