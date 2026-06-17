import { animeAPIConstant } from '@/shared/constants/api-endpoints.constant';
import { Button } from '@/shared/ui';
import Link from 'next/link';
import isAnimeGenre from '../types/anime/category.guard';

const isPrimitive = (v: unknown): v is string | number | boolean =>
  typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean';

const renderValue = (val: unknown, linked?: string) => {
  if (val == null) return <em>—</em>;
  if (val instanceof Date) return <span>{val.toLocaleString()}</span>;
  if (isPrimitive(val)) {
    return linked ? (
      <Button
        as={Link}
        variant="default"
        key={linked}
        href={animeAPIConstant['list'] + `?${linked}=${String(val)}`}
      >
        {String(val)}
      </Button>
    ) : (
      <span>{String(val)}</span>
    );
  }

  if (Array.isArray(val)) {
    if (val.length === 0) return <em>—</em>;
    if (val.every(isPrimitive)) return <span>{val.join(', ')}</span>;

    if (val.every(isAnimeGenre)) {
      return (
        <>
          {val.map((genre) => (
            <Button
              as={Link}
              variant="default"
              key={genre.id}
              href={animeAPIConstant['list'] + `?${linked}=${genre.slug}`}
            >
              {genre.title}
            </Button>
          ))}
        </>
      );
    }

    return (
      <span style={{ margin: 0, paddingLeft: 16 }}>
        {val.map((item, i) => {
          const maybeObj = item as Record<string, unknown>;
          const labelKey = ['name', 'title'].find(
            (k) => k in maybeObj && isPrimitive(maybeObj[k]!),
          );
          const label = labelKey ? String(maybeObj[labelKey]!) : JSON.stringify(item);
          return (
            <Link key={i} href={`/list?${labelKey}=${label}`}>
              {label}
            </Link>
          );
        })}
      </span>
    );
  }

  if (typeof val === 'object') {
    const obj = val as Record<string, unknown>;
    if ('name' in obj && isPrimitive(obj.name)) return <span>{String(obj.name)}</span>;
    if ('title' in obj && isPrimitive(obj.title)) return <span>{String(obj.title)}</span>;

    return (
      <div>
        <div>
          <span>{JSON.stringify(val)}</span>
        </div>
      </div>
    );
  }

  return <span>{String(val)}</span>;
};

export default renderValue;
