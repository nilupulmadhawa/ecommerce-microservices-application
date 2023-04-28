import React from "react";

const QuantityButton = ({ onQuant, onRemove, onAdd }) => {
    return (
        <div className="amount">
            <button className="minus" onClick={onRemove} disabled={onQuant === 0} style={{ fontWeight: "bold", fontSize: "20px", color: "#006a39" }}>
                -
            </button>
            <p>{onQuant}</p>
            <button className="plus" onClick={onAdd} disabled={onQuant === 100} style={{ fontWeight: "bold", fontSize: "20px", color: "#006a39" }}>
                +
            </button>
        </div>
    );
};

export default QuantityButton;
