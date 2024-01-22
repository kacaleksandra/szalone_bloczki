import { Button } from "@ui-kitten/components";
import React, { useState, useRef } from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { getApiURL } from "../../composables/getApiURL";
import ViewShot from "react-native-view-shot";
import { Buffer } from "buffer";
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

  const uploadImage = async (imageUri: string) => {
    try {
      const image = await fetch(imageUri);
      const imageBlob = await image.blob();
      const reader = new FileReader();
      reader.readAsDataURL(imageBlob);
      reader.onloadend = async function () {
        const base64data = reader.result;
        const apiURL = getApiURL();
        await axios
          .post(
            `${apiURL}convert`,
            { data: base64data },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response.data);
          });
      };
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  //to pewnie do innego pliku pójdzie
  // const styles = StyleSheet.create({
  //   container: {
  //     width: WIDTH * SIZE + 2 * BORDERWIDTH,
  //     borderColor: "blue",
  //     borderWidth: 1,
  //     margin: 5,
  //     marginTop: 40,
  //   },
  // });

  const viewShot = useRef<any>(null);
  const [uri, setUri] = useState<string>("");

  const captureScreen = () => {
    if (viewShot.current != null) {
      console.log("taking screenshot");
      viewShot.current.capture().then((uri: string) => {
        setUri(uri);
        uploadImage(uri);
      });
      console.log(uri);
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
    }, 2000);
    //webViewRef.current.postMessage(jsCode);
  };
  return (
    <>
      {/* <ScrollView
        maximumZoomScale={2}
        minimumZoomScale={0.5}
        contentContainerStyle={styles.container}
      >*/}
      <ViewShot
        ref={viewShot}
        options={{ format: "jpg", quality: 1 }}
        style={{ width: "100%", height: "90%" }}
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

      {/*}
      <View>
        <Button onPress={captureScreen}>Save as Image</Button>
      </View> */}
    </>
  );
}
