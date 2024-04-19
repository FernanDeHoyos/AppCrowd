import * as React from "react";
import { View, StyleSheet } from "react-native";
import { LinearProgress } from "@rneui/base";

export const Loading = () => {
  return (
    <View style={styles.container}>
      <LinearProgress
        value={0}
        variant="indeterminate"
        style={{ width: "50%" }}
        color="secondary"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
