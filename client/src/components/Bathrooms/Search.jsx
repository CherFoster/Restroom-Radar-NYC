import React, { useState } from 'react';

function Search() {
  const [zipCode, setZipCode] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/bathrooms/search?zipCode=${zipCode}`);
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }

      const data = await response.json();
      setSearchResult(data);
    } catch (error) {
      console.error('Error during search:', error);
      setSearchResult(null);
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSearch}>
        <input
          type='text'
          placeholder="Search by zip code..."
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {searchResult && (
        <div>
          <h3>Search Results</h3>
        </div>
      )}
    </div>
  );
}

export default Search;
