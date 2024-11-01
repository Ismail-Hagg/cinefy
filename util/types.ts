import { Timestamp } from "@react-native-firebase/firestore";

export type LocalUser = {
  userName: string;
  userId: string;
  email: string;
  phoneNumber: string;
  localPic: string;
  onlinePic: string;
  language: "ar" | "en";
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
  media_type?: string;
  profile_path?: string;
};

export type Details = {
  backdrop_path?: string;
  belongs_to_collection?: BelongsToCollection;
  genres: Genre[];
  id: number;
  origin_country: string[];
  overview: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  runtime?: number;
  number_of_seasons?: number;
  status?: string;
  title?: string;
  name?: string;
  vote_average: number;
  last_episode_to_air?: AirDate;
  next_episode_to_air?: AirDate;
  recommendations?: RootResult;
  credits?: Credit;
  images?: Images;
  videos?: Vidoes;
};

type Vidoes = {
  results: {
    key: string;
    site: string;
    type: string;
  }[];
};

type Images = {
  posters: { file_path: string }[];
};

type Genre = {
  id: number;
  name: string;
};
type AirDate = {
  air_date: string;
  episode_number: number;
  season_number: number;
};

type BelongsToCollection = {
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
type Credit = {
  cast?: Cast[];
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

export type EpKeeping = {
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

export type Chat = {
  change: Timestamp;
  link: string;
  unread: boolean;
  token: string;
  userId: string;
  userName: string;
  messages: Message[];
};
type Message = {
  auther: string;
  message: string;
  createdAt: Timestamp;
  id: string;
};
