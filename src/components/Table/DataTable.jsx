import React from 'react';
import styles from './DataTable.module.css';

function DataTable({ columns, rows, emptyMessage = 'No records found.' }) {
  if (!rows?.length) {
    return <div className={styles.emptyState}>{emptyMessage}</div>;
  }

  return (
    <div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {columns.map((column) => (
                  <td key={column.key}>{column.render ? column.render(row) : row[column.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.mobileCards}>
        {rows.map((row) => (
          <article key={row.id} className={styles.card}>
            {columns.map((column) => (
              <div key={column.key} className={styles.cardField}>
                <span>{column.label}</span>
                <strong>{column.render ? column.render(row) : row[column.key]}</strong>
              </div>
            ))}
          </article>
        ))}
      </div>
    </div>
  );
}

export default DataTable;
