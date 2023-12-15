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
  hasInside?: boolean;
  inside: Block[];
  key: number;
};

export default function NewProject() {
  const [isListVisible, setIsListVisible] = useState(false);
  const [selectedFruit, setSelectedFruit] = useState("apple");
  const [blocksCounter, setBlocksCounter] = useState(0);

  const [blocks, setBlocks] = useState<Block[]>([]);

  const addBlock = (block: number) => {
    if (blocks[blocks.length - 1]?.hasInside) {
      blocks[blocks.length - 1].inside.push({
        ...blocksData[block],
        key: blocksCounter,
        inside: [],
      });
      setBlocksCounter(blocksCounter + 1);
      setBlocks([...blocks]);
      setIsListVisible(false);
      return;
    }
    setBlocks([
      ...blocks,
      { ...blocksData[block], key: blocksCounter, inside: [] },
    ]);
    setBlocksCounter(blocksCounter + 1);
    setIsListVisible(false);
  };

  const moveUp = (key: number) => {
    console.log(key);
  };

  const renderList = (_blocks: Block[], mainList: Boolean = false) => {
    return (
      <FlatList
        data={_blocks}
        renderItem={({ item, index }) => (
          <>
            <View>
              <Text>{item.name}</Text>
              <Text>
                {item.getContent()}
                <View>
                  {/* // buttons */}
                  {index === _blocks.length - 1 &&
                    !mainList && ( //if it's the last element of the list, and the list is not the main one
                      <Button onPress={() => moveUp(item.key)}>
                        left arrow
                      </Button>
                    )}
                  <Button
                    onPress={() => {
                      console.log("Deleted item", item.key);
                    }}
                  >
                    Delete item
                  </Button>
                </View>
              </Text>
            </View>
            <Divider />
            <View
              style={{
                marginLeft: 10,
                paddingLeft: 10,
                borderLeftColor: "red",
                borderLeftWidth: 3,
              }}
            >
              {item.hasInside && renderList(item.inside)}
            </View>
          </>
        )}
      />
    );
  };

  const displayBlockPicker = () => {
    return (
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
      {isListVisible && displayBlockPicker()}
      {renderList(blocks, true)}
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
