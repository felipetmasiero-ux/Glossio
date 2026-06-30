export function getDailyGoalProgress(completed, goal = 10) {

    const progress = Math.min(
        (completed / goal) * 100,
        100
    );

    return {
        goal,
        completed,
        progress,
        completedGoal: completed >= goal
    };

}