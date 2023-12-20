import { View } from "react-native";
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
    //console.log(itemValue);
    SetselectedBlock(itemValue);
  };

  return (
    <View
      style={{
        backgroundColor: "white",
      }}
    >
      <Picker
        selectedValue={selectedBlock}
        onValueChange={(itemValue) => {
          handleValueChange(itemValue);
        }}
      >
        {blocksData.map((block, index) => {
          return <Picker.Item key={index} label={block.name} value={index} />;
        })}
      </Picker>
      <Button
        onPress={() => {
          props.cancelPicking();
        }}
      >
        Cancel
      </Button>
      <Button
        onPress={() => {
          props.pickBlock(selectedBlock);
        }}
      >
        Add
      </Button>
    </View>
  );
};

export default BlockPicker;
