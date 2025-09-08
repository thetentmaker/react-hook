import "react-native";
import HookTestComponentUseMemo from "./src/components/HookTestComponentUseMemo";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HookTestComponentUseCallback from "./src/components/HookTestComponentUseCallback";
import { useAppState, useBackHandler } from "@react-native-community/hooks";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const appState = useAppState();
  console.log("appState", appState);
  useBackHandler(() => {
    console.log("backHandler");
    return true;
  });
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const router = useRouter();

  const isFocused = useIsFocused()
  console.log("isFocused", isFocused);
  return (
    <View style={styles.container}>
      <HookTestComponentUseMemo a={a} b={b} />
      <HookTestComponentUseCallback a={a} b={b} />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          console.log("button pressed");
          setA(a + 1);
        }}
      >
        <Text>A 더하기</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.navigationButton}
        onPress={() => {
          console.log("Navigation button pressed");
          router.push('/second');
        }}
      >
        <Text style={styles.navigationButtonText}>다른 화면으로 이동</Text>
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
  navigationButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  navigationButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
