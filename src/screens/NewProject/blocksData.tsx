import { Text } from "react-native";
import { Input } from "@ui-kitten/components";

export const blocksData = [
  {
    id: 0,
    name: "print string",
    getContent: () => (
      <Text>
        <Input placeholder="text" />
      </Text>
    ),
  },
  {
    id: 1,
    name: "print variable",
    getContent: () => <Input placeholder="name" />,
  },
  {
    id: 2,
    name: "assign variable",
    variableName: "variable name",
    variableValue: "variable value",
    getContent: () => (
      <Text>
        <Input placeholder="name" /> = <Input placeholder="value" />
      </Text>
    ),
  },
  // More blocks...
];
