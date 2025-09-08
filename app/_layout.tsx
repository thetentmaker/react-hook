import "react-native";
import HookTestComponentUseMemo from "./src/components/HookTestComponentUseMemo";
import { useCallback, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewBase,
} from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";
import HookTestComponentUseCallback from "./src/components/HookTestComponentUseCallback";

export default function RootLayout() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  return (
    <View style={styles.container}>
      <HookTestComponentUseMemo a={a} b={b} />
      <HookTestComponentUseCallback a={a} b={b} />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          setA(a + 1);
        }}
      >
        <Text>A 더하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 100,
  },
  buttonContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
