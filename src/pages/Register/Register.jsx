import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { Input } from "../../components/common/Input/Input";
import { Button } from "../../components/common/Button/Button";
import { Seo } from "../../components/common/Seo/Seo";
import { trackEvent, ANALYTICS_EVENTS } from "../../utils/analytics";

import "../Login/Login.css";

export function Register() {

    const { register } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            await register({ name, email, password });
            // Fired only after register() resolves - a real account now
            // exists in the backend, not just a submitted form (an error
            // caught below never reaches this line). "method: email" keeps
            // this comparable if a social-login option is ever added later.
            trackEvent(ANALYTICS_EVENTS.SIGN_UP, { method: "email" });
            // A brand-new account never has a language chosen yet - unlike
            // Login, this must never fall back to "/home" based on
            // localStorage, which reflects the browser's last session, not
            // this new account (see Navbar's handleLogout, which clears it
            // precisely so it can't leak into the next account created on
            // the same browser).
            navigate("/choose-language", { replace: true });
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (

        <div className="page-container auth-page animate-fade-in">

            <Seo title="Criar conta" description="Crie sua conta gratuita no Glossio e comece a aprender um novo idioma hoje." path="/register" />

            <p className="auth-page__label text-mono-label">Glossio</p>

            <h1 className="auth-page__title">Criar conta</h1>

            <form className="auth-page__form" onSubmit={handleSubmit}>

                <Input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={event => setName(event.target.value)}
                />

                <Input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />

                <Input
                    type="password"
                    placeholder="Senha (mínimo 8 caracteres)"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />

                {error && <p className="auth-page__error" role="alert">{error}</p>}

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Criando conta..." : "Criar conta"}
                </Button>

            </form>

            <p className="auth-page__switch">
                Já tem uma conta? <Link to="/login">Entrar</Link>
            </p>

        </div>

    );

}
