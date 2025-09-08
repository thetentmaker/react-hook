import 'react-native';
import { Text, View } from 'react-native';

export default function RootLayout() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 100 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "red" }}>Hello</Text>
    </View>
  );
}
