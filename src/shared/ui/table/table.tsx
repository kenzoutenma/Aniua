import { paths } from '@/shared/constants/headersconst';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/shared/ui';
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
  title: string;
  data: string | number | AnimeGenre[];
  url?: string;
}

const Row = ({ title, data, url }: RowProps) => {
  if (!data) return;
  return (
    <tr>
      <th>{title}:</th>
      <th>
        {typeof data !== 'string' ? (
          Object.entries(data).map((element, key) => {
            return (
              <Button
                variant="link"
                key={key}
                as={Link}
                href={`${paths.list}/?genres=${element[1].slug}`}
              >
                {element[1].title}
              </Button>
            );
          })
        ) : (
          <Button as={Link} variant="link" href={url || '#'}>
            {data}
          </Button>
        )}
      </th>
    </tr>
  );
};

Table.row = Row;

export default Table;
