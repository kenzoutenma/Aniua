import { Button, Pagination } from '@/shared/ui';

const Episodes = ({
  episodesList,
  handleEpisode,
  episode_now,
}: {
  episodesList: EpisodeListInterface[];
  handleEpisode: (x: number) => void;
  episode_now: number;
}) => {
  return (
    <Pagination scrollToActive>
      {episodesList.map((element, index) => {
        const isCurrent = element.id === episode_now;
        const variant = isCurrent ? 'primary' : element.is_filler ? 'outline' : 'secondary';
        return (
          <Button
            key={index}
            variant={variant}
            onClick={() => handleEpisode(element.id)}
            data-active={isCurrent || undefined}
          >
            {element.episode_number}
          </Button>
        );
      })}
    </Pagination>
  );
};

export default Episodes;
