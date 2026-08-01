import "./Home.css";

import { useDashboardData } from "../../hooks/useDashboardData";
import { useStatistics } from "../../hooks/useStatistics";
import { useAchievements } from "../../hooks/useAchievements";
import { getAchievementsSummary } from "../../utils/achievements";

import { DashboardSection } from "../../components/home/DashboardSection/DashboardSection";
import { PrimaryActionCard } from "../../components/home/PrimaryActionCard/PrimaryActionCard";
import { HeroCard } from "../../components/home/HeroCard/HeroCard";
import { ContinueLearningCard } from "../../components/home/ContinueLearningCard/ContinueLearningCard";
import { DailyGoalCard } from "../../components/home/DailyGoalCard/DailyGoalCard";
import { ReviewsCard } from "../../components/home/ReviewsCard/ReviewsCard";
import { CourseCard } from "../../components/home/CourseCard/CourseCard";
import { QuickStatsCard } from "../../components/home/QuickStatsCard/QuickStatsCard";
import { AchievementCard } from "../../components/home/AchievementCard/AchievementCard";
import { ResumeActivityCard } from "../../components/home/ResumeActivityCard/ResumeActivityCard";
import { AchievementsSummaryCard } from "../../components/home/AchievementsSummaryCard/AchievementsSummaryCard";
import { StatisticsSummaryCard } from "../../components/home/StatisticsSummaryCard/StatisticsSummaryCard";
import { FavoritesSummaryCard } from "../../components/home/FavoritesSummaryCard/FavoritesSummaryCard";
import { PlacementTestCard } from "../../components/home/PlacementTestCard/PlacementTestCard";

import { PlacementTestStorage } from "../../utils/placementTest/placementTestStorage";

export function Home() {

    const dashboard = useDashboardData();
    const statistics = useStatistics();
    const achievements = useAchievements();
    const achievementsSummary = getAchievementsSummary(achievements);
    const latestPlacementResult = PlacementTestStorage.getLatestResult();

    return (

        <div className="page-container home-dashboard">

            <section className="home-dashboard__hero animate-fade-in">
                <HeroCard greeting={dashboard.greeting} language={dashboard.language} />
                <PrimaryActionCard nextStep={dashboard.nextStep} />
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

            <div className="home-dashboard__row animate-slide-up">
                <AchievementsSummaryCard summary={achievementsSummary} />
                <StatisticsSummaryCard statistics={statistics} />
            </div>

            <DashboardSection title="Favoritos" icon="star">
                <FavoritesSummaryCard favoriteCount={statistics.favoriteWords} />
            </DashboardSection>

            <DashboardSection title="Teste de nivelamento" icon="target">
                <PlacementTestCard latestResult={latestPlacementResult} />
            </DashboardSection>

            {dashboard.lastActivity && (
                <DashboardSection title="Continuar de onde parou" icon="clock">
                    <ResumeActivityCard activity={dashboard.lastActivity} />
                </DashboardSection>
            )}

        </div>

    );

}
