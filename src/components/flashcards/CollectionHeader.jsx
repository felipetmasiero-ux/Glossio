import { TOPIC_LABELS } from "../../constants/topics";
import { Icon } from "../common/Icon/Icon";
import { OTHER_TOPIC } from "../../utils/flashcards/groupFlashcardsByTopic";

const OTHER_LABEL = "Outros";

function formatTopicLabel(topic) {
  if (topic === OTHER_TOPIC) return OTHER_LABEL;
  return TOPIC_LABELS[topic] ?? topic;
}

export function CollectionHeader({
  topic,
  count
}) {

  return (
    <div className="collection-header">
      <h3 className="collection-header__title">{formatTopicLabel(topic)}</h3>

      <span className="collection-header__count">{count}</span>

      <Icon name="chevron-right" size={16} className="collection-header__chevron" />
    </div>
  );
}
