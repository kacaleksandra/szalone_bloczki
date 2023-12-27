import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { blocksData } from "./blocksData";
import { Button } from "@ui-kitten/components";
import { Picker } from "@react-native-picker/picker";

type BlockPickerProps = {
  cancelPicking: () => void;
  pickBlock: (block: number) => void;
};

const BlockPicker = (props: BlockPickerProps) => {
  const [selectedBlock, SetselectedBlock] = useState(0);

  const handleValueChange = (itemValue: number) => {
    SetselectedBlock(itemValue);
  };

  return (
    <View style={styles.container}>
      <View style={styles.picker}>
        <Picker
          selectedValue={selectedBlock}
          onValueChange={(itemValue) => {
            handleValueChange(itemValue);
          }}
          style={{
            backgroundColor: "white",
          }}
        >
          {blocksData.map((block, index) => {
            return <Picker.Item key={index} label={block.name} value={index} />;
          })}
        </Picker>
      </View>
      <View className="w-full flex flex-row justify-around">
        <Button
          onPress={() => {
            props.cancelPicking();
          }}
          style={styles.button}
        >
          Cancel
        </Button>
        <Button
          onPress={() => {
            props.pickBlock(selectedBlock);
          }}
          style={styles.button}
        >
          Add
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "45%",
  },
  picker: {
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  container: {
    backgroundColor: "white",
    height: "50%",
  },
});

export default BlockPicker;
