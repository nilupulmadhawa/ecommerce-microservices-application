import React, { useState, useEffect } from "react";


const Gallery = ({ shopItem }) => {
    return (
        <section className="gallery-holder hide-in-mobile">
            <section className="gallery">
                <div className="image">
                    <img src={shopItem.cover} alt="product-1" />
                </div>
            </section>
        </section>
    );
};

export default Gallery;
