import { Card } from "../common/Card/Card";
import "./FlashcardStats.css";

export function FlashcardStats({ total, due, learning, mature }) {
  return (
    <div className="flashcard-stats">
      <Card className="stat-card"><h3>Total</h3><p>{total}</p></Card>
      <Card className="stat-card"><h3>Due Today</h3><p>{due}</p></Card>
      <Card className="stat-card"><h3>Learning</h3><p>{learning}</p></Card>
      <Card className="stat-card"><h3>Mature</h3><p>{mature}</p></Card>
    </div>
  );
}