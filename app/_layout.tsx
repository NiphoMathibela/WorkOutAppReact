import { Stack } from "expo-router";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import { ActivitiesContextProvider } from "./contexts/activitiesContext";

export default function RootLayout() {
  return <GestureHandlerRootView style={{flex:1}}>
    <ActivitiesContextProvider>
      <Stack>
        <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
        />
      </Stack>
    </ActivitiesContextProvider>
  </GestureHandlerRootView>
}
