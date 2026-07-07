import { Input } from "./common/Input/Input";

export function FlashcardsSearch({
  search,
  setSearch
}) {
  return (
    <Input
      className="flashcards-search"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      icon="🔍"
    />
  );
}