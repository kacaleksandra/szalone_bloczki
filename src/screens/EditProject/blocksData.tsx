import { Text, View } from "react-native";
import { Input } from "@ui-kitten/components";

export const blocksData = [
  {
    id: 0,
    name: "wypisz tekst",
    getContent: (
      itemKey: number,
      inputValues: any[],
      changeValue: (itemKey: number, inputKey: number, value: any) => void
    ) => (
      <>
        <Input
          placeholder="tekst"
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
    name: "wypisz zmienną",
    getContent: (
      itemKey: number,
      inputValues: any[],
      changeValue: (itemKey: number, inputKey: number, value: any) => void
    ) => (
      <Input
        placeholder="nazwa"
        value={inputValues[0]}
        onChangeText={(value) => changeValue(itemKey, 0, value)}
      />
    ),
    inputAmount: 1,
  },
  {
    id: 2,
    name: "przypisz zmienną",
    getContent: (
      itemKey: number,
      inputValues: any[],
      changeValue: (itemKey: number, inputKey: number, value: any) => void
    ) => (
      <>
        <Input
          placeholder="nazwa"
          value={inputValues[0]}
          onChangeText={(value) => changeValue(itemKey, 0, value)}
        />
        <View className="flex items-center">
          <Text> = </Text>
        </View>
        <Input
          placeholder="wartość"
          value={inputValues[1]}
          onChangeText={(value) => changeValue(itemKey, 1, value)}
        />
      </>
    ),
    inputAmount: 2,
  },
  {
    id: 3,
    name: "jeżeli",
    getContent: (
      itemKey: number,
      inputValues: any[],
      changeValue: (itemKey: number, inputKey: number, value: any) => void
    ) => (
      <>
        <View className=" my-1">
          <Text> Jeżeli </Text>
        </View>
        <Input
          placeholder="nazwa"
          value={inputValues[0]}
          onChangeText={(value) => changeValue(itemKey, 0, value)}
        />
        <View className="my-1">
          <Text>większy niż </Text>
        </View>
        <Input
          placeholder="wartość"
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
