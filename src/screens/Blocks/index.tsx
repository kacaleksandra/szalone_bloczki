import {
  Button,
  Divider,
  Icon,
  IconElement,
  Text,
} from "@ui-kitten/components";
import React, { useState, useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { getApiURL } from "../../composables/getApiURL";
import ViewShot from "react-native-view-shot";
import * as FileSystem from "expo-file-system";
import { getToken } from "../../composables/getToken";

//Block diagram view
export default function Blocks() {
  const HEIGHT = 10;
  const WIDTH = 5;
  const SIZE = 130;
  const BORDERWIDTH = 1;
  const route = useRoute();
  // const [tableContent, setTableContent] = useState(
  //   Array.from({ length: HEIGHT }, (v) =>
  //     Array.from({ length: WIDTH }, (v) => 0)
  //   )
  // );

  // const setArrayValue = (row: number, column: number, value: any) => {
  //   if (column < 0 || row < 0) return null;
  //   if (column >= HEIGHT || row >= WIDTH) return null;
  //   let helper = [...tableContent];
  //   helper[column][row] = value;
  //   setTableContent(helper);
  // };

  const token = getToken();

  const uploadImage = async (imageUri: string) => {
    try {
      const base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const apiURL = getApiURL();

      await axios
        .post(
          `${apiURL}convert`,
          { image: base64Image },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        });
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  //to pewnie do innego pliku pójdzie
  const styles = StyleSheet.create({
    container: {
      width: WIDTH * SIZE + 2 * BORDERWIDTH,
      borderColor: "blue",
      borderWidth: 1,
      margin: 5,
      marginTop: 40,
    },
  });

  const viewShot = useRef<any>(null);
  const [uri, setUri] = useState<string>("");

  const captureScreen = () => {
    if (viewShot.current != null) {
      console.log("taking screenshot");
      viewShot.current.capture().then(async (uri: string) => {
        setUri(uri);
        await uploadImage(uri);
      });
    } else {
      return;
    }
  };

  const webViewRef = useRef(null);

  const blocksObject = {
    key1: "value1",
    key2: "value2",
  };

  const sendObjectToWebView = () => {
    const jsonString = route.params.blocks;
    //const escapedJsonString = JSON.stringify(jsonString);
    const jsCode = jsonString;
    //const jsCode = `window.postMessage(${jsonString}, '*'); true;`;
    console.log("sending object to webview");
    setTimeout(() => {
      webViewRef.current.postMessage(jsCode);
    }, 500);
    //webViewRef.current.postMessage(jsCode);
  };

  const RightIcon = (props: any): IconElement => (
    <Icon
      {...props}
      style={[props.style, { width: 25, height: 25 }]}
      name="chevron-right-outline"
    />
  );

  type Variables = {
    name: string;
    value: any;
  };
  const [loading, setLoading] = useState(true);
  const [variables, setVariables] = useState<Variables[]>([]);

  function nextBlock(withTimeout: boolean = false) {
    setVariables([{ name: "test", value: "test" }]);
    console.log("next block");
  }

  return (
    <>
      <View className="h-1/5 bg-white">
        {variables && variables.length > 0 && (
          <ScrollView className="h-3/5">
            <View className="py-1">
              <View className="flex flex-row justify-around py-2">
                <Text style={{ fontWeight: "bold" }}>Nazwa</Text>
                <Text style={{ fontWeight: "bold" }}>Wartość</Text>
              </View>
              {variables.map((variable, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Text>{variable.name}</Text>
                  <Text>{variable.value}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        )}

        <Divider />
        <View className="flex flex-row justify-around py-2">
          <Button
            onPress={() => nextBlock()}
            appearance="ghost"
            size="tiny"
            accessoryLeft={RightIcon}
          ></Button>
          <Button onPress={() => nextBlock(true)}>Tryb ciągły</Button>
        </View>
      </View>
      {/* <ScrollView
        maximumZoomScale={2}
        minimumZoomScale={0.5}
        contentContainerStyle={styles.container}
      > */}
      <ViewShot
        ref={viewShot}
        options={{ format: "jpg", quality: 0.9 }}
        style={{ height: "73.5%" }}
      >
        <WebView
          ref={webViewRef}
          source={{
            //uri: "192.168.5.9:3000",
            uri: "https://deniorrr.github.io/bloczki-diagram/",
          }}
          onLoadEnd={sendObjectToWebView}
        />
      </ViewShot>
      {/* </ScrollView> */}
      <Button onPress={captureScreen} size="large">
        Wygeneruj PDF
      </Button>
    </>
  );
}
