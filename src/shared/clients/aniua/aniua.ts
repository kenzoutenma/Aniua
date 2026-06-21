import getListOfSources from './lib/getListOfSource';

export interface FilterItem {
  id: number | string;
  slug: string;
  title: string;
  title_en?: string;
}

class EpisodeMod {
  api_url: string;

  constructor(url?: string) {
    this.api_url = url || 'https://dev.aniua.top';
  }

  async list(
    slug: string,
    params: Record<string, string> = { order: 'episode_number' },
  ): Promise<IEpisodeListResponse | Error> {
    const url = new URL(`${this.api_url}/api/5.0/anime/${slug}/episodes`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const data = await fetch(url.toString());

    if (!data.ok) {
      return new Error('Failed to fetch');
    }

    const response = await data.json();
    return response;
  }

  async byID(id: string) {
    try {
      const urls = [
        `${this.api_url}/api/4.0/episode/get/${id}`,
        `${this.api_url}/api/5.0/episode/get/${id}/videos`,
      ];

      const responses = await Promise.all(urls.map((url) => fetch(url)));

      const episodeData = (await responses[0].json()) as EpisodeListInterface;
      const episodeVideos = (await responses[1].json()) as { videos: PlayersInEpisode[] };

      const studios: Studio[] = episodeVideos.videos.map((e: PlayersInEpisode) => ({
        id: e.studio.id,
        poster: e.studio.poster,
        title: e.studio.title,
      }));

      const player: (Studio & {
        video:
          | {
              type: string;
              url: string;
              quality: string;
            }[]
          | null;
      })[] = episodeVideos.videos.map((e: PlayersInEpisode) => ({
        id: e.studio.id,
        poster: e.videos[0]?.poster || '',
        title: e.studio.title,
        video: getListOfSources(e.videos),
      }));

      return {
        ...episodeData,

        studios,
        player,
      };
    } catch (e) {
      console.error(e);
      throw new Error((e as Error).message);
    }
  }
}

class AnimeMod {
  api_url: string;

  constructor(url?: string) {
    this.api_url = url || 'https://dev.aniua.top';
  }

  async get(slug: string): Promise<AnimeDataInterface | Error> {
    const url = `${this.api_url}/api/4.0/anime/${slug}`;

    const data = await fetch(url);

    if (!data.ok) {
      return new Error('Failed to fetch');
    }

    const response = (await data.json()) as AnimeDataInterface;
    return response;
  }

  async characters(slug: string): Promise<AnimeCharacters[] | Error> {
    const url = `${this.api_url}/api/4.0/anime/${encodeURIComponent(slug)}/characters`;

    const data = await fetch(url);

    if (!data.ok) {
      return new Error('Failed to fetch');
    }

    const response = (await data.json()) as { characters: AnimeCharacters[] };
    return response.characters;
  }

  async list(param?: Record<string, string>): Promise<AnimeDataListInterface | Error> {
    const url = new URL(`${this.api_url}/api/4.0/anime`);

    if (param) {
      Object.entries(param).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const data = await fetch(url.toString());

    if (!data.ok) {
      return new Error('Failed to fetch');
    }

    const response = await data.json();
    return response;
  }
}

class ListMod {
  api_url: string;

  constructor(url?: string) {
    this.api_url = url || 'https://dev.aniua.top';
  }

  async search(param?: Record<string, string>): Promise<AnimeDataListInterface | Error> {
    const url = new URL(`${this.api_url}/api/4.0/anime/search`);

    if (param) {
      Object.entries(param).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const data = await fetch(url.toString());

    if (!data.ok) {
      return new Error('Failed to fetch');
    }

    const response = await data.json();
    return response;
  }

  async filter(): Promise<Record<string, FilterItem[]>> {
    const urls = [`${this.api_url}/api/4.0/anime/themes`, `${this.api_url}/api/4.0/anime/genres`];

    const responses = await Promise.all(urls.map((url) => fetch(url)));
    const [themesData, genresData] = await Promise.all(responses.map((res) => res.json()));

    return {
      themes: themesData.themes,
      genres: genresData.genres,
    };
  }
}

class AniuaClient {
  api_url: string;
  public anime: AnimeMod;
  public list: ListMod;
  public episode: EpisodeMod;

  constructor(url?: string) {
    this.api_url = url || 'https://dev.aniua.top';
    this.anime = new AnimeMod(this.api_url);
    this.list = new ListMod(this.api_url);
    this.episode = new EpisodeMod(this.api_url);
  }
}

const ACClient = new AniuaClient();
export default ACClient;
