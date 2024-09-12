import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/stores/authStore";
import { LocalUser } from "@/util/types";

const Profile = () => {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  const changeLang = () => {
    const lna = user?.language === "en" ? "ar" : "en";
    const usserChange: LocalUser = { ...user, language: lna } as LocalUser;
    setUser(usserChange);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push("/settings")}>
        <Text>profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={changeLang} style={{ marginTop: 20 }}>
        <Text>change Language</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
