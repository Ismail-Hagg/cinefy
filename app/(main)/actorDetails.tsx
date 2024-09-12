import { View, Text, StyleSheet, Button } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const actorDetails = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["80%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          // add bottom inset to elevate the sheet
          bottomInset={46}
          // set `detached` to true
          //detached={true}
          style={styles.sheetContainer}
        >
          <View style={styles.contentContainer}>
            <Text>Awelkksome 🎉</Text>
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  sheetContainer: {
    // add horizontal space
    marginHorizontal: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default actorDetails;
