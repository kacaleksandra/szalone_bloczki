import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Text, Input, Button, Layout } from "@ui-kitten/components";
import { ProjectProperties } from "./definitions";

export default function NewProject({ navigation }: any) {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleNext = () => {
    if (projectName.trim() === "" || projectDescription.trim() === "") {
      Alert.alert("Błąd", "Wypełnij wszystkie pola");
    } else {
      console.log(projectName, projectDescription);
      const projectProperties: ProjectProperties = {
        name: projectName,
        description: projectDescription,
      };
      navigation.navigate("EditProject", projectProperties);
    }
  };

  return (
    <Layout>
      <View className="bg-white flex h-full">
        <View className="h-2/3 flex flex-grow justify-around mx-8 mb-48">
          <View>
            <Text category="s2" style={styles.text}>
              Na tym etapie tworzenia Twojego schematu blokowego musisz nadać
              nazwę swojemu projektowi oraz dodać krótki opis.
            </Text>
          </View>
          <View>
            <Input
              placeholder="Nazwa projektu"
              value={projectName}
              onChangeText={(text) => setProjectName(text)}
              style={{ marginBottom: 30 }}
            />
            <Input
              placeholder="Opis projektu"
              value={projectDescription}
              onChangeText={(text) => setProjectDescription(text)}
              textStyle={{ minHeight: 64 }}
              multiline={true}
              blurOnSubmit={true}
            />
          </View>
          <Button onPress={handleNext}>Przejdź dalej</Button>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 20,
  },
});
