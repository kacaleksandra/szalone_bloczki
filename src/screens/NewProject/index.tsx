import { View, Text, SectionList, FlatList } from "react-native";
import { useState } from "react";
import { blocksData } from "./blocksData";
import BlockPicker from "./blockPicker";
import { Button, Divider } from "@ui-kitten/components";

type Block = {
  id: number;
  name: string;
  getContent: () => JSX.Element;
  variableName?: string;
  variableValue?: string;
  key: number;
};

export default function NewProject() {
  const [isListVisible, setIsListVisible] = useState(false);
  const [selectedFruit, setSelectedFruit] = useState("apple");

  const [blocks, setBlocks] = useState<Block[]>([]);

  const addBlock = (block: number) => {
    setBlocks([...blocks, { ...blocksData[block], key: blocks.length }]);
    setIsListVisible(false);
  };

  const displayList = () => {
    return (
      // <View>
      //   <Text>{block.name}</Text>
      //   <Text>{block.description}</Text>
      // </View>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 2,
          backgroundColor: "white",
        }}
      >
        <BlockPicker
          cancelPicking={() => setIsListVisible(false)}
          pickBlock={(id) => addBlock(id)}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text>New project </Text>
      <Button onPress={() => setIsListVisible(true)}>Add new step</Button>
      {isListVisible && displayList()}
      <FlatList
        data={blocks}
        renderItem={({ item }) => (
          <>
            <View>
              <Text>{item.name}</Text>
              <Text>{item.getContent()}</Text>
            </View>
            <Divider />
          </>
        )}
      />
    </View>
  );
}

{
  /* 
  Before this view:
  - Project name input
  - Project description input
  - create project button
  Then:
  Step list with start and end step
  A button to add a new step
  Then a list shows up with all options
  At the beginning there are only 2 options:
  - print
  - assign variable
  After selecting one of them, the user is redirected to the screen with the form
  On the assign variable you can select the variable name and the value
*/
}
