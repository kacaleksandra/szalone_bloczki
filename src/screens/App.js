import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import Home from "./Home";
import Blocks from "./Blocks";
import { StatusBar } from "expo-status-bar";

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <StatusBar style="auto" />
    {/* black status bar */}
    <Blocks />
  </ApplicationProvider>
);
