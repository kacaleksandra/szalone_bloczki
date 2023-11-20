import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import Home from "./Home";

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <Home />
  </ApplicationProvider>
);
