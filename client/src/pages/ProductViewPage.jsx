

import React, { useState } from "react";
import "./productViewPage.css";
import Gallery from "../components/Gallery";
import Description from "../components/Description";
// import MobileGallery from "../components/MobileGallery";
export default function ProductViewPage({ shopItems, addToCart }) {

    const [quant, setQuant] = useState(0);
    const [orderedQuant, setOrderedQuant] = useState(0);

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

        </>
    );
}
