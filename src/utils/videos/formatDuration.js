export function formatDuration(seconds) {

    const totalSeconds = Math.max(0, Math.round(seconds ?? 0));

    const minutes = Math.floor(totalSeconds / 60);

    const remainingSeconds = totalSeconds % 60;

    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;

}
