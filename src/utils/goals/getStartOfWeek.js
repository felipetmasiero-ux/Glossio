// Calendar week starting Monday - shared by both weekly goal getters so
// "this week" means the same thing in both places.
export function getStartOfWeek(timestamp) {

    const date = new Date(timestamp);
    date.setHours(0, 0, 0, 0);

    const day = date.getDay(); // 0 = Sunday ... 6 = Saturday
    const daysSinceMonday = (day + 6) % 7;

    date.setDate(date.getDate() - daysSinceMonday);

    return date.getTime();

}
