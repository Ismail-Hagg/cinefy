import firestore, { Timestamp } from "@react-native-firebase/firestore";
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
