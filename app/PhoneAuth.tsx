import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
  Dimensions,
  Alert,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import CustomButton from "@/components/CustomButton";
import Avatar from "@/components/Avatar";
import { pickImage } from "../util/functions";
import { useRouter, useSegments } from "expo-router";
import * as Localization from "expo-localization";
import { FirebaseError } from "firebase/app";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import PhoneInput from "react-native-phone-input";
import OTPTextInput from "react-native-otp-textinput";
import TextField from "@/components/TextField";
import { useAuthStore } from "@/stores/authStore";
//   import { addUser, getUser } from "@/util/firebaseHelper";

const PhoneAuth = () => {
  const width = Dimensions.get("window").width;
  const [uri, seturi] = useState("");
  const router = useRouter();

  const [userName, setuserName] = useState("");
  const [phoneNum, setphoneNum] = useState("");
  const [loading, setloading] = useState(false);
  const [deviceLanguage, setdeviceLanguage] = useState(
    Localization.getLocales()[0].languageTag
  );
  const [phoneActive, setphoneActive] = useState(false);
  const [otp, setotp] = useState("");
  const [conferm, setconferm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const translation = useAuthStore((state) => state.localization);

  const pick = async () => {
    const result = await pickImage();
    if (!result.canceled) {
      seturi(result.assets[0].uri);
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
                      //   handleTextChange={(d) => handleOtp(d)}
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
                //onPress={signup}
                onPress={() => {}}
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
