import { Button } from "@ui-kitten/components";
import React, { useState, useRef } from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { getApiURL } from "../../composables/getApiURL";

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

  const uploadImage = async (imageUri: String) => {
    try {
      console.log(imageUri);
      const formData = new FormData();
      formData.append("image", {
        uri: imageUri,
        name: "photo.jpg",
        type: "image/jpg", // Adjust the type as per your image format
      });

      const apiURL = getApiURL();

      await axios
        .post(`${apiURL}convert`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
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
      >
        <ViewShot ref={viewShot} options={{ format: "jpg", quality: 0.9 }}> */}
      <WebView
        ref={webViewRef}
        source={{
          //uri: "192.168.5.9:3000",
          uri: "https://deniorrr.github.io/bloczki-diagram/",
        }}
        onLoadEnd={sendObjectToWebView}
      />
      {/* </ViewShot>
      </ScrollView> */}
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
