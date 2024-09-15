import firestore from "@react-native-firebase/firestore";
import { FirebsaePaths } from "./enums";
import { Keeping, LocalUser, Results } from "./types";

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

export const isKeeping = async (movieId: string) => {
  const load = await otherCollection.doc(movieId).get();
  return load;
};

export const keepingAdd = async (obj: Keeping) => {
  await otherCollection.doc(obj.id.toString()).set(obj);
};

export const keepingDelete = async (obj: Keeping) => {
  await otherCollection.doc(obj.id.toString()).delete();
};

export const userKeepingAdd = async (obj: Keeping, userId: string) => {
  await usersCollection
    .doc(userId)
    .collection(FirebsaePaths[FirebsaePaths.keeping])
    .doc(obj.id.toString())
    .set(obj);
};
export const userKeepingDelete = async (obj: Keeping, userId: string) => {
  await usersCollection
    .doc(userId)
    .collection(FirebsaePaths[FirebsaePaths.keeping])
    .doc(obj.id.toString())
    .delete();
};
