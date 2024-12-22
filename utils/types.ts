import { Timestamp } from "@react-native-firebase/firestore";

export type LocalUser = {
    userName: string;
    userId: string;
    email: string;
    localPic: string;
    onlinePic: string;
    language: string;
    messagingToken: string;
    watchList: string[];
    favs: string[];
    keeping: string[];
    commentLike: string[];
    commentDislike: string[];
    followers: string[];
    following: string[];
    comments: string[];
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
    status?: string;
    media_type?: string;
    number_of_seasons?: number;
    runtime?: number;
    origin_country: string[];
    last_episode_to_air?: EpDate;
    next_episode_to_air?: EpDate;
    belongs_to_collection?: BelongsToCollection,
    recommendations?: RootResult;
    images?: RessImages;
    videos?: ResVid
};

export type Keeping = Results & {
    change: Timestamp;
    isUpdated: boolean;
    userEpisodes: number;
    userSeasons: number;
    watching: string[];
    token: string;
};



type ResVid = {
    results: {
        key: string;
        site: string;
        type: string;
    }[];
};
type RessImages = { file_path: string, height: number, width: number, aspect_ratio: number }[]

type EpDate = {
    air_date: string;
    episode_number: number;
    season_number: number;
}

type BelongsToCollection = {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
    parts?: Results[];
};

export type StorageStatus = {
    success: boolean;
    message: string;
}