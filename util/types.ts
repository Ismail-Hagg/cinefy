import { Timestamp } from "@react-native-firebase/firestore";

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
  last_episode_to_air?: {
    air_date: string;
    episode_number: number;
    season_number: number;
  };
  next_episode_to_air?: {
    air_date: string;
    episode_number: number;
    season_number: number;
  };
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
  images?: {
    posters: { file_path: string }[];
  };
  videos?: {
    results: {
      key: string;
      site: string;
      type: string;
    }[];
  };
};

export type CommentType = {
  id: string;
  name: string;
  link: string;
  token: string;
  topLevel: boolean;
  numberOfReplies: number;
  time: Timestamp;
  movieId: number;
  comment: string;
  commentId: string;
  likes: number;
  dislikes: number;
  subComments: CommentType[];
};

export type Episode = {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
};

export type Keeping = {
  change: Timestamp;
  isUpdated: boolean;
  name: string;
  id: number;
  episode: number;
  season: number;
  userEpisodes: number;
  userSeasons: number;
  nextEpisodeDate: string;
  nextSeason: number;
  nextEpisode: number;
  overView: string;
  poster: string;
  backdrop: string;
  watching: string[];
  releaseDate: string;
  status: string;
  token: string;
  voteAverage: number;
};

export type Actor = {
  adult?: boolean;
  biography?: string;
  birthday?: string;
  id: number;
  imdb_id?: string;
  name: string;
  profile_path: string;
  combined_credits?: {
    cast: Results[];
    crew: (Results & { job: string })[];
  };
  images?: {
    profiles: { file_path: string }[];
  };
};

export type SearchPage = {
  title?: string;
  results: (Results & Actor)[];
  link?: string;
  search: number;
};
