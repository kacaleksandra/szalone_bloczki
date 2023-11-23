// App.js
import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import Register from "./Register";

const Stack = createNativeStackNavigator();

export default () => (
  <NavigationContainer>
    <ApplicationProvider {...eva} theme={eva.light}>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Strona główna" }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: "Rejestracja" }}
        />
      </Stack.Navigator>
    </ApplicationProvider>
  </NavigationContainer>
);
