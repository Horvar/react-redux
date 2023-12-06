import React, { useState } from 'react';
import styles from './SearchBar.module.css';

type SearchBarProps = {
  onSearch: (searchTerm: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  const handleSearch = () => {
    const trimmedSearchTerm = localSearchTerm.trim();
    onSearch(trimmedSearchTerm);
  };

  return (
    <div className={styles.searchBar}>
      <input
        className={styles.searchBarInput}
        type="text"
        placeholder="Search"
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
      />
      <button className={styles.searchBarButton} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
