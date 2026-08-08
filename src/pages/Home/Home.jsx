import "./Home.css";

import { Seo } from "../../components/common/Seo/Seo";
import { useDashboardData } from "../../hooks/useDashboardData";
import { useStatistics } from "../../hooks/useStatistics";
import { useAchievements } from "../../hooks/useAchievements";
import { getAchievementsSummary } from "../../utils/achievements";

import { DashboardSection } from "../../components/home/DashboardSection/DashboardSection";
import { PrimaryActionCard } from "../../components/home/PrimaryActionCard/PrimaryActionCard";
import { HeroCard } from "../../components/home/HeroCard/HeroCard";
import { ContinueLearningCard } from "../../components/home/ContinueLearningCard/ContinueLearningCard";
import { ReviewsCard } from "../../components/home/ReviewsCard/ReviewsCard";
import { CourseCard } from "../../components/home/CourseCard/CourseCard";
import { QuickStatsCard } from "../../components/home/QuickStatsCard/QuickStatsCard";
import { AchievementCard } from "../../components/home/AchievementCard/AchievementCard";
import { ResumeActivityCard } from "../../components/home/ResumeActivityCard/ResumeActivityCard";
import { AchievementsSummaryCard } from "../../components/home/AchievementsSummaryCard/AchievementsSummaryCard";
import { StatisticsSummaryCard } from "../../components/home/StatisticsSummaryCard/StatisticsSummaryCard";
import { FavoritesSummaryCard } from "../../components/home/FavoritesSummaryCard/FavoritesSummaryCard";
import { PlacementTestCard } from "../../components/home/PlacementTestCard/PlacementTestCard";
import { ActivityHeatmap } from "../../components/home/ActivityHeatmap/ActivityHeatmap";
import { StudyStreakCard } from "../../components/home/StudyStreakCard/StudyStreakCard";
import { UpcomingReviewsCard } from "../../components/home/UpcomingReviewsCard/UpcomingReviewsCard";
import { RecentActivityCard } from "../../components/home/RecentActivityCard/RecentActivityCard";
import { VocabularyDistributionCard } from "../../components/home/VocabularyDistributionCard/VocabularyDistributionCard";
import { WeeklyEvolutionCard } from "../../components/home/WeeklyEvolutionCard/WeeklyEvolutionCard";
import { GoalsProgressCard } from "../../components/home/GoalsProgressCard/GoalsProgressCard";
import { RecommendedForYouCard } from "../../components/home/RecommendedForYouCard/RecommendedForYouCard";

import { PlacementTestStorage } from "../../utils/placementTest/placementTestStorage";
import { useGoalsSummary } from "../../hooks/useGoalsSummary";

export function Home() {

    const dashboard = useDashboardData();
    const statistics = useStatistics();
    const achievements = useAchievements();
    const achievementsSummary = getAchievementsSummary(achievements);
    const latestPlacementResult = PlacementTestStorage.getLatestResult();
    const goalsSummary = useGoalsSummary();

    // R4 (post-sprint audit, H3): getNextStep already picks a single winning
    // "next action" (priority 1 = reviews, 2 = lastActivity, 3 = continueLearning
    // in-progress, 4 = relatedContent, 5 = continueLearning finished - see
    // utils/dashboard/getNextStep.js, not modified here). PrimaryActionCard
    // always presents that winner. The two cards below used to render from
    // their own raw source regardless of which one actually won, so the Home
    // could show up to three disagreeing "what to do next" CTAs at once.
    const isNextStepFromReviews = dashboard.nextStep?.priority === 1;
    const isNextStepFromLastActivity = dashboard.nextStep?.priority === 2;

    // ContinueLearningCard is legitimate information on its own (the next
    // lesson in curriculum order) - only hidden when something else already
    // won the priority race (reviews or lastActivity). It keeps appearing
    // when it agrees with nextStep (priority 3 or 5) or when there's no
    // nextStep at all, exactly as before.
    const showContinueLearningCard = !isNextStepFromReviews && !isNextStepFromLastActivity;

    // lastActivity already *is* PrimaryActionCard's action once it wins the
    // priority race - showing ResumeActivityCard too would repeat the exact
    // same action a second time. When lastActivity exists but lost (e.g. to
    // reviews), it's kept as de-emphasized contextual fallback instead of
    // being hidden silently - see ResumeActivityCard's own secondary CTA.
    const showResumeActivityCard = Boolean(dashboard.lastActivity) && !isNextStepFromLastActivity;

    return (

        <div className="page-container home-dashboard">

            <Seo title="Dashboard" description="Seu painel de estudos: progresso, streak, metas diárias e o que revisar hoje." robots="noindex, nofollow" path="/home" />

            <section className="home-dashboard__hero animate-fade-in">
                <HeroCard greeting={dashboard.greeting} language={dashboard.language} />
                <PrimaryActionCard nextStep={dashboard.nextStep} />
                {showContinueLearningCard && (
                    <ContinueLearningCard continueLearning={dashboard.continueLearning} />
                )}
            </section>

            {dashboard.recommendations.length > 0 && (
                <DashboardSection title="Recomendado para você" icon="lightbulb">
                    <RecommendedForYouCard recommendations={dashboard.recommendations} />
                </DashboardSection>
            )}

            <div className="animate-slide-up">
                <ReviewsCard reviews={dashboard.reviews} />
            </div>

            <div className="home-dashboard__row animate-slide-up">
                <StudyStreakCard streak={dashboard.streakSummary} />
                <UpcomingReviewsCard upcoming={dashboard.upcomingReviews} />
            </div>

            <DashboardSection title="Metas de hoje" icon="target">
                <GoalsProgressCard summary={goalsSummary} />
            </DashboardSection>

            <DashboardSection title="Atividade" subtitle="Últimos 90 dias" icon="calendar">
                <ActivityHeatmap heatmap={dashboard.heatmap} />
            </DashboardSection>

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

            <DashboardSection title="Atividade recente" icon="clock">
                <RecentActivityCard recentActivity={dashboard.recentActivity} />
            </DashboardSection>

            <DashboardSection title="Distribuição do vocabulário" icon="ruler">
                <VocabularyDistributionCard distribution={dashboard.vocabularyDistribution} />
            </DashboardSection>

            <DashboardSection title="Evolução semanal" icon="bar-chart">
                <WeeklyEvolutionCard weeklyActivity={dashboard.weeklyActivity} />
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

            {showResumeActivityCard && (
                <DashboardSection title="Continuar de onde parou" icon="clock">
                    <ResumeActivityCard activity={dashboard.lastActivity} />
                </DashboardSection>
            )}

        </div>

    );

}
