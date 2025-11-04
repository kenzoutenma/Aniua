import { Popover, Table } from '@/shared/ui';
import renderValue from '../../utils/plain-data-details';

const AnimePopover = ({ animeData }: { animeData: AnimeDataInterface }) => {

  const linked: Partial<AnimeDataInterface> = {
    year: animeData.year,
    status: animeData.status,
    genres: animeData.genres,
  };

  return (
    <Popover>
      <Popover.Row variant="title">
        <h4>{animeData.title}</h4>
      </Popover.Row>
      <Popover.Row variant="row">
          <p>{animeData?.description && animeData.description.slice(0, 125)}...</p>
        <Table data-align-left>
          {Object.entries(linked).map(([key, value]) => {
            if (!value) return;
            return (
              <Table.row key={key}>
                <Table.col>
                  {key}:
                </Table.col>
                <Table.col>{renderValue(value, key)}</Table.col>
              </Table.row>
            );
          })}
        </Table>
      </Popover.Row>
    </Popover>
  );
};

export default AnimePopover;
