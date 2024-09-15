import { View, Text, Button, ViewProps, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import Animated from "react-native-reanimated";
import { useRouter } from "expo-router";
import Movie from "@/components/Movie";
import { useAuthStore } from "@/stores/authStore";
import { removeUserLocally } from "@/util/localStorage";
import auth from "@react-native-firebase/auth";

const settings = () => {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  const logout = async () => {
    setUser(null);
    router.dismissAll();
    router.replace("/Login");
    removeUserLocally();
    await auth().signOut();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity onPress={logout}>
        <Text>logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default settings;
