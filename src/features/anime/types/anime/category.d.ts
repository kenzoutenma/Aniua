interface Category {
  slug: string;
  refer: ObjectId;
}

interface AnimeGenre {
  title: string;
  id: string;
  slug: string;
  title_en?: string;
  description?: string;
}
