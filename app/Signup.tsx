import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Avatar from "@/components/Avatar";
import TextField from "@/components/TextField";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import { pickImage } from "@/util/functions";
import { Colors } from "@/constants/Colors";
import { useAuthStore } from "@/stores/authStore";
import auth from "@react-native-firebase/auth";
import { saveUserLocally } from "@/util/localStorage";
import { addUser } from "@/util/firebaseHelper";
import { FirebaseError } from "firebase/app";

const Signup = () => {
  const width = Dimensions.get("window").width;
  const [uri, seturi] = useState("");
  const router = useRouter();

  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [loading, setloading] = useState(false);
  const { setUser, localization, language } = useAuthStore();

  const pick = async () => {
    const result = await pickImage();
    if (!result.canceled) {
      seturi(result.assets[0].uri);
    }
  };

  const signup = async () => {
    // logic could be better
    if (
      userName.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      Alert.alert(localization.t("error"), localization.t("complete"));
      return;
    }
    setloading(true);
    try {
      const user = await auth().createUserWithEmailAndPassword(email, password);
      const newUser = {
        userName,
        email,
        userId: user.user.uid,
        phoneNumber: "",
        localPic: uri.trim(),
        onlinePic: "",
        messagingToken: "",
        language: language,
        watchList: [],
        favs: [],
        watching: [],
        commentLike: [],
        commentDislike: [],
        followers: [],
        following: [],
      };
      setUser(newUser);
      saveUserLocally(newUser);
      router.dismissAll();
      router.replace("/(main)");
      await addUser(newUser);
    } catch (error) {
      const err = error as FirebaseError;
      Alert.alert(localization.t("error"), err.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <View
      style={{ padding: 20, flex: 1, backgroundColor: Colors.bacgroundColor }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: Colors.bacgroundColor }}
        enabled={true}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 50 }}
        >
          <SafeAreaView>
            <Avatar
              clear={() => seturi("")}
              uri={uri}
              width={width}
              editing={true}
              onPress={pick}
              elevated={15}
            />
            <View style={{ marginVertical: 30 }}>
              <TextField
                holder={localization.t("username")}
                holderColor={Colors.whiteColor}
                type="default"
                elevation={15}
                password={false}
                padding={16}
                onEndEditing={(d) => setuserName(d)}
              />

              <TextField
                holder={localization.t("email")}
                holderColor={Colors.whiteColor}
                type="email-address"
                elevation={10}
                password={false}
                padding={16}
                onEndEditing={(d) => setemail(d)}
              />

              <TextField
                holder={localization.t("pass")}
                holderColor={Colors.whiteColor}
                type="default"
                elevation={10}
                password={false}
                padding={16}
                onEndEditing={(d) => setpassword(d)}
              />
            </View>
            <CustomButton
              title={localization.t("sign")}
              isLoading={loading}
              onPress={signup}
              padding={8}
            />
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Signup;
