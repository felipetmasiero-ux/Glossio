import { EmptyState } from "../components/common/EmptyState/EmptyState";
import { Seo } from "../components/common/Seo/Seo";

export function Alphabets() {
  return (
    <div className="page-container animate-fade-in">
      <Seo title="Alfabetos" description="Aprenda scripts e sistemas de escrita diferentes do seu." robots="noindex, nofollow" path="/alphabets" />
      <EmptyState
        icon="alphabet"
        title="Alfabetos"
        description="Em breve: aprenda scripts e sistemas de escrita diferentes do seu."
      />
    </div>
  );
}
