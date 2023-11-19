import React, { useState } from 'react';
import styles from './SearchBar.module.css';

import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../../features/search/searchSlice';

type SearchBarProps = {
  onSearch: (searchTerm: string, page: number) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(
    localStorage.getItem('searchTerm') || ''
  );
  const dispatch = useDispatch();

  const handleSearch = () => {
    const trimmedSearchTerm = localSearchTerm.trim();
    dispatch(setSearchTerm(trimmedSearchTerm));
    localStorage.setItem('searchTerm', trimmedSearchTerm);
    onSearch(trimmedSearchTerm, 1);
  };

  return (
    <div className={styles.searchBar}>
      <input
        className={styles.searchBarInput}
        type="text"
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
