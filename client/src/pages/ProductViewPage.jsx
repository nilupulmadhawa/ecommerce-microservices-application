

import React, { useState } from "react";
import "./productViewPage.css";
import Gallery from "../components/Gallery";
import Description from "../components/Description";
import { Rating, TextField } from "@mui/material";
export default function ProductViewPage({ shopItems, addToCart }) {

    const [quant, setQuant] = useState(0);
    const [orderedQuant, setOrderedQuant] = useState(0);
    const [review, setReview] = useState([{ user: "John Smith", rating: 5, comment: "Thank you very much seller definitely recommend seller and product " }, { user: "James William", rating: 5, comment: "I liked the product, although now it does take too long to arrive, I no longer expected it" }]);
    const [value, setValue] = useState({ user: "Kasun Perera" })

    const addQuant = () => {
        setQuant(quant + 1);
    };

    const removeQuant = () => {
        setQuant(quant - 1);
    };

    const resetQuant = () => {
        setQuant(0);
        setOrderedQuant(0);
    };

    const handleAddReview = () => {
        console.log();
        setReview([...review, value])
        setValue({ user: "Kasun Perera" })
    }

    return (
        <>
            <section className="core">
                <Gallery shopItem={shopItems[0]} />
                {/* <MobileGallery shopItem={shopItems[0]} /> */}
                <Description
                    onQuant={quant}
                    onAdd={addQuant}
                    onRemove={removeQuant}
                    onSetOrderedQuant={setOrderedQuant}
                    shopItem={shopItems[0]}
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
                            value={value.comment}
                            label="Comment"
                            variant="outlined"
                            onChange={(e) => setValue({ ...value, comment: e.target.value })}
                        />
                        <button className="btn-primary" onClick={handleAddReview}>
                            Add Review
                        </button>
                    </div>
                </div>
                {review.length === 0 && (
                    <h1 className="no-items product">No Items are add in Cart</h1>
                )}

                {/* yasma hami le cart item lai display garaaxa */}
                {review.map((r) => {

                    return (
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <div className="cart-list product d_flex" key={r.id} style={{ width: "700px", display: "flex", justifyContent: "center", flexDirection: 'column', textAlign: "center" }}>
                                <strong style={{ textAlign: "left" }}>{r.user}</strong>
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

                                <span>{r.comment}</span>

                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
