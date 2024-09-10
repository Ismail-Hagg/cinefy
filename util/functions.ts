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

export const getTimeDifferenceDescription = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}   
 seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minutes ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hours ago`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} days ago`;
  } else if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months} months ago`;
  } else {
    return date.toLocaleDateString();
  }
};

export const dateCheck = (date: string): boolean => {
  // Parse the date string into a Date object
  const parsed = new Date(date);

  // Get the current date and time
  const currentDate = new Date();

  // Compare the date objects
  return parsed < currentDate;
};
