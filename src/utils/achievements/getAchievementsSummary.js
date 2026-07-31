export function getAchievementsSummary(achievements = []) {

    return {
        unlocked: achievements.filter(achievement => achievement.completed).length,
        total: achievements.length
    };

}
