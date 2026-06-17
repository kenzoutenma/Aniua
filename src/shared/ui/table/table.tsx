import React from 'react';
import styles from './table.module.scss';

interface TableProps {
  children: React.ReactNode;
}

function Table({ children, ...props }: TableProps) {
  return (
    <table className={styles.table} {...props}>
      <tbody>{children}</tbody>
    </table>
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
