import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{
          title: "PokeQuiz",
          headerShown: true,
          headerStyle: { backgroundColor: '#1E1E2A' },
          headerTintColor: '#00C2FF',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 22 },
          gestureEnabled: true,
          animation: "fade_from_bottom"
        }} 
      />
      <Stack.Screen 
        name="about" 
        options={{
          title: "Sobre",
          headerShown: true,
          headerStyle: { backgroundColor: '#1E1E2A' },
          headerTintColor: '#00C2FF',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 22 },
          gestureEnabled: true,
          animation: "fade_from_bottom"
        }} 
      />
    </Stack>
  );
}
