import { getLocales } from "expo-localization";
import { LocalUser } from "./types";
import * as ImagePicker from "expo-image-picker";
import { apiKey } from "./constants";

// if there is a user in local storage return language , or return device language
export const workingLan = (user: LocalUser | null): string => {
  return user !== null
    ? user?.language
    : getLocales()[0]?.languageTag?.startsWith("en")
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

export const apiCall = async (link: string) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + apiKey,
    },
  };
  const response = await fetch(link, options);
  const json = await response.json();
  return json;
};

export const formatTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes =
    remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;

  return `${formattedHours}:${formattedMinutes}`;
};
