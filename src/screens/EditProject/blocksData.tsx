import { Text, View } from "react-native";
import { Input } from "@ui-kitten/components";

export const blocksData = [
  {
    id: 0,
    name: "print string",
    getContent: (
      itemKey: number,
      inputValues: any[],
      changeValue: (itemKey: number, inputKey: number, value: any) => void
    ) => (
      <>
        <Input
          placeholder="text"
          style={{ width: "100%" }}
          value={inputValues[0]}
          onChangeText={(value) => changeValue(itemKey, 0, value)}
        />
      </>
    ),
    inputAmount: 1,
  },
  {
    id: 1,
    name: "print variable",
    getContent: (
      itemKey: number,
      inputValues: any[],
      changeValue: (itemKey: number, inputKey: number, value: any) => void
    ) => (
      <Input
        placeholder="name"
        value={inputValues[0]}
        onChangeText={(value) => changeValue(itemKey, 0, value)}
      />
    ),
    inputAmount: 1,
  },
  {
    id: 2,
    name: "assign variable",
    getContent: (
      itemKey: number,
      inputValues: any[],
      changeValue: (itemKey: number, inputKey: number, value: any) => void
    ) => (
      <>
        <Input
          placeholder="name"
          value={inputValues[0]}
          onChangeText={(value) => changeValue(itemKey, 0, value)}
        />
        <View className="flex items-center">
          <Text> = </Text>
        </View>
        <Input
          placeholder="value"
          value={inputValues[1]}
          onChangeText={(value) => changeValue(itemKey, 1, value)}
        />
      </>
    ),
    inputAmount: 2,
  },
  {
    id: 3,
    name: "if",
    getContent: (
      itemKey: number,
      inputValues: any[],
      changeValue: (itemKey: number, inputKey: number, value: any) => void
    ) => (
      <>
        <View className=" my-1">
          <Text> If </Text>
        </View>
        <Input
          placeholder="name"
          value={inputValues[0]}
          onChangeText={(value) => changeValue(itemKey, 0, value)}
        />
        <View className="my-1">
          <Text>bigger than </Text>
        </View>
        <Input
          placeholder="value"
          value={inputValues[1]}
          onChangeText={(value) => changeValue(itemKey, 1, value)}
        />
      </>
    ),
    inputAmount: 2,
    hasInside: true,
    inside: [],
  },
  // More blocks...
];
