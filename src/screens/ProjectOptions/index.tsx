import { StyleSheet, View } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import { useRoute } from "@react-navigation/native";
import { getToken } from "../../composables/getToken";
import { useState } from "react";
import { useEffect } from "react";
import { getApiURL } from "../../composables/getApiURL";

export default function ProjectOptions({ navigation }: any) {
  const route = useRoute();
  const token = getToken();
  const [saved, setSaved] = useState(false);
  const [idProject, setIdProject] = useState(0);
  const [fromDB, setFromDB] = useState(false);
  // const projectProperties = route.params?.projectProperties;

  useEffect(() => {
    if (route.params?.id) {
      setIdProject(route.params?.id);
      setFromDB(true);
    }
  }, []);

  async function saveProject() {
    const project = {
      name: route.params?.name,
      description: route.params?.description,
      data: route.params?.data,
    };

    try {
      const apiUrl = getApiURL();
      let response;
      if (fromDB) {
        console.log(`schematics?id=${route.params?.id}`);
        response = await fetch(`${apiUrl}schematics?id=${route.params?.id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(project),
        });
      } else {
        response = await fetch(`${apiUrl}schematics`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(project),
        });
      }
      if (response) {
        if (!response.ok) {
          throw new Error(
            `Network request failed with status ${response.status}`
          );
        }

        const data = await response.json();

        setSaved(true);
        setIdProject(data.id);
      }
    } catch (error) {
      console.error("Error saving project", error);
    }
  }

  return (
    <>
      <View className="w-full h-full flex justify-around pb-14 bg-white">
        <View>
          <Text category="h2" style={{ textAlign: "center", padding: 10 }}>
            {route.params?.name}
          </Text>
          <Text category="s1" style={{ textAlign: "center" }}>
            {route.params?.description}
          </Text>
        </View>
        <View className="h-3/4 py-5 w-2/3 justify-around mx-auto">
          <Button
            style={styles.button}
            size="giant"
            appearance="filled"
            onPress={() =>
              navigation.navigate("EditProject", {
                id: route.params?.id,
                name: route.params?.name,
                description: route.params?.description,
                blocks: route.params?.data,
              })
            }
          >
            Wyświetl listę kroków
          </Button>
          <Button
            style={styles.button}
            size="giant"
            appearance="filled"
            onPress={() =>
              navigation.navigate("Blocks", { blocks: route.params?.data })
            }
          >
            Wyświetl schemat
          </Button>

          <Button
            style={{
              ...styles.button,
            }}
            size="giant"
            appearance="outline"
            onPress={() =>
              navigation.navigate("ProjectCode", { id: idProject })
            }
          >
            Eksport do kodu
          </Button>
          {saved ? (
            <Text category="s1" style={{ textAlign: "center" }}>
              Zapisano projekt
            </Text>
          ) : (
            <Button
              style={{
                ...styles.button,
              }}
              size="giant"
              appearance="outline"
              onPress={() => saveProject()}
            >
              Zapisz projekt
            </Button>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    height: 100,
  },
});
