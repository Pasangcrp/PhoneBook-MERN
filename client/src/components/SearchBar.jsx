const SearchBar = ({ searchInput, setSearchInput, searchContacts }) => {
  const handleSearch = (event) => {
    setSearchInput(event.target.value);
    searchContacts(event.target.value);
  };
  return (
    <div>
      <label htmlFor="search">Name or Number:</label>
      <input
        type="text"
        id="search"
        value={searchInput}
        onChange={handleSearch}
      />
      <button type="submit" onClick={searchContacts}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
