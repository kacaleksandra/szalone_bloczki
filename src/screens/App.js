// App.js
import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "../components/Navigator";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

export default () => (
  <NavigationContainer>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <StatusBar style="auto" />
      <Navigator />
    </ApplicationProvider>
  </NavigationContainer>
);
