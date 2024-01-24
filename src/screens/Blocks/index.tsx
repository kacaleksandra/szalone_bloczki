import {
  Button,
  Divider,
  Icon,
  IconElement,
  Text,
} from "@ui-kitten/components";
import React, { useState, useRef } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { useRoute } from "@react-navigation/native";
import { getApiURL } from "../../composables/getApiURL";
import ViewShot from "react-native-view-shot";
import { getToken } from "../../composables/getToken";

//Block diagram view
export default function Blocks() {
  // const WIDTH = 5;
  // const SIZE = 130;
  // const BORDERWIDTH = 1;
  const route = useRoute();
  const token = getToken();
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

  const uploadImage = async (imageUri: string, fileName: string) => {
    try {
      const image = await fetch(imageUri);
      const imageBlob = await image.blob();

      const base64data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageBlob);
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
      });

      if (!base64data) {
        throw new Error("Base64 data is undefined or null");
      }

      const response = await fetch(
        "https://v2.convertapi.com/convert/jpg/to/pdf?Secret=cEQJxFRAJ6DrvzDe",
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            Parameters: [
              {
                Name: "File",
                FileValue: {
                  Name: "plik.pdf",
                  Data: base64data.toString(),
                },
              },
              {
                Name: "StoreFile",
                Value: true,
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Network request failed with status ${response.status}`
        );
      }

      const pdfLink = await response.json();
      console.log(pdfLink);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  // const apiURL = getApiURL();

  //   const response = await fetch(`${apiURL}convert`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "text/plain",
  //     },
  //     method: "POST",
  //     body: base64data.toString(),
  //   });

  //   if (!response.ok) {
  //     throw new Error(
  //       `Network request failed with status ${response.status}`
  //     );
  //   }
  //   const pdfBlob = await response.blob();
  // } catch (error) {
  //   console.error("Upload failed:", error);
  // }
  // };

  const viewShot = useRef<any>(null);
  const [uri, setUri] = useState<string>("");

  const captureScreen = async () => {
    if (viewShot.current !== null) {
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
            uri: "https://deniorrr.github.io/bloczki-diagram/",
          }}
          onLoadEnd={sendObjectToWebView}
        />
      </ViewShot>
      {/*</ScrollView> */}
      <Button onPress={captureScreen} size="large">
        Wygeneruj PDF
      </Button>
    </>
  );
}
