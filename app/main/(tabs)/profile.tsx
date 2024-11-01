import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuthStore } from "@/stores/authStore";
import auth from "@react-native-firebase/auth";
import { clearLocalStorage } from "@/util/localStorage";
import { useRouter } from "expo-router";

const profile = () => {
  const { userData, setUser } = useAuthStore();
  const router = useRouter();
  const logout = async () => {
    await auth().signOut();
    clearLocalStorage();
    setUser(null);
    router.replace("/");
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity onPress={logout}>
        <Text>{userData?.userName}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default profile;
