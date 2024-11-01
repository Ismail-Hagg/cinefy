import {
  TextInput,
  KeyboardTypeOptions,
  DimensionValue,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  holder?: string;
  holderColor?: string;
  password?: boolean;
  elevation?: number;
  type?: KeyboardTypeOptions;
  padding?: number;
  onEndEditing?: (val: string) => void;
  onChange?: (val: string) => void;
  widthOp?: DimensionValue;
  val?: string;
  multiline?: boolean;
  returnKeyType?: "done" | "go" | "next" | "search" | "send";
  language: "ar" | "en";
};

export default function TextField({
  holder,
  holderColor,
  elevation,
  type,
  password,
  padding,
  onEndEditing,
  widthOp,
  val,
  onChange,
  multiline,
  returnKeyType,
  language,
}: Props) {
  const [active, setactive] = useState(false);
  const [passCover, setpassCover] = useState(password ?? false);
  // const translation = useAuthStore((state) => state.localization);
  const width = Dimensions.get("window").width;

  return (
    <View style={{ flexDirection: "row" }}>
      <TextInput
        enterKeyHint={returnKeyType}
        cursorColor={Colors.mainColor}
        selectionColor={Colors.blackColor}
        multiline={multiline}
        secureTextEntry={passCover}
        placeholder={holder}
        placeholderTextColor={holderColor}
        value={val}
        numberOfLines={multiline ? 5 : 1}
        textAlign={language == "ar" ? "right" : "left"}
        style={{
          width: widthOp ?? "100%",
          elevation: elevation,
          shadowColor: "black",
          color: Colors.mainColor,
          fontSize: 14,
          padding: padding,
          backgroundColor: Colors.forgroundColor,
          borderRadius: 10,
          marginVertical: 10,
          borderWidth: 0.7,
          borderColor: active ? Colors.mainColor : Colors.bacgroundColor,
        }}
        onBlur={() => {
          setactive(false);
        }}
        onEndEditing={(e) => {
          if (onEndEditing) {
            onEndEditing(e.nativeEvent.text);
          }
        }}
        onChangeText={onChange}
        onFocus={(e) => setactive(true)}
        keyboardType={type}
      />
      {password && (
        <TouchableOpacity
          style={{
            alignContent: "center",
            justifyContent: "center",
            alignSelf: "center",
            position: "absolute",
            right: 10,
            //   right: translation.locale === "ar" ? width * 0.9 - 42 : 20,
          }}
          onPress={() => setpassCover((prev) => !prev)}
        >
          <Ionicons
            name={passCover ? "eye-off" : "eye"}
            color={Colors.whiteColor}
            size={24}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
