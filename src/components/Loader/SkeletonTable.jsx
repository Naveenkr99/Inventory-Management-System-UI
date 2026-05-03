import React from 'react';
import styles from './Loader.module.css';

function SkeletonTable({ rows = 5 }) {
  return (
    <div className={styles.wrapper}>
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className={styles.row} />
      ))}
    </div>
  );
}

export default SkeletonTable;
