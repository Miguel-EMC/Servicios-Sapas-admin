import React from "react";
import "./index.css";
import { Formslogin } from "../components/forms/FormLogin";

export const Login = () => {

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            height: '100%',
        },
    }

    return (
        <div className="app">
            <div className="login-container">
                <div className="login-box" style={styles.container}>
                    <div className="login images">
                    </div>
                    <div className="login forms">
                        <Formslogin />
                    </div>
                </div>
            </div>
        </div>
    );

}
