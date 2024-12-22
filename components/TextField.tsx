import {
  TextInput,
  KeyboardTypeOptions,
  DimensionValue,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "@/stores/authStore";
import { Colors } from "@/constants/colors";

type Props = {
  holder: string;
  holderColor: string;
  password: boolean;
  elevation: number;
  type: KeyboardTypeOptions;
  padding: number;
  onEndEditing?: (val: string) => void;
  onChange?: (val: string) => void;
  widthOp?: DimensionValue;
  lines?: boolean;
  val?: string;
  multiline?: boolean;
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
  lines,
  val,
  onChange,
  multiline,
}: Props) {
  const [active, setactive] = useState(false);
  const [passCover, setpassCover] = useState(password);
  const translation = useAuthStore((state) => state.localization);
  const width = Dimensions.get("window").width;

  return (
    <View style={{ flexDirection: "row" }}>
      <TextInput
        selectionColor={Colors.mainColor}
        multiline={multiline}
        caretHidden={lines ?? false}
        secureTextEntry={passCover}
        placeholder={holder}
        placeholderTextColor={holderColor}
        value={val}
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
          borderWidth: 0.5,
          borderColor: active ? Colors.mainColor : Colors.bacgroundColor,
        }}
        onEndEditing={(d) => {
          setactive(false);
          onEndEditing !== undefined ? onEndEditing(d.nativeEvent.text) : null;
        }}
        onChangeText={onChange}
        onPress={(e) => setactive(true)}
        keyboardType={type}
      />
      {password && (
        <TouchableOpacity
          style={{
            alignContent: "center",
            justifyContent: "center",
            alignSelf: "center",
            position: "absolute",
            right: translation.locale === "ar" ? width * 0.9 - 42 : 20,
          }}
          onPress={() => setpassCover((prev) => !prev)}
        >
          <Ionicons
            name={passCover ? "eye-off" : "eye"}
            color={Colors.whiteColor}
            size={28}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
