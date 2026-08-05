import { useAchievements } from "../../hooks/useAchievements";
import { CATEGORY_LABELS } from "../../utils/achievements";

import { Icon } from "../../components/common/Icon/Icon";
import { Badge } from "../../components/common/Badge/Badge";
import { ProgressBar } from "../../components/common/ProgressBar/ProgressBar";
import { Seo } from "../../components/common/Seo/Seo";

import "./Achievements.css";

function groupByCategory(achievements) {

    const groups = new Map();

    achievements.forEach(achievement => {
        if (!groups.has(achievement.category)) {
            groups.set(achievement.category, []);
        }
        groups.get(achievement.category).push(achievement);
    });

    return [...groups.entries()];

}

export function Achievements() {

    const achievements = useAchievements();
    const unlocked = achievements.filter(achievement => achievement.completed).length;

    const groups = groupByCategory(achievements);

    return (

        <div className="page-container achievements-page animate-fade-in">

            <Seo title="Conquistas" description="Acompanhe suas conquistas e marcos de aprendizado no Glossio." robots="noindex, nofollow" path="/achievements" />

            <p className="achievements-page__label text-mono-label">Conquistas</p>

            <h1 className="achievements-page__title">
                {unlocked} / {achievements.length} desbloqueadas
            </h1>

            {groups.map(([category, items]) => (

                <section className="achievements-page__group" key={category}>

                    <h2 className="achievements-page__group-title">{CATEGORY_LABELS[category]}</h2>

                    <ul className="achievements-page__list">
                        {items.map(achievement => (
                            <li className="achievement-row" key={achievement.id}>

                                <span className={`achievement-row__icon${achievement.completed ? " achievement-row__icon--done" : ""}`}>
                                    <Icon name={achievement.icon} size={20} />
                                </span>

                                <div className="achievement-row__body">

                                    <div className="achievement-row__heading">
                                        <p className="achievement-row__title">{achievement.title}</p>
                                        {achievement.completed && (
                                            <Badge variant="neutral">✓</Badge>
                                        )}
                                    </div>

                                    <p className="achievement-row__description">{achievement.description}</p>

                                    <div className="achievement-row__progress">
                                        <ProgressBar value={(achievement.progress / achievement.target) * 100} />
                                        <span className="achievement-row__progress-label text-mono-number">
                                            {achievement.progress} / {achievement.target}
                                        </span>
                                    </div>

                                </div>

                            </li>
                        ))}
                    </ul>

                </section>

            ))}

        </div>

    );

}
