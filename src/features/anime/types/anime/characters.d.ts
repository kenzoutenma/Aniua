interface AnimeCharacters {
  anime: string;
  role: 'Main' | 'Supporting';
  character: {
    poster: string;
    mal_id: number;
    description: string;
    name: string;
  };
}
