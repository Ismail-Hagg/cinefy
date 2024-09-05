import CustomButton from "@/components/CustomButton";
import TextField from "@/components/TextField";
import { Colors } from "@/constants/Colors";
import { useAuthStore } from "@/stores/authStore";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
} from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { addUser, getUser } from "@/util/firebaseHelper";
import { LocalUser } from "@/util/types";
import { saveUserLocally } from "@/util/localStorage";
import { FirebaseError } from "firebase/app";
import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync().then((val) => {
//   console.log("index => ", val);
// });

GoogleSignin.configure({
  webClientId:
    "130903759798-au8s2j2gi2kq6hvuojqjq04fcr24fcjb.apps.googleusercontent.com",
});

export default function Login() {
  const [Ref, setRef] = useState(false);
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const { changeLanguage, user, localization, setUser, language } =
    useAuthStore();

  const wait = async () => {
    console.log("waiting");
    await new Promise((res) => setTimeout(res, 1000));
  };

  const googleLogin = async () => {
    // logic could be better
    setloading(true);
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const googleUser = await auth().signInWithCredential(googleCredential);
      const onlineUser = await getUser(googleUser.user.uid);
      if (onlineUser === undefined) {
        // new user
        const user: LocalUser = {
          userId: googleUser.user.uid,
          userName: googleUser.user.displayName ?? "",
          email: googleUser.user.email ?? "",
          phoneNumber: googleUser.user.phoneNumber ?? "",
          localPic: "",
          onlinePic: googleUser.user.photoURL ?? "",
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
        setUser(user);
        saveUserLocally(user);
        router.replace("/(main)");
        await addUser(user);
      } else {
        // old user
        setUser(onlineUser as LocalUser);
        saveUserLocally(onlineUser as LocalUser);
        router.replace("/(main)");
      }
    } catch (error) {
      const err = error as FirebaseError;
      Alert.alert(localization.t("error"), err.message);
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  const emailLogin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert(localization.t("error"), localization.t("complete"));
      return;
    }
    setloading(true);
    try {
      const user = await auth().signInWithEmailAndPassword(email, password);
      const onlineUser = await getUser(user.user.uid);
      if (onlineUser) {
        setUser(onlineUser as LocalUser);
        saveUserLocally(onlineUser as LocalUser);
        router.replace("/(main)");
      } else {
        Alert.alert(localization.t("error"), "something went wrong");
      }
    } catch (error) {
      const err = error as FirebaseError;
      Alert.alert(localization.t("error"), err.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: Colors.bacgroundColor }}>
        <StatusBar barStyle={"light-content"} />
        <SafeAreaView>
          <View style={{ padding: 20, marginTop: 50 }}>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 40,
                  color: Colors.mainColor,
                  marginVertical: 15,
                  letterSpacing: 5,
                }}
              >
                Cinefy
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  color: Colors.secondaryColor,
                }}
              >
                {localization.t("message")}
              </Text>
            </View>
            <View style={{ marginVertical: 30 }}>
              <TextField
                holder={localization.t("email")}
                holderColor={Colors.whiteColor}
                type="email-address"
                elevation={10}
                password={false}
                padding={16}
                onChange={(e) => setemail(e)}
              />
              <TextField
                holder={localization.t("pass")}
                holderColor={Colors.whiteColor}
                type="default"
                elevation={10}
                password={true}
                padding={16}
                onChange={(e) => setpassword(e)}
              />
            </View>
            <CustomButton
              padding={12}
              isLoading={loading}
              onPress={emailLogin}
              title={localization.t("login")}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: 20,
              }}
            >
              <View style={styles.divider} />
              <Text style={{ color: Colors.mainColor }}>
                {localization.t("or")}
              </Text>
              <View style={styles.divider} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={styles.social}
                // onPress={() => {
                //   localization.locale = "ar";
                //   setRef(true);
                // }}
                onPress={googleLogin}
              >
                <Ionicons
                  name="logo-google"
                  size={36}
                  color={Colors.mainColor}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.social}
                onPress={() => router.push("/PhoneAuth")}
              >
                <AntDesign name="message1" size={36} color={Colors.mainColor} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.social}
                onPress={() => router.push("/Signup")}
              >
                <AntDesign name="mail" size={36} color={Colors.mainColor} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  divider: {
    width: "40%",
    height: 0.8,
    backgroundColor: Colors.mainColor,
  },
  social: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: Colors.forgroundColor,
    borderRadius: 10,
    elevation: 10,
    shadowColor: "black",
  },
});
