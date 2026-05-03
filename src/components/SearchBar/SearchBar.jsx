import React from 'react';
import styles from './SearchBar.module.css';

function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <input
      className={styles.searchInput}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
    />
  );
}

export default SearchBar;
