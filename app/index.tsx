import { Text, TouchableOpacity, View } from "react-native";
import firestore, { firebase } from "@react-native-firebase/firestore";

export default function Index() {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
