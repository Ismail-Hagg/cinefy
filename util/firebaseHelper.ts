import firestore from "@react-native-firebase/firestore";
import { FirebsaePaths } from "./enums";
import { LocalUser } from "./types";

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
  usersCollection.doc(user.userId).set(user);
};
