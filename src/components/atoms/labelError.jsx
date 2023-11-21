import React from "react";
import "../index.css"

export const LabelError = ({text}) => {
    return (
        <label className="labelError" htmlFor="username">
            <span className="spanError">{text}</span>
        </label>
    );


}