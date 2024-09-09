export type LocalUser = {
  userName: string;
  userId: string;
  email: string;
  phoneNumber: string;
  localPic: string;
  onlinePic: string;
  language: string;
  messagingToken: string;
  watchList: string[];
  favs: string[];
  watching: string[];
  commentLike: string[];
  commentDislike: string[];
  followers: string[];
  following: string[];
};

export type RootResult = {
  page: number;
  results: Results[];
  total_pages: number;
  total_results: number;
};

export type Results = {
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  overview: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  title?: string;
  name?: string;
  vote_average: number;
  status: string | null;
  media_type?: string;
  number_of_seasons?: number;
  runtime?: number;
  origin_country: string[];
};

export type BelongsToCollection = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
  parts?: Results[];
};

export type Cast = {
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  profile_path?: string;
  cast_id: number;
  character: string;
  credit_id: string;
};
export type Credit = {
  cast?: Cast[];
};

export type Info = {
  belongs_to_collection?: BelongsToCollection;
  credits?: Credit;
  recommendations?: RootResult;
};
