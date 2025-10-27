interface AnimeCharacters {
  id: number;
  poster: string;
  name_surname_en: string;
  name_surname_ua: string;
  name_surname_jp: string;
  role: 'main' | 'supporter';
  description: string;
}
