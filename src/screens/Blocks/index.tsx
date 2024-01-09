import { Text, Button } from "@ui-kitten/components";
import React, { useState, useEffect, useRef } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import ViewShot from "react-native-view-shot";
import { WebView } from "react-native-webview";
import axios from "axios";
import { set } from "react-hook-form";
import { useRoute } from "@react-navigation/native";
import { json } from "stream/consumers";

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

      await axios
        .post("http://192.168.5.10:3001/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
        });
    } catch (error) {
      console.error("Upload failed:", error);
      // Handle error scenarios
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

  // useEffect(() => {
  //   setArrayValue(1, 1, "Start");
  //   setArrayValue(1, 2, "print(x)");
  //   setArrayValue(1, 3, "End");
  // }, []);

  const viewShot = useRef<any>(null);
  const [uri, setUri] = useState<string>("");

  const captureScreen = () => {
    if (viewShot.current != null) {
      viewShot.current.capture().then((uri: string) => {
        setUri(uri);
        uploadImage(uri);
      });
      console.log(uri);
    } else {
      return;
    }
  };

  // const rows = Array.from({ length: HEIGHT }).map((_, rowIndex) => {
  //   const columns = Array.from({ length: WIDTH }).map((_, colIndex) => (
  //     <View key={`${rowIndex}-${colIndex}`} style={styles.square}>
  //       <Text>{tableContent[rowIndex][colIndex]}</Text>
  //     </View>
  //   ));
  //   return (
  //     <View key={rowIndex} style={styles.row}>
  //       {columns}
  //     </View>
  //   );
  // });
  const webViewRef = useRef(null);

  const blocksObject = {
    key1: "value1",
    key2: "value2",
    // ... other properties
  };

  const sendObjectToWebView = () => {
    // const jsonString = `[
    //   {"id": 2,
    //     "name": "przypisz zmienną",
    //     "inputAmount": 2,
    //     "key": 0,
    //     "inside": [],
    //     "valuesArray": [
    //       "i",
    //       "0"
    //     ]
    //   },
    //   {
    //     "id": 3,
    //     "name": "jeżelitest",
    //     "inputAmount": 3,
    //     "hasInside": true,
    //     "inside": [
    //       {
    //         "id": 1,
    //         "name": "wypisz zmienną",
    //         "inputAmount": 1,
    //         "key": 2,
    //         "inside": [],
    //         "valuesArray": [
    //           "Nie"
    //         ]
    //       }
    //     ],
    //     "key": 1,
    //     "valuesArray": [
    //       "i",
    //       0,
    //       "1"
    //     ]
    //   }
    // ]`;
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
      <WebView
        ref={webViewRef}
        source={{
          //uri: "192.168.5.9:3000",
          uri: "https://deniorrr.github.io/bloczki-diagram/",
        }}
        onLoadEnd={sendObjectToWebView}
      />
      <Button title="Send to WebView" onPress={sendObjectToWebView} />
      {/* <ScrollView
        maximumZoomScale={2}
        minimumZoomScale={0.5}
        contentContainerStyle={styles.container}
      >
        {/* <ViewShot
          ref={viewShot}
          options={{ format: "jpg", quality: 0.9 }}
        ></ViewShot> */}
      {/*         
      </ScrollView>
      <View>
        <Button onPress={captureScreen}>Save as Image</Button>
      </View> */}
    </>
  );
}
