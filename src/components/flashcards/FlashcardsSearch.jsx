import { Input } from "../common/Input/Input";
import { Icon } from "../common/Icon/Icon";

export function FlashcardsSearch({
  search,
  setSearch
}) {
  return (
    <Input
      className="flashcards-search"
      placeholder="Buscar..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      icon={<Icon name="search" size={16} />}
    />
  );
}
