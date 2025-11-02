import { Button, Popover } from "@/shared/ui";

const AnimePopover = ({ animeData }: { animeData: AnimeDataInterface }) => {
  return (
    <Popover>
      <Popover.Row variant="title">
        <h4>{animeData.title}</h4>
        <Button variant="secondary">{animeData.mal_score} ⭐️</Button>
      </Popover.Row>
      <Popover.Row variant="row">
        <span>{animeData.year}</span>
        <span>•</span>
        {animeData.genres && Object.entries(animeData.genres).length > 0 ? (
          animeData.genres.map((el, _) => (
            <Button key={`genres_${el.id}_${_}`} variant="secondary">
              {el.title || el.slug}
            </Button>
          ))
        ) : (
          <p>unknown genres (?)</p>
        )}
      </Popover.Row>
      <p>{animeData?.description && animeData.description.slice(0, 75)}...</p>
    </Popover>
  );
};

export default AnimePopover
