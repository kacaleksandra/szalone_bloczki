import { Text } from "@ui-kitten/components";
import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Int32 } from "react-native/Libraries/Types/CodegenTypes";

//Block diagram view
export default function Blocks() {
  const HEIGHT = 10;
  const WIDTH = 5;
  const SIZE = 130;
  const BORDERWIDTH = 1;

  const [tableContent, setTableContent] = useState(
    Array.from({ length: HEIGHT }, (v) =>
      Array.from({ length: WIDTH }, (v) => 0)
    )
  );

  const setArrayValue = (row: number, column: number, value: any) => {
    if (column < 0 || row < 0) return null;
    if (column >= HEIGHT || row >= WIDTH) return null;
    let helper = [...tableContent];
    helper[column][row] = value;
    setTableContent(helper);
  };

  //to pewnie do innego pliku pójdzie
  const styles = StyleSheet.create({
    container: {
      width: WIDTH * SIZE + 2 * BORDERWIDTH,
      borderColor: "blue",
      borderWidth: 1,
    },
    row: {
      flexDirection: "row",
    },
    square: {
      width: SIZE,
      height: SIZE,
      borderColor: "lightblue",
      margin: 0,
      borderWidth: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  useEffect(() => {
    setArrayValue(1, 1, "Start");
    setArrayValue(1, 2, "print(x)");
    setArrayValue(1, 3, "End");
  }, []);

  const rows = Array.from({ length: HEIGHT }).map((_, rowIndex) => {
    // Generate an array of columns for each row
    const columns = Array.from({ length: WIDTH }).map((_, colIndex) => (
      <View key={`${rowIndex}-${colIndex}`} style={styles.square}>
        {/* <Text>Row: {rowIndex}</Text>
        <Text>Col: {colIndex}</Text> */}
        <Text>{tableContent[rowIndex][colIndex]}</Text>
      </View>
    ));
    return (
      <View key={rowIndex} style={styles.row}>
        {columns}
      </View>
    );
  });
  return (
    <ScrollView
      maximumZoomScale={2}
      minimumZoomScale={0.5}
      // contentContainerStyle={{  }}
      contentContainerStyle={styles.container}
    >
      {rows}
      {/* <ScrollView contentContainerStyle={styles.container}>{rows}</ScrollView> */}
    </ScrollView>
  );
}
