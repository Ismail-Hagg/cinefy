import firestore from "@react-native-firebase/firestore";
import { FirebsaePaths } from "./enums";
import { LocalUser, Results } from "./types";

const usersCollection = firestore().collection(
  FirebsaePaths[FirebsaePaths.users]
);

const otherCollection = firestore().collection(
  FirebsaePaths[FirebsaePaths.other]
);

export const getUser = async (userId: string) => {
  const user = await usersCollection.doc(userId).get();
  return user.data();
};

export const addUser = async (user: LocalUser) => {
  await usersCollection.doc(user.userId).set(user);
};

export const updateUSer = async (user: {}, userId: string) => {
  await usersCollection.doc(userId).update(user);
};

export const addRecord = async (
  userId: string,
  path: string,
  movie: Results
) => {
  const {
    id,
    genre_ids,
    backdrop_path,
    title,
    name,
    status,
    runtime,
    number_of_seasons,
    origin_country,
    vote_average,
    overview,
    poster_path,
  } = movie;
  const sendOb = {
    id,
    genre_ids,
    backdrop_path,
    title,
    name,
    status,
    runtime,
    number_of_seasons,
    origin_country,
    vote_average: parseFloat(vote_average.toFixed(2)),
    overview,
    poster_path,
  };
  const pure = JSON.parse(JSON.stringify(sendOb));

  await usersCollection
    .doc(userId)
    .collection(path)
    .doc(movie.id.toString())
    .set(pure);
};

export const deleteRecodr = async (
  userId: string,
  path: string,
  movie: Results
) => {
  await usersCollection
    .doc(userId)
    .collection(path)
    .doc(movie.id.toString())
    .delete();
};

export const getComments = async (movieId: number) => {
  const comments = await otherCollection
    .doc(movieId.toString())
    .collection(FirebsaePaths[FirebsaePaths.comments])
    .orderBy("time", "desc")
    .get();
  return comments;
};

// export const addKeeping=async()=>{
//   await otherCollection.doc()
// }
