import { Component } from "react";

import { EmptyState } from "../EmptyState/EmptyState";
import { captureException } from "../../../utils/errorTracking";

import "./ErrorBoundary.css";

// React error boundaries only exist as class components - there is no
// hook equivalent (getDerivedStateFromError/componentDidCatch have no
// function-component form). Meant to be mounted once, at the highest
// point in the tree (see main.jsx, wrapping <BrowserRouter><App /></
// BrowserRouter>) - a boundary placed only inside App.jsx would miss an
// error thrown by one of the context providers, which also render inside
// App's own tree.
export class ErrorBoundary extends Component {

    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        captureException(error, { componentStack: info.componentStack });
    }

    handleReload = () => {
        window.location.reload();
    };

    handleGoHome = () => {
        // A hard navigation, not react-router's navigate(): after a broken
        // render tree, a client-side route change risks re-entering the
        // same broken tree. A real reload is the safe default post-crash.
        window.location.href = "/";
    };

    render() {

        if (this.state.hasError) {
            return (
                <div className="error-boundary-page">
                    <EmptyState
                        icon="alert"
                        title="Algo deu errado."
                        description="Encontramos um erro inesperado. Você pode tentar recarregar a página ou voltar ao início."
                        actionLabel="Recarregar página"
                        onAction={this.handleReload}
                        secondaryLabel="Voltar ao início"
                        onSecondaryAction={this.handleGoHome}
                    />
                </div>
            );
        }

        return this.props.children;

    }

}
