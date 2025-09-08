import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: '홈 화면',
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="second" 
        options={{ 
          title: '두 번째 화면',
          headerShown: true 
        }} 
      />
    </Stack>
  );
}
