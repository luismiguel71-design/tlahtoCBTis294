import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0F172A',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: '900',
            fontSize: 24,
          },
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Vozzy 🗣️',
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
