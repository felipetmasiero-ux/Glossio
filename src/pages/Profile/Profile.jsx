import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { useLanguage } from "../../hooks/useLanguage";
import { useDashboardData } from "../../hooks/useDashboardData";
import { getUser, updateUser as updateUserRequest, changePassword as changePasswordRequest } from "../../api/userApi";
import { PlacementTestStorage } from "../../utils/placementTest/placementTestStorage";

import { QuickStatsCard } from "../../components/home/QuickStatsCard/QuickStatsCard";
import { Button } from "../../components/common/Button/Button";
import { Input } from "../../components/common/Input/Input";
import { Section } from "../../components/common/Section/Section";
import { Avatar } from "../../components/common/Avatar/Avatar";
import { Toast } from "../../components/common/Toast/Toast";

import "./Profile.css";

const FLAGS = {
    English: "🇺🇸",
    French: "🇫🇷",
    Portuguese: "🇧🇷"
};

const PREFERRED_LANGUAGES = ["English", "French", "Portuguese"];

const RESET_KEYS = [
    "lessonProgress",
    "exerciseProgress",
    "videoProgress",
    "flashcards",
    "events",
    "studyHistory",
    "lastActivity"
];

const EMPTY_FORM = {
    name: "",
    avatarUrl: "",
    bio: "",
    preferredLanguage: "",
    country: "",
    timezone: ""
};

