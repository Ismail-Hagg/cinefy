import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { LocalUser } from "@/util/types";
import { FirebaseError } from "firebase/app";
import { Colors } from "@/constants/Colors";
import { useAuthStore } from "@/stores/authStore";
import TextField from "@/components/TextField";
import { workingLan } from "@/util/functions";
import CustomButton from "@/components/CutsomButton";
import { addUser, getUser } from "@/util/firebaseHelper";
import { saveUserLocally } from "@/util/localStorage";
import { useState } from "react";

GoogleSignin.configure({
  webClientId:
    "130903759798-au8s2j2gi2kq6hvuojqjq04fcr24fcjb.apps.googleusercontent.com",
});

export default function Login() {
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");

  const router = useRouter();

  const { localization, userData, loading, setLoading, setUser } =
    useAuthStore();

  const setEmail = (emailField: string) => {
    setemail(emailField);
  };
  const setPassword = (passField: string) => {
    setpassword(passField);
  };

  const saveProcess = async (user: LocalUser) => {
    setUser(user);
    const saved = saveUserLocally(user);
    if (saved) {
      router.replace("/main/");
    } else {
      loginFail(localization.t("saveerror"));
    }
  };

  const loginFail = async (message: string) => {
    await auth().signOut();
    setUser(null);
    router.replace("/");
    Alert.alert(localization.t("error"), message);
  };

  const googleLogin = async () => {
    setLoading();
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const googleUser = await auth().signInWithCredential(googleCredential);
      const onlineUser = await getUser(googleUser.user.uid);
      const userCreate: LocalUser = onlineUser
        ? (onlineUser as LocalUser)
        : {
            userId: googleUser.user.uid,
            userName: googleUser.user.displayName ?? "",
            email: googleUser.user.email ?? "",
            phoneNumber: googleUser.user.phoneNumber ?? "",
            localPic: "",
            onlinePic: googleUser.user.photoURL ?? "",
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

      await saveProcess(userCreate);
      // add user to database if new user
      if (!onlineUser) {
        await addUser(userCreate);
      }
    } catch (error) {
      const err = error as FirebaseError;
      loginFail(err.message);
    } finally {
      setLoading();
    }
  };

  const emailLogin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert(localization.t("error"), localization.t("complete"));
      return;
    }
    setLoading();
    try {
      const user = await auth().signInWithEmailAndPassword(email, password);
      const onlineUser = await getUser(user.user.uid);

      await saveProcess(onlineUser as LocalUser);
    } catch (error) {
      const err = error as FirebaseError;
      Alert.alert(localization.t("error"), err.message);
    } finally {
      setLoading();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bacgroundColor }}>
      <ScrollView showsHorizontalScrollIndicator={false}>
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
              language={workingLan(userData)}
              onChange={(e) => setEmail(e)}
            />
            <TextField
              holder={localization.t("pass")}
              holderColor={Colors.whiteColor}
              type="default"
              elevation={10}
              password={true}
              padding={16}
              language={workingLan(userData)}
              onChange={(e) => setPassword(e)}
            />
          </View>
          <CustomButton
            padding={12}
            mainColor={Colors.mainColor}
            titleColor={Colors.bacgroundColor}
            bold
            size={24}
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
            <TouchableOpacity style={styles.social} onPress={googleLogin}>
              <Ionicons name="logo-google" size={36} color={Colors.mainColor} />
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
      </ScrollView>
    </SafeAreaView>
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
