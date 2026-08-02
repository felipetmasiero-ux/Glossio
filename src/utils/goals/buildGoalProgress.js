// Shared shape for every individual goal getter (daily lessons/reviews/video
// minutes, weekly minutes/lessons) so the percentage/remaining/completed
// math lives in exactly one place.
export function buildGoalProgress(current, target) {

    const hasGoal = target != null;

    if (!hasGoal) {
        return { current, target: null, hasGoal: false, remaining: 0, percentage: 0, completed: false };
    }

    const remaining = Math.max(0, target - current);
    const percentage = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;

    return {
        current,
        target,
        hasGoal: true,
        remaining,
        percentage,
        completed: current >= target
    };

}
