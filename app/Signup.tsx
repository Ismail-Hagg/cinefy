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
import { useRouter } from "expo-router";
import { pickImage, workingLan } from "@/util/functions";
import { Colors } from "@/constants/Colors";
import { useAuthStore } from "@/stores/authStore";
import auth from "@react-native-firebase/auth";
import { saveUserLocally } from "@/util/localStorage";
import { addUser } from "@/util/firebaseHelper";
import { FirebaseError } from "firebase/app";
import CustomButton from "@/components/CutsomButton";

const Signup = () => {
  const width = Dimensions.get("window").width;
  const [uri, seturi] = useState("");
  const router = useRouter();

  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [loading, setloading] = useState(false);
  const { setUser, localization, userData } = useAuthStore();

  const pick = async () => {
    const result = await pickImage();
    if (!result.canceled) {
      seturi(result.assets[0].uri);
    }
  };

  const signup = async () => {
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
        language: workingLan(null),
        watchList: [],
        favs: [],
        watching: [],
        commentLike: [],
        commentDislike: [],
        followers: [],
        following: [],
      };

      setUser(newUser);
      const saved = saveUserLocally(newUser);
      if (saved) {
        router.replace("/main/");
      } else {
        await auth().signOut();
        setUser(null);
        router.dismissAll();
        router.replace("/");
        Alert.alert(localization.t("error"), localization.t("saveerror"));
      }

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
        style={{
          flex: 1,
          backgroundColor: Colors.bacgroundColor,
        }}
        enabled={true}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ height: 100 }}></View>
          <SafeAreaView>
            <Avatar
              clear={() => seturi("")}
              uri={uri}
              width={width * 0.3}
              editing={true}
              onPress={pick}
              elevated={15}
            />
            <View style={{ marginVertical: 30 }}>
              <TextField
                language={userData?.language!}
                holder={localization.t("username")}
                holderColor={Colors.whiteColor}
                type="default"
                elevation={15}
                password={false}
                padding={16}
                onEndEditing={(d) => setuserName(d)}
              />

              <TextField
                language={userData?.language!}
                holder={localization.t("email")}
                holderColor={Colors.whiteColor}
                type="email-address"
                elevation={10}
                password={false}
                padding={16}
                onEndEditing={(d) => setemail(d)}
              />

              <TextField
                language={userData?.language!}
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
              titleColor={Colors.bacgroundColor}
              mainColor={Colors.mainColor}
              title={localization.t("sign")}
              isLoading={loading}
              onPress={signup}
              padding={8}
              bold
              size={22}
            />
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Signup;
