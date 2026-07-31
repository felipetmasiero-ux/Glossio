import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { Input } from "../../components/common/Input/Input";
import { Button } from "../../components/common/Button/Button";

import "./Login.css";

export function Login() {

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            await login(email, password);
            const redirectTo = location.state?.from?.pathname
                || (localStorage.getItem("language") ? "/home" : "/choose-language");
            navigate(redirectTo, { replace: true });
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (

        <div className="page-container auth-page animate-fade-in">

            <p className="auth-page__label text-mono-label">Glossio</p>

            <h1 className="auth-page__title">Entrar</h1>

            <form className="auth-page__form" onSubmit={handleSubmit}>

                <Input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />

                <Input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />

                {error && <p className="auth-page__error" role="alert">{error}</p>}

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Entrando..." : "Entrar"}
                </Button>

            </form>

            <p className="auth-page__switch">
                Ainda não tem uma conta? <Link to="/register">Cadastre-se</Link>
            </p>

        </div>

    );

}
