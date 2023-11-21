import React from "react";
import "../index.css"

export const Button = ({ type, value, onSubmit }) => {
    return (
        <button
            className="buttonMain"
            type={type}
            value={value}
            onSubmit={onSubmit}
        >
            {value}
        </button>
    );
}