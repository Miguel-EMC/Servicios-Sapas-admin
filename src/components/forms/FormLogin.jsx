import React, { useContext, useState } from "react";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { LabelError } from "../atoms/labelError";
import { Alert } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { useNavigate } from "react-router";

export const Formslogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [userError, setUserError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext); /* Función para poder autenticarse */



    const errorTranslations = {
        'This field may not be blank.': 'Llene este campo.',
        "Invalid username or password": "Usuario o contraseña incorrectos.",
        "Enter a valid email address.": "Ingrese una dirección de correo electrónico válida."
    };

    /* VERIFICACIÓN DE USUARIO */
    const onLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/login/',
                { email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const { jwt, user } = response.data;
            localStorage.setItem('token', jwt);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/homeAdmin');
        } catch (error) {
            const responseData = error.response.data;
            const translatedErrors = Object.keys(responseData).reduce((acc, key) => {
                acc[key] = errorTranslations[responseData[key][0]] || responseData[key][0];
                return acc;
            }, {});
            setUserError(translatedErrors.email || '');
            setPasswordError(translatedErrors.password || '');
            setError(translatedErrors.non_field_errors || '');
        }
    }

    return (
        <form className="formforlogin" onSubmit={onLogin}>

            <div className="loginheader">
                <h1>Servicios Spas</h1>
                <h4>Inicio de Sesión</h4>
            </div>
            {error &&
                <Alert sx={{ backgroundColor: 'rgb(22, 11, 11)', mb: '5%', color: 'rgb(244, 199, 199)' }} severity="error">
                    {error}
                </Alert>
            }
            {userError && (
                <LabelError text={userError} />
            )}
            <Input
                type="text"
                name="username"
                id="username"
                placeholder="email"
                value={email}
                param={userError}
                onChange={(e) => setEmail(e.target.value)}

            />
            {passwordError && (
                <LabelError text={passwordError} />
            )}
            <Input
                type="password"
                name="password"
                id="password"
                placeholder="Contraseña"
                value={password}
                param={passwordError}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" value="Iniciar Sesión" onSubmit={onLogin} />

            <h3>Ha olvidado su contraseña/usuario?</h3>
        </form>
    );
}