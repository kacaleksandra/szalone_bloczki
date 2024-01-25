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
import ViewShot from "react-native-view-shot";
import { getToken } from "../../composables/getToken";
import * as Clipboard from "expo-clipboard";

export default function Blocks() {
  const route = useRoute();
  const token = getToken();

  const uploadImage = async (imageUri: string) => {
    try {
      const image = await fetch(imageUri);

      const imageBlob = await image.blob();

      const base64data: string = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageBlob);
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
      });

      if (!base64data) {
        throw new Error("Base64 data is undefined or null");
      }

      const name = imageUri.split("/").pop();

      const payload = {
        Parameters: [
          {
            Name: "File",
            FileValue: {
              Name: name,
              Data: base64data.split(",")[1],
            },
          },
          {
            Name: "StoreFile",
            Value: true,
          },
        ],
      };

      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const requestOptions = {
        method: "POST",
        body: JSON.stringify(payload),
        headers,
      };

      fetch(
        "https://v2.convertapi.com/convert/jpg/to/pdf?Secret=cEQJxFRAJ6DrvzDe",
        requestOptions
      )
        .then(async (response) => {
          const data = await response.json();
          console.log(data);
          setUri(data.Files[0].Url);
          Alert.alert("Został wygenerowany PDF", "", [
            {
              text: "Skopiuj do schowka",
              onPress: async () =>
                await Clipboard.setStringAsync(data.Files[0].Url),
            },
          ]);
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

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
    const jsCode = jsonString;
    console.log("sending object to webview");
    setTimeout(() => {
      webViewRef.current.postMessage(jsCode);
    }, 500);
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
      <ViewShot
        ref={viewShot}
        options={{ format: "jpg", quality: 1 }}
        style={{ height: "93.5%" }}
      >
        <WebView
          ref={webViewRef}
          source={{
            uri: "https://deniorrr.github.io/bloczki-diagram/",
          }}
          onLoadEnd={sendObjectToWebView}
        />
      </ViewShot>
      <Button onPress={captureScreen} size="large">
        Wygeneruj PDF
      </Button>
    </>
  );
}
