import { Colors } from "@/constants/colors";
import { useAuthStore } from "@/stores/authStore";
import { router } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { LocalUser } from "@/utils/types";
import TextField from "@/components/TextField";

export default function Index() {
  const { userData, setUser, localization } = useAuthStore();
  const lanFlip = () => {
    const lan = localization.locale === "en" ? "ar" : "en";
    const newOne = { ...userData, language: lan } as LocalUser;
    setUser(newOne);
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.bacgroundColor }}>
      {/* <StatusBar barStyle={"light-content"} /> */}
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
              onChange={(e) => {}}
              //
            />
            {/* <TextField
            holder={localization.t("pass")}
            holderColor={Colors.whiteColor}
            type="default"
            elevation={10}
            password={true}
            padding={16}
            onChange={(e) => setpassword(e)}
          /> */}
          </View>
          {/* <CustomButton
          padding={12}
          isLoading={loading}
          onPress={emailLogin}
          title={localization.t("login")}
        /> */}

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
              onPress={lanFlip}
              // onPress={googleLogin}
            >
              <Ionicons name="logo-google" size={36} color={Colors.mainColor} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.social}
              // onPress={() => router.push("/PhoneAuth")}
            >
              <AntDesign name="message1" size={36} color={Colors.mainColor} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.social}
              // onPress={() => router.push("/Signup")}
            >
              <AntDesign name="mail" size={36} color={Colors.mainColor} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
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
