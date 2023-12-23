import { View, Text, FlatList, StyleSheet } from "react-native";
import { useState } from "react";
import { blocksData } from "./blocksData";
import BlockPicker from "./blockPicker";
import { Block } from "./blocksType";
import { blocksOperations } from "./blocksOperations";
import { Button, Divider, Icon, IconElement } from "@ui-kitten/components";

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

const AddIcon = (props: any): IconElement => (
  <Icon
    {...props}
    style={[props.style, { width: 60, height: 60 }]}
    name="plus-circle-outline"
  />
);

export default function EditProject() {
  const [isListVisible, setIsListVisible] = useState(false);
  const [blocksCounter, setBlocksCounter] = useState(0);

  const [blocks, setBlocks] = useState<Block[]>([]);
  const [blocksValues, setBlocksValues] = useState<any>([]);

  const addBlock = (block: number) => {
    const newBlock: any = {
      ...blocksData[block],
      key: blocksCounter,
      inside: [],
    };
    initializeBlockValues(blocksData[block].inputAmount);
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

  const initializeBlockValues = (inputAmount: number) => {
    blocksValues.push(new Array(inputAmount));
    setBlocksValues([...blocksValues]);
  };

  const updateBlockValue = (
    objectKey: number,
    inputKey: number,
    value: string
  ) => {
    blocksValues[objectKey][inputKey] = value;
    setBlocksValues([...blocksValues]);
  };

  const moveLeft = (objectKey: number) => {
    const movedObject = blocksOperations.moveObjectLeft(blocks, objectKey);
    setBlocks([...blocks]);
  };
  const moveRight = (objectKey: number) => {
    const movedObject = blocksOperations.moveObjectRight(blocks, objectKey);
    setBlocks([...blocks]);
  };
  const moveUp = (objectKey: number) => {
    const movedObject = blocksOperations.moveObjectUp(blocks, objectKey);
    setBlocks([...blocks]);
  };
  const moveDown = (objectKey: number) => {
    const movedObject = blocksOperations.moveObjectDown(blocks, objectKey);
    setBlocks([...blocks]);
  };

  const mergeBlocksAndValues = (
    _blocks: Block[],
    mainList: Boolean = false
  ) => {
    _blocks.forEach((block) => {
      block.valuesArray = blocksValues[block.key];
      if (block.hasInside) {
        mergeBlocksAndValues(block.inside);
      }
    });
    if (mainList) {
      //here is ready to be sent to backend
      console.log(_blocks);
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
              <View>
                {item.getContent(
                  item.key,
                  blocksValues[item.key],
                  (objectKey, inputKey, inputValue) =>
                    updateBlockValue(objectKey, inputKey, inputValue)
                )}
                <View>
                  {/* buttons */}
                  {index === _blocks.length - 1 &&
                    !mainList && ( //if it's the last element of the list, and the list is not the main one
                      <Button onPress={() => moveLeft(item.key)}>left</Button>
                    )}

                  {/* if previous item has inside*/}
                  {index !== 0 && _blocks[index - 1].hasInside && (
                    <Button onPress={() => moveRight(item.key)}>right</Button>
                  )}
                  {/* if isn't the first item*/}
                  {index !== 0 && (
                    <Button
                      onPress={() => {
                        moveUp(item.key);
                      }}
                    >
                      Up
                    </Button>
                  )}
                  {/* if isn't the last item, move down*/}
                  {index !== _blocks.length - 1 && (
                    <Button
                      onPress={() => {
                        moveDown(item.key);
                      }}
                    >
                      Down
                    </Button>
                  )}
                  {/* delete item*/}
                  <Button
                    onPress={() => {
                      deleteBlock(item.key);
                    }}
                  >
                    Delete item
                  </Button>
                </View>
              </View>
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
    <>
      <View className="flex flex-grow justify-between">
        <View>
          <Text className="font-bold text-lg">1. Start </Text>
        </View>

        <View>
          {isListVisible && displayBlockPicker()}
          {renderList(blocks, true)}
        </View>
        <View>
          <Button
            onPress={() => mergeBlocksAndValues(blocks, true)}
            size="giant"
          >
            Gotowe!
          </Button>
        </View>
      </View>
      <View style={styles.button}>
        <Button
          onPress={() => setIsListVisible(true)}
          appearance="ghost"
          accessoryLeft={AddIcon}
        ></Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    //set absolute position
    position: "absolute",
    bottom: 60,
    right: 5,
  },
});

{
  /* 

  Step list with start and end step
  A button to add a new step
  Then a list shows up with all options
*/
}
