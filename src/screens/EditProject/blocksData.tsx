import { Text, View } from "react-native";
import { Input, Select, SelectItem, IndexPath } from "@ui-kitten/components";

const options = ["==", "!=", ">", "<", ">=", "<="];

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
          <Select
            value={options[inputValues[1] ?? 0]}
            selectedIndex={new IndexPath(inputValues[1])}
            onSelect={(index) => changeValue(itemKey, 1, index.row)}
          >
            {options.map((title, index) => (
              <SelectItem key={index} title={title} />
            ))}
          </Select>
        </View>
        <Input
          placeholder="wartość"
          value={inputValues[2]}
          onChangeText={(value) => changeValue(itemKey, 2, value)}
        />
      </>
    ),
    inputAmount: 3,
    hasInside: true,
    inside: [],
  },
  {
    id: 4,
    name: "dopóki",
    getContent: (
      itemKey: number,
      inputValues: any[],
      changeValue: (itemKey: number, inputKey: number, value: any) => void
    ) => (
      <>
        <View className=" my-1">
          <Text> Dopóki </Text>
        </View>
        <Input
          placeholder="nazwa"
          value={inputValues[0]}
          onChangeText={(value) => changeValue(itemKey, 0, value)}
        />
        <View className="my-1">
          <Select
            value={options[inputValues[1] ?? 0]}
            selectedIndex={new IndexPath(inputValues[1])}
            onSelect={(index) => changeValue(itemKey, 1, index.row)}
          >
            {options.map((title, index) => (
              <SelectItem key={index} title={title} />
            ))}
          </Select>
        </View>
        <Input
          placeholder="wartość"
          value={inputValues[2]}
          onChangeText={(value) => changeValue(itemKey, 2, value)}
        />
      </>
    ),
    inputAmount: 3,
    hasInside: true,
    inside: [],
  },
  {
    id: 5,
    name: "utwórz tablicę",
    getContent: (
      itemKey: number,
      inputValues: any[],
      changeValue: (itemKey: number, inputKey: number, value: any) => void
    ) => (
      <Input
        placeholder="nazwa tablicy"
        value={inputValues[0]}
        onChangeText={(value) => changeValue(itemKey, 0, value)}
      />
    ),
    inputAmount: 1,
  },
  {
    id: 6,
    name: "utwórz losową tablicę",
    getContent: (
      itemKey: number,
      inputValues: any[],
      changeValue: (itemKey: number, inputKey: number, value: any) => void
    ) => (
      <>
        <Input
          placeholder="nazwa tablicy"
          value={inputValues[0]}
          onChangeText={(value) => changeValue(itemKey, 0, value)}
        />
        <View className="flex items-center">
          <Text> Rozmiar: </Text>
        </View>
        <Input
          placeholder="rozmiar tablicy"
          value={inputValues[1]}
          onChangeText={(value) => changeValue(itemKey, 1, value)}
        />
      </>
    ),
    inputAmount: 2,
  },
  {
    id: 7,
    name: "przypisz do tablicy",
    getContent: (
      itemKey: number,
      inputValues: any[],
      changeValue: (itemKey: number, inputKey: number, value: any) => void
    ) => (
      <>
        <Input
          placeholder="nazwa tablicy"
          value={inputValues[0]}
          onChangeText={(value) => changeValue(itemKey, 0, value)}
        />
        <View
          style={{
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="flex items-center"
        >
          <Text> [ </Text>
          <Input
            placeholder="indeks"
            value={inputValues[1]}
            onChangeText={(value) => changeValue(itemKey, 1, value)}
          />
          <Text> ] </Text>
        </View>
        {/* <View className="flex items-center">
        </View> */}
        <View className="flex items-center">
          <Text> = </Text>
        </View>
        <Input
          placeholder="wartość"
          value={inputValues[2]}
          onChangeText={(value) => changeValue(itemKey, 2, value)}
        />
      </>
    ),
    inputAmount: 3,
  },
  {
    id: 8,
    name: "wepchnij do tablicy",
    getContent: (
      itemKey: number,
      inputValues: any[],
      changeValue: (itemKey: number, inputKey: number, value: any) => void
    ) => (
      <>
        <Input
          placeholder="nazwa tablicy"
          value={inputValues[0]}
          onChangeText={(value) => changeValue(itemKey, 0, value)}
        />
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
    id: 9,
    name: "usuń z tablicy",
    getContent: (
      itemKey: number,
      inputValues: any[],
      changeValue: (itemKey: number, inputKey: number, value: any) => void
    ) => (
      <>
        <Input
          placeholder="nazwa tablicy"
          value={inputValues[0]}
          onChangeText={(value) => changeValue(itemKey, 0, value)}
        />

        <Input
          placeholder="indeks"
          value={inputValues[1]}
          onChangeText={(value) => changeValue(itemKey, 1, value)}
        />
      </>
    ),
  },
];
