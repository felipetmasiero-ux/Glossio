// A day only counts as "goal met" when at least one daily goal is actually
// configured and every configured one was reached - an unconfigured app
// (nothing set yet) never silently counts every day as a win.
export function isDayGoalMet(metrics, goals) {

    const checks = [];

    if (goals.dailyLessons != null) checks.push(metrics.lessons >= goals.dailyLessons);
    if (goals.dailyReviews != null) checks.push(metrics.reviews >= goals.dailyReviews);
    if (goals.dailyVideoMinutes != null) checks.push(metrics.videoMinutes >= goals.dailyVideoMinutes);

    if (checks.length === 0) return false;

    return checks.every(Boolean);

}
