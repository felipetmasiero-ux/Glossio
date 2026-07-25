import { EmptyState } from "../components/common/EmptyState/EmptyState";

export function Exercises() {
  return (
    <div className="page-container">
      <EmptyState
        icon="pencil"
        title="Área de exercícios"
        description="Em breve: exercícios interativos para praticar o que você já leu."
      />
    </div>
  );
}
