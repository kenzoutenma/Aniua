import { paths } from '@/constants/headersconst';
import React from 'react';
import { Button, Typography } from '../UIComponents';
import styles from './Table.module.css';
import Link from 'next/link';

interface TableProps {
  title?: string;
  children: React.ReactNode;
}

function Table({ title, children }: TableProps) {
  return (
    <div className="flex flex-col gap-4">
      <Typography variant="h2">{title}</Typography>
      <div className={styles.table}>{children}</div>
    </div>
  );
}

interface RowProps {
  title: string;
  data: string | AnimeGenres[];
  url?: string;
}

const Row = ({ title, data, url }: RowProps) => {
  if (!data) return;
  return (
    <div className={styles.tableRow}>
      <span className="">{title}:</span>
      <div className={styles.tableRowRight}>
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
      </div>
    </div>
  );
};

Table.row = Row;

export default Table;
