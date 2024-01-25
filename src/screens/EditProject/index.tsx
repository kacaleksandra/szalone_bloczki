import { View, Text, FlatList, StyleSheet, Keyboard } from "react-native";
import { useEffect, useState } from "react";
import { blocksData } from "./blocksData";
import BlockPicker from "./blockPicker";
import { Block } from "./blocksType";
import { blocksOperations } from "./blocksOperations";
import { Button, Divider, Icon, IconElement } from "@ui-kitten/components";
import { useRoute } from "@react-navigation/native";

const AddIcon = (props: any): IconElement => (
  <Icon
    {...props}
    style={[props.style, { width: 60, height: 60 }]}
    name="plus-circle-outline"
  />
);

const DeleteIcon = (props: any): IconElement => (
  <Icon
    {...props}
    style={[props.style, { width: 20, height: 20 }]}
    name="trash-outline"
  />
);

const UpIcon = (props: any): IconElement => (
  <Icon
    {...props}
    style={[props.style, { width: 20, height: 20 }]}
    name="arrow-upward-outline"
  />
);

const DownIcon = (props: any): IconElement => (
  <Icon
    {...props}
    style={[props.style, { width: 20, height: 20 }]}
    name="arrow-downward-outline"
  />
);

const RightIcon = (props: any): IconElement => (
  <Icon
    {...props}
    style={[props.style, { width: 20, height: 20 }]}
    name="corner-down-right-outline"
  />
);

const LeftIcon = (props: any): IconElement => (
  <Icon
    {...props}
    style={[props.style, { width: 20, height: 20 }]}
    name="corner-down-left-outline"
  />
);

export default function EditProject({ navigation }: any) {
  const route = useRoute();
  const blocksParam = route.params?.blocks;

  useEffect(() => {
    if (blocksParam) {
      const newData = JSON.parse(blocksParam);
      prepareDataToEdit(newData);
    }
  }, []);

  const [isListVisible, setIsListVisible] = useState(false);
  const [blocksCounter, setBlocksCounter] = useState(0);

  const [blocks, setBlocks] = useState<Block[]>([]);
  const [blocksValues, setBlocksValues] = useState<any>([]);

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  let biggestKey = 0;

  const prepareDataToEdit = (newData, newBlocksValues = [], isMain = true) => {
    const updatedData = newData.map((block) => {
      newBlocksValues[block.key] = block.valuesArray;
      if (block.key > biggestKey) {
        biggestKey = block.key;
      }
      if (block.hasInside) {
        block.inside = prepareDataToEdit(block.inside, newBlocksValues, false);
      }
      block.getContent = blocksData[block.id].getContent;
      return block;
    });
    console.log(newBlocksValues);
    setBlocksValues(newBlocksValues);
    if (isMain) {
      setBlocks(updatedData);
      setBlocksCounter(biggestKey + 1);
    }

    return updatedData;
  };
  const onKeyboardDidShow = () => {
    setIsKeyboardOpen(true);
  };

  const onKeyboardDidHide = () => {
    setIsKeyboardOpen(false);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      onKeyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      onKeyboardDidHide
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

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
    blocksOperations.deleteObject(blocks, objectKey);
    setBlocks([...blocks]);
  };

  const initializeBlockValues = (inputAmount: number) => {
    console.log(blocksValues);
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
      if (block.id === 3 || block.id === 4) {
        if (block.valuesArray[1] == undefined) {
          block.valuesArray[1] = 0;
        }
      }
    });
    if (mainList) {
      console.log(JSON.stringify(_blocks, null, 2));
    }
  };

  const complete = () => {
    mergeBlocksAndValues(blocks, true);
    console.log(blocks);
    navigation.navigate("ProjectOptions", {
      id: route.params?.id,
      name: route.params?.name,
      description: route.params?.description,
      data: JSON.stringify(blocks, null, 2),
    });
  };

  const renderList = (_blocks: Block[], mainList: Boolean = false) => {
    return (
      <FlatList
        style={{
          ...(isKeyboardOpen && {
            height: "50%",
          }),
        }}
        data={_blocks}
        renderItem={({ item, index }) => (
          <>
            <View className="w-full flex-row py-4 justify-between">
              <View className="justify-center mx-2 w-16">
                <Text className="text-m">{item.name}</Text>
              </View>
              <View className="flex flex-row items-center w-11/12">
                <View className="flex w-1/2 ">
                  {item.getContent(
                    item.key,
                    blocksValues[item.key],
                    (objectKey, inputKey, inputValue) =>
                      updateBlockValue(objectKey, inputKey, inputValue)
                  )}
                </View>
                {/* buttons */}
                <View className="flex flex-row">
                  <View>
                    {/* if isn't the first item*/}
                    {index !== 0 && (
                      <Button
                        onPress={() => moveUp(item.key)}
                        appearance="ghost"
                        size="tiny"
                        accessoryLeft={UpIcon}
                      ></Button>
                    )}
                    {/* if isn't the last item, move down*/}
                    {index !== _blocks.length - 1 && (
                      <Button
                        onPress={() => moveDown(item.key)}
                        appearance="ghost"
                        size="tiny"
                        accessoryLeft={DownIcon}
                      ></Button>
                    )}
                  </View>
                  <View>
                    {index === _blocks.length - 1 &&
                      !mainList && ( //if it's the last element of the list, and the list is not the main one
                        <Button
                          onPress={() => moveLeft(item.key)}
                          appearance="ghost"
                          size="tiny"
                          accessoryLeft={LeftIcon}
                        ></Button>
                      )}

                    {/* if previous item has inside*/}
                    {index !== 0 && _blocks[index - 1].hasInside && (
                      <Button
                        onPress={() => moveRight(item.key)}
                        appearance="ghost"
                        size="tiny"
                        accessoryLeft={RightIcon}
                      ></Button>
                    )}
                    {/* delete item*/}
                    <Button
                      onPress={() => deleteBlock(item.key)}
                      appearance="ghost"
                      size="small"
                      accessoryLeft={DeleteIcon}
                    ></Button>
                  </View>
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
      <View>
        <BlockPicker
          pickBlock={(id) => addBlock(id)}
          cancelPicking={() => setIsListVisible(false)}
        />
      </View>
    );
  };

  return (
    <>
      <View className="flex flex-grow justify-between bg-white">
        <View
          className="h-5/6"
          style={{
            ...(isKeyboardOpen && {
              height: "50%",
            }),
          }}
        >
          {renderList(blocks, true)}
        </View>
        <View className="absolute w-full top-3/4">
          {isListVisible && displayBlockPicker()}
        </View>
        <View>
          <Button onPress={() => complete()} size="giant">
            Przejdź dalej!
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
    position: "absolute",
    bottom: 50,
    right: 5,
  },
});
