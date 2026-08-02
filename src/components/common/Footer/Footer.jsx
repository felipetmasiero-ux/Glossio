import { Link } from "react-router-dom";

import "./Footer.css";

import { Icon } from "../Icon/Icon";

export function Footer() {

    return (

        <footer className="app-footer">

            <div className="app-footer__inner">

                <div className="app-footer__brand">
                    <span className="app-footer__mark">
                        <Icon name="book" size={14} />
                    </span>
                    <span className="app-footer__name">Glossio</span>
                    <span className="app-footer__version text-mono-label">Versão Beta</span>
                </div>

                <nav className="app-footer__links" aria-label="Links do rodapé">
                    <Link to="/about">Sobre</Link>
                    <Link to="/roadmap">Roadmap</Link>
                </nav>

            </div>

        </footer>

    );

}
