import { EmptyState } from "../components/common/EmptyState/EmptyState";

export function Alphabets() {
  return (
    <div className="page-container">
      <EmptyState
        icon="alphabet"
        title="Alfabetos"
        description="Em breve: aprenda scripts e sistemas de escrita diferentes do seu."
      />
    </div>
  );
}
