import "./Home.css";

import { useDashboardData } from "../../hooks/useDashboardData";

import { DashboardSection } from "../../components/home/DashboardSection/DashboardSection";
import { HeroCard } from "../../components/home/HeroCard/HeroCard";
import { ContinueLearningCard } from "../../components/home/ContinueLearningCard/ContinueLearningCard";
import { DailyGoalCard } from "../../components/home/DailyGoalCard/DailyGoalCard";
import { ReviewsCard } from "../../components/home/ReviewsCard/ReviewsCard";
import { CourseCard } from "../../components/home/CourseCard/CourseCard";
import { QuickStatsCard } from "../../components/home/QuickStatsCard/QuickStatsCard";
import { AchievementCard } from "../../components/home/AchievementCard/AchievementCard";
import { ResumeActivityCard } from "../../components/home/ResumeActivityCard/ResumeActivityCard";

export function Home() {

    const dashboard = useDashboardData();

    return (

        <div className="page-container home-dashboard">

            <section className="home-dashboard__hero animate-fade-in">
                <HeroCard greeting={dashboard.greeting} language={dashboard.language} />
                <ContinueLearningCard continueLearning={dashboard.continueLearning} />
            </section>

            <div className="home-dashboard__row animate-slide-up">
                <DailyGoalCard dailyGoal={dashboard.dailyGoal} />
                <ReviewsCard reviews={dashboard.reviews} />
            </div>

            <DashboardSection title="Continuar curso" icon="book">
                <div className="home-dashboard__courses">
                    {dashboard.courses.map(course => (
                        <CourseCard key={course.language} course={course} />
                    ))}
                </div>
            </DashboardSection>

            <DashboardSection title="Estatísticas rápidas" icon="target">
                <QuickStatsCard quickStats={dashboard.quickStats} />
            </DashboardSection>

            <DashboardSection title="Conquista recente" icon="star">
                <AchievementCard achievement={dashboard.recentAchievement} />
            </DashboardSection>

            {dashboard.lastActivity && (
                <DashboardSection title="Continuar de onde parou" icon="clock">
                    <ResumeActivityCard activity={dashboard.lastActivity} />
                </DashboardSection>
            )}

        </div>

    );

}
