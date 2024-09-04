import { getLocales } from "expo-localization";
import { LocalUser } from "./types";
import * as ImagePicker from "expo-image-picker";

// if there is a user in local storage return language , or return device language
export const workingLan = (user: LocalUser | null): string => {
  return user?.language || getLocales()[0]?.languageTag?.startsWith("en")
    ? "en"
    : "ar";
};

// pic image
export const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  return result;
};
