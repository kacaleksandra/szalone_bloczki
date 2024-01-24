import { useRoute } from "@react-navigation/native";
import { Text, TextInput, View } from "react-native";
import { getApiURL } from "../../composables/getApiURL";
import { getToken } from "../../composables/getToken";
import { Button } from "@ui-kitten/components";
import * as Clipboard from "expo-clipboard";
import { useState, useEffect } from "react";

export function ProjectCode() {
  const route = useRoute();
  const idProject = route.params?.id;
  const token = getToken();

  const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

  const [code, setCode] = useState(longText);

  useEffect(() => {
    fetchCode();
  }, []);

  async function fetchCode() {
    const json = JSON.stringify({ schematicId: idProject });
    try {
      const apiUrl = getApiURL();
      const response = await fetch(`${apiUrl}blocksToCode`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: json,
      });

      if (!response.ok) {
        throw new Error(`Network request failed with status ${response}`);
      }
      console.log("Data", JSON.stringify(response));
      const data = await response.json();
      console.log(data);
      let text = data.data.map((textLine: string) => textLine + "\n").join("");
      setCode(text);
    } catch (error) {
      console.error("Error generating code", error);
    }
  }

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(code);
  };

  return (
    <View className="bg-white h-full">
      <View className="mx-5 my-10">
        <Text className="py-4">Python:</Text>
        <TextInput
          value={code}
          editable={false}
          multiline
          style={{ borderWidth: 1, borderColor: "gray", height: 500 }}
        />
        <View className="my-5">
          <Button onPress={copyToClipboard}>Skopiuj</Button>
        </View>
      </View>
    </View>
  );
}
