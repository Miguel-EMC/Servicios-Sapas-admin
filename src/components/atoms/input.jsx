import React from "react";
import "../index.css"
export const Input = ({ type, placeholder, name, value, id, onChange, param }) => {
    return (
        <input
            className={param ? "inputMainError" : "inputMain"} 
            type={type}
            placeholder={placeholder}
            name={name}
            id={id}
            onChange={onChange}
            defaultValue={value}
        />
    );
}