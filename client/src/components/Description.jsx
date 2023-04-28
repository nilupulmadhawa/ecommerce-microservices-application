import React from "react";
import CartIcon from "./Icons/CartIcon";
import QuantityButton from "./QuantityButton";

const Description = ({ onQuant, onAdd, onRemove, onSetOrderedQuant, shopItem, addToCart }) => {
    return (
        <section className="description">
            <p className="pre">herbal inc</p>
            <h2>{shopItem.name}</h2>
            <p className="desc">Only Natural’s For Women Only is a once-daily multivitamin that may provide nutritional support for hair‚ skin‚ nails‚ energy‚ digestion‚ hormonal balance and breast and bone health necessary for an active lifestyle.
            </p>
            <div className="price">
                <div className="main-tag">
                    <p>${shopItem.price}</p>
                </div>
            </div>
            <div className="buttons">
                <QuantityButton onQuant={onQuant} onRemove={onRemove} onAdd={onAdd} />
                <button
                    className="add-to-cart"
                    onClick={() => {
                        addToCart(shopItem);
                    }}
                >
                    <CartIcon />
                    add to cart
                </button>
            </div>
        </section>
    );
};

export default Description;
