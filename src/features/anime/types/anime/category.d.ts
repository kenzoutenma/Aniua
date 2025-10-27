interface Category {
  slug: string;
  refer: ObjectId;
}

interface AnimeGenre {
  title: string;
  id: number;
  slug: string;
  title_en?: string;
  description?: string;
}
