import React, { useEffect } from "react";
import { Stack } from "expo-router";
import messaging from "@react-native-firebase/messaging";
import { PermissionsAndroid, Platform, View } from "react-native";
import { useAuthStore } from "@/stores/authStore";
import { updateUSer } from "@/util/firebaseHelper";
import { LocalUser } from "@/util/types";
import { saveUserLocally } from "@/util/localStorage";
import { Colors } from "@/constants/Colors";

const AppLayout = () => {
  const { user, setUser } = useAuthStore();

  const iosPermit = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
      const token = await messaging().getAPNSToken();
      await changeToken(token);
    }
  };
  const androidPermit = async () => {
    const premision = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    if (premision === "granted") {
      const token = await messaging().getToken();
      await changeToken(token);
    }
  };

  const changeToken = async (token: string | null) => {
    if (token !== null && token !== user?.messagingToken) {
      const newUser = { ...user, messagingToken: token } as LocalUser;
      setUser(newUser);
      saveUserLocally(newUser);
      await updateUSer({ messagingToken: token }, user?.userId as string);
    }
  };

  useEffect(() => {
    const permit = async () => {
      Platform.OS === "android" ? await androidPermit() : iosPermit();
    };

    if (user) {
      permit();
    }
  }, [user]);
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bacgroundColor }}>
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarStyle: "light",
          statusBarTranslucent: true,
          statusBarColor: "transparent",
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="actorDetails" />
        <Stack.Screen name="MovieDetailes" />
        <Stack.Screen name="notificationsPage" />
        <Stack.Screen name="searchPage" />
        <Stack.Screen name="settings" />
      </Stack>
    </View>
  );
};

export default AppLayout;
