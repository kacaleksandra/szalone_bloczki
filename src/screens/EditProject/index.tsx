import { View, Text, FlatList } from "react-native";
import { useState } from "react";
import { blocksData } from "./blocksData";
import BlockPicker from "./blockPicker";
import { Block } from "./blocksType";
import { blocksOperations } from "./blocksOperations";
import { Button, Divider } from "@ui-kitten/components";

// type Block = {
//   id: number;
//   name: string;
//   getContent: () => JSX.Element;
//   variableName?: string;
//   variableValue?: string;
//   hasInside?: boolean;
//   inside: Block[];
//   key: number;
// };

export default function EditProject() {
  const [isListVisible, setIsListVisible] = useState(false);
  const [selectedFruit, setSelectedFruit] = useState("apple");
  const [blocksCounter, setBlocksCounter] = useState(0);

  const [blocks, setBlocks] = useState<Block[]>([]);

  const addBlock = (block: number) => {
    const newBlock: Block = {
      ...blocksData[block],
      key: blocksCounter,
      inside: [],
    };
    blocksOperations.addBlockToEnd(blocks, newBlock);
    setBlocksCounter(blocksCounter + 1);
    setBlocks([...blocks]);
    setIsListVisible(false);
  };
  const deleteBlock = (objectKey: number) => {
    console.log("deleting object with key: " + objectKey);
    blocksOperations.deleteObject(blocks, objectKey);
    setBlocks([...blocks]);
  };

  const moveUp = (objectKey: number) => {
    const movedObject = blocksOperations.moveObjectUp(blocks, objectKey);
    if (movedObject) {
      setBlocks([...blocks]);
    } else {
      console.log("Object not found");
    }
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
                      deleteBlock(item.key);
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
