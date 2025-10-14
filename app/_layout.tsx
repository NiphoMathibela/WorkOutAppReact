import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import 'react-native-reanimated';
import { ActivitiesContextProvider } from "./contexts/activitiesContext";


export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ActivitiesContextProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="(tabs)"
          />
          <Stack.Screen
            name="workout/[id]"
          />
        </Stack>
      </ActivitiesContextProvider>
    </GestureHandlerRootView>
  );
}
