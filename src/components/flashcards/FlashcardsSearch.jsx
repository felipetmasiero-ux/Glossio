export function FlashcardsSearch({
  search,
  setSearch
}) {
  return (
    <input
      className="flashcards-search"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}