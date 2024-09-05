import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import CustomButton from "@/components/CustomButton";
import Avatar from "@/components/Avatar";
import { pickImage } from "../util/functions";
import { useRouter } from "expo-router";
import * as Localization from "expo-localization";
import { FirebaseError } from "firebase/app";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import PhoneInput from "react-native-phone-input";
import OTPTextInput from "react-native-otp-textinput";
import TextField from "@/components/TextField";
import { useAuthStore } from "@/stores/authStore";
import { addUser, getUser } from "@/util/firebaseHelper";
import { LocalUser } from "@/util/types";
import { saveUserLocally } from "@/util/localStorage";

const PhoneAuth = () => {
  const width = Dimensions.get("window").width;
  const [uri, seturi] = useState("");
  const router = useRouter();

  const [userName, setuserName] = useState("");
  const [phoneNum, setphoneNum] = useState("");
  const [loading, setloading] = useState(false);
  const [conferm, setconferm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const translation = useAuthStore((state) => state.localization);
  const { changeLanguage, user, localization, setUser, language } =
    useAuthStore();

  const pick = async () => {
    const result = await pickImage();
    if (!result.canceled) {
      seturi(result.assets[0].uri);
    }
  };

  const signup = async () => {
    if (userName.trim() === "" || phoneNum.trim() === "") {
      Alert.alert(translation.t("error"), translation.t("complete"));
      return;
    }
    setloading(true);
    try {
      const user = await auth().signInWithPhoneNumber(phoneNum);
      setconferm(user);
    } catch (error) {
      const err = error as FirebaseError;
      Alert.alert(translation.t("error"), err.message);
    } finally {
      setloading(false);
    }
  };

  const handleOtp = async (otp: string) => {
    // logic could be better
    if (otp.length == 6) {
      console.log("====================================");
      console.log(otp);
      console.log("====================================");
      setloading(true);
      Keyboard.dismiss();
      try {
        const user = await conferm?.confirm(otp);
        if (!user) {
          Alert.alert(translation.t("error"), "something went wrong");
          return;
        }

        const userData = await getUser(user.user.uid);
        if (userData) {
          // old user
          const loadedUser = userData as LocalUser;
          setUser(loadedUser);
          saveUserLocally(loadedUser);
          router.dismissAll();
          router.replace("/(main)");
        } else {
          // new user
          const newUser: LocalUser = {
            userId: user.user.uid,
            userName: userName,
            email: "",
            phoneNumber: phoneNum,
            localPic: uri,
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
        }
      } catch (error) {
        Alert.alert(translation.t("error"), translation.t("invalid"));
      } finally {
        setloading(false);
      }
    }
  };

  return (
    <>
      <View
        style={{ padding: 20, flex: 1, backgroundColor: Colors.bacgroundColor }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: Colors.bacgroundColor }}
          enabled={true}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
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
                  holder={translation.t("username")}
                  holderColor={Colors.whiteColor}
                  type="default"
                  elevation={15}
                  password={false}
                  padding={16}
                  onEndEditing={(d) => setuserName(d)}
                />

                <View style={{ flex: 1, alignItems: "center" }}>
                  <TouchableWithoutFeedback>
                    <PhoneInput
                      onChangePhoneNumber={(d) => setphoneNum(d)}
                      disabled={loading}
                      autoFormat={true}
                      style={{
                        width: "100%",
                        height: "85%",
                        elevation: 6,
                        shadowColor: "black",
                        padding: 12,
                        backgroundColor: Colors.forgroundColor,
                        borderRadius: 10,
                        marginVertical: 10,
                        borderWidth: 0.5,
                        borderColor: Colors.mainColor,
                      }}
                      initialCountry="sa"
                      textStyle={{ color: Colors.whiteColor }}
                    />
                  </TouchableWithoutFeedback>
                </View>
                {conferm !== null ? (
                  <View style={{ paddingVertical: 10 }}>
                    <OTPTextInput
                      handleTextChange={(d) => handleOtp(d)}
                      inputCount={6}
                      tintColor={Colors.mainColor}
                      offTintColor={Colors.forgroundColor}
                      autoFocus={true}
                    />
                  </View>
                ) : (
                  <View></View>
                )}
              </View>
              <CustomButton
                title={translation.t("sign")}
                isLoading={loading}
                onPress={signup}
                padding={8}
              />
            </SafeAreaView>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default PhoneAuth;
