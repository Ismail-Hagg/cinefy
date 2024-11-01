import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { pickImage, workingLan } from "../util/functions";
import { useRouter } from "expo-router";
import { FirebaseError } from "firebase/app";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import PhoneInput from "react-native-phone-input";
import OTPTextInput from "react-native-otp-textinput";
import TextField from "@/components/TextField";
import { useAuthStore } from "@/stores/authStore";
import { LocalUser } from "@/util/types";
import { saveUserLocally } from "@/util/localStorage";
import Avatar from "@/components/Avatar";
import CustomButton from "@/components/CutsomButton";
import { addUser, getUser } from "@/util/firebaseHelper";

const PhoneAuth = () => {
  const { width } = useWindowDimensions();
  const [uri, seturi] = useState("");
  const router = useRouter();

  const [userName, setuserName] = useState("");
  const [phoneNum, setphoneNum] = useState("");
  const [loading, setloading] = useState(false);
  const [conferm, setconferm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const translation = useAuthStore((state) => state.localization);
  const { setUser, userData, localization } = useAuthStore();

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
    if (otp.length == 6) {
      setloading(true);
      Keyboard.dismiss();
      try {
        const user = await conferm?.confirm(otp);
        if (!user) {
          Alert.alert(translation.t("error"), "something went wrong");
          return;
        }

        const oldUser = await getUser(user.user.uid);
        const userCreate: LocalUser = oldUser
          ? (oldUser as LocalUser)
          : {
              userId: user.user.uid,
              userName: userName,
              email: "",
              phoneNumber: phoneNum,
              localPic: uri,
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

        setUser(userCreate);
        const saved = saveUserLocally(userCreate);
        if (saved) {
          router.replace("/main/");
        } else {
          await auth().signOut();
          setUser(null);
          router.replace("/");
          Alert.alert(localization.t("error"), localization.t("saveerror"));
        }

        if (!oldUser) {
          await addUser(userCreate);
        }
      } catch (error) {
        const err = error as FirebaseError;
        Alert.alert(translation.t("error"), err.message);
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
          style={{
            flex: 1,
            backgroundColor: Colors.bacgroundColor,
            marginTop: 50,
          }}
          enabled={true}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView>
              <Avatar
                clear={() => seturi("")}
                uri={uri}
                width={width * 0.32}
                editing={true}
                onPress={pick}
                elevated={15}
              />
              <View style={{ marginVertical: 30 }}>
                <TextField
                  language={userData?.language!}
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
                {conferm && (
                  <View style={{ paddingVertical: 10 }}>
                    <OTPTextInput
                      handleTextChange={(d) => handleOtp(d)}
                      inputCount={6}
                      tintColor={Colors.mainColor}
                      offTintColor={Colors.forgroundColor}
                      autoFocus={true}
                    />
                  </View>
                )}
              </View>
              <CustomButton
                title={translation.t("sign")}
                isLoading={loading}
                onPress={signup}
                padding={12}
                mainColor={Colors.mainColor}
                titleColor={Colors.bacgroundColor}
                bold
                size={20}
              />
            </SafeAreaView>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default PhoneAuth;
