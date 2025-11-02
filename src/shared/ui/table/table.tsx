import React from 'react';
import styles from './table.module.css';

interface TableProps {
  children: React.ReactNode;
}

function Table({ children }: TableProps) {
  return (
    <div className="flex flex-col gap-4">
      <table className={styles.table}>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

interface RowProps {
  children: React.ReactNode;
}

const Row = ({ children }: RowProps) => {
  if (!children) return;
  return <tr>{children}</tr>;
};

Table.row = Row;

const Col = ({ children }: RowProps) => {
  if (!children) return;
  return <th>{children}</th>;
};

Table.col = Col;

export default Table;
