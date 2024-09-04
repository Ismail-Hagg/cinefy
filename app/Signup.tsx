import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import Avatar from "@/components/Avatar";
import TextField from "@/components/TextField";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import { pickImage } from "@/util/functions";
import { Colors } from "@/constants/Colors";
import { useAuthStore } from "@/stores/authStore";

const Signup = () => {
  // const { translation, setLocalUser, localUser, setInitial } =
  // useContext(AuthContext);
  const width = Dimensions.get("window").width;
  const [uri, seturi] = useState("");
  const router = useRouter();

  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [loading, setloading] = useState(false);

  const translation = useAuthStore((state) => state.localization);

  const pick = async () => {
    const result = await pickImage();
    if (!result.canceled) {
      seturi(result.assets[0].uri);
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
                holder={translation.t("username")}
                holderColor={Colors.whiteColor}
                type="default"
                elevation={15}
                password={false}
                padding={16}
                onEndEditing={(d) => setuserName(d)}
              />

              <TextField
                holder={translation.t("email")}
                holderColor={Colors.whiteColor}
                type="email-address"
                elevation={10}
                password={false}
                padding={16}
                onEndEditing={(d) => setemail(d)}
              />

              <TextField
                holder={translation.t("pass")}
                holderColor={Colors.whiteColor}
                type="default"
                elevation={10}
                password={false}
                padding={16}
                onEndEditing={(d) => setpassword(d)}
              />
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
  );
};

const styles = StyleSheet.create({});

export default Signup;