function formatDate(value) {
    if (!value) return "—";
    return new Date(value).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

export function Profile() {

    const { language } = useLanguage();
    const { updateUser: updateAuthUser } = useAuth();
    const dashboard = useDashboardData();
    const latestPlacementResult = PlacementTestStorage.getLatestResult();

    const [profile, setProfile] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);
    const [isSavingAccount, setIsSavingAccount] = useState(false);
    const [accountError, setAccountError] = useState("");

    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    const [passwordError, setPasswordError] = useState("");
    const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

    const [toastMessage, setToastMessage] = useState("");
    const [confirmingReset, setConfirmingReset] = useState(false);

    useEffect(() => {
        getUser()
            .then(({ user }) => {
                setProfile(user);
                setForm({
                    name: user.name || "",
                    avatarUrl: user.avatarUrl || "",
                    bio: user.bio || "",
                    preferredLanguage: user.preferredLanguage || "",
                    country: user.country || "",
                    timezone: user.timezone || ""
                });
            })
            .catch(() => {})
            .finally(() => setIsLoadingProfile(false));
    }, []);

    function showToast(message) {
        setToastMessage(message);
        setTimeout(() => setToastMessage(""), 2500);
    }

    function handleFormChange(field, value) {
        setForm(previous => ({ ...previous, [field]: value }));
    }

    async function handleAccountSubmit(event) {
        event.preventDefault();
        setAccountError("");
        setIsSavingAccount(true);

        try {
            const { user: updated } = await updateUserRequest(form);
            setProfile(updated);
            updateAuthUser(updated);
            showToast("Perfil salvo.");
        } catch (err) {
            setAccountError(err.message);
        } finally {
            setIsSavingAccount(false);
        }
    }

    function handlePasswordFormChange(field, value) {
        setPasswordForm(previous => ({ ...previous, [field]: value }));
    }

    async function handlePasswordSubmit(event) {
        event.preventDefault();
        setPasswordError("");

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setPasswordError("As senhas não coincidem.");
            return;
        }

        setIsSubmittingPassword(true);

        try {
            await changePasswordRequest({
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword
            });
            setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
            setIsChangingPassword(false);
            showToast("Senha alterada.");
        } catch (err) {
            setPasswordError(err.message);
        } finally {
            setIsSubmittingPassword(false);
        }
    }

    function handleReset() {
        RESET_KEYS.forEach(key => localStorage.removeItem(key));
        window.location.href = "/choose-language";
    }

    return (

        <div className="page-container profile-page animate-fade-in">

            <p className="profile-page__label text-mono-label">Perfil</p>

            <h1 className="profile-page__title">Sua conta</h1>

            {!isLoadingProfile && (

                <Section title="Conta">

                    <form className="profile-page__form" onSubmit={handleAccountSubmit}>

                        <div className="profile-page__avatar-row">
                            <Avatar name={form.name} avatarUrl={form.avatarUrl} size={56} />
                            <Input
                                placeholder="URL do avatar"
                                value={form.avatarUrl}
                                onChange={event => handleFormChange("avatarUrl", event.target.value)}
                            />
                        </div>

                        <label className="profile-page__field-label" htmlFor="profile-name">Nome</label>
                        <Input
                            id="profile-name"
                            placeholder="Nome"
                            value={form.name}
                            onChange={event => handleFormChange("name", event.target.value)}
                        />

                        <label className="profile-page__field-label" htmlFor="profile-email">E-mail</label>
                        <Input id="profile-email" value={profile?.email || ""} disabled />

                        <label className="profile-page__field-label" htmlFor="profile-preferred-language">Idioma preferido</label>
                        <select
                            id="profile-preferred-language"
                            className="input"
                            value={form.preferredLanguage}
                            onChange={event => handleFormChange("preferredLanguage", event.target.value)}
                        >
                            <option value="">Nenhum</option>
                            {PREFERRED_LANGUAGES.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>

                        <label className="profile-page__field-label" htmlFor="profile-country">País</label>
                        <Input
                            id="profile-country"
                            placeholder="País"
                            value={form.country}
                            onChange={event => handleFormChange("country", event.target.value)}
                        />

                        <label className="profile-page__field-label" htmlFor="profile-timezone">Timezone</label>
                        <Input
                            id="profile-timezone"
                            placeholder="Ex: America/Sao_Paulo"
                            value={form.timezone}
                            onChange={event => handleFormChange("timezone", event.target.value)}
                        />

                        <label className="profile-page__field-label" htmlFor="profile-bio">Bio</label>
                        <textarea
                            id="profile-bio"
                            className="input"
                            rows={3}
                            placeholder="Fale um pouco sobre você"
                            value={form.bio}
                            onChange={event => handleFormChange("bio", event.target.value)}
                        />

                        {accountError && <p className="profile-page__error" role="alert">{accountError}</p>}

                        <Button type="submit" disabled={isSavingAccount}>
                            {isSavingAccount ? "Salvando..." : "Salvar"}
                        </Button>

                    </form>

                </Section>

            )}

            <Section title="Segurança">

                {!isChangingPassword ? (
                    <Button variant="secondary" onClick={() => setIsChangingPassword(true)}>
                        Alterar senha
                    </Button>
                ) : (
                    <form className="profile-page__form" onSubmit={handlePasswordSubmit}>

                        <Input
                            type="password"
                            placeholder="Senha atual"
                            value={passwordForm.currentPassword}
                            onChange={event => handlePasswordFormChange("currentPassword", event.target.value)}
                        />

                        <Input
                            type="password"
                            placeholder="Nova senha"
                            value={passwordForm.newPassword}
                            onChange={event => handlePasswordFormChange("newPassword", event.target.value)}
                        />

                        <Input
                            type="password"
                            placeholder="Confirmar nova senha"
                            value={passwordForm.confirmPassword}
                            onChange={event => handlePasswordFormChange("confirmPassword", event.target.value)}
                        />

                        {passwordError && <p className="profile-page__error" role="alert">{passwordError}</p>}

                        <div className="profile-page__confirm">
                            <Button type="submit" disabled={isSubmittingPassword}>
                                {isSubmittingPassword ? "Salvando..." : "Salvar nova senha"}
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => {
                                    setIsChangingPassword(false);
                                    setPasswordError("");
                                    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
                                }}
                            >
                                Cancelar
                            </Button>
                        </div>

                    </form>
                )}

            </Section>

            {profile && (
                <Section title="Dados">
                    <p className="profile-page__meta">Conta criada em {formatDate(profile.createdAt)}</p>
                    <p className="profile-page__meta">Última atualização em {formatDate(profile.updatedAt)}</p>
                </Section>
            )}

            <Section title="Teste de nivelamento">
                {latestPlacementResult ? (
                    <p className="profile-page__meta">
                        Último teste: {latestPlacementResult.language} {latestPlacementResult.recommendedLevel}
                    </p>
                ) : (
                    <p className="profile-page__meta">Você ainda não fez o teste de nivelamento.</p>
                )}
            </Section>

            <div className="profile-page__language">
                <span className="profile-page__flag">{FLAGS[language] ?? "🌐"}</span>
                <span className="profile-page__language-name">{language || "Nenhum idioma selecionado"}</span>
                <Link to="/choose-language" className="profile-page__switch-link">
                    Trocar idioma
                </Link>
            </div>

            <div className="profile-page__links">
                <Link to="/statistics" className="profile-page__switch-link">Estatísticas</Link>
                <Link to="/achievements" className="profile-page__switch-link">Conquistas</Link>
            </div>

            <QuickStatsCard quickStats={dashboard.quickStats} />

            <div className="profile-page__danger">

                <h2 className="profile-page__danger-title">Zona de risco</h2>

                <p className="profile-page__danger-description">
                    Isso apaga todo o seu progresso salvo neste dispositivo — lições, exercícios,
                    flashcards e estatísticas. Essa ação não pode ser desfeita.
                </p>

                {
                    !confirmingReset ? (
                        <Button variant="danger" onClick={() => setConfirmingReset(true)}>
                            Resetar progresso
                        </Button>
                    ) : (
                        <div className="profile-page__confirm">
                            <span className="profile-page__confirm-label">Tem certeza?</span>
                            <Button variant="danger" onClick={handleReset}>
                                Sim, apagar tudo
                            </Button>
                            <Button variant="secondary" onClick={() => setConfirmingReset(false)}>
                                Cancelar
                            </Button>
                        </div>
                    )
                }

            </div>

            <Toast message={toastMessage} />

        </div>

    );

}
