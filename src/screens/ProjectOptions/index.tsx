import { Dimensions, Image, StyleSheet, View } from "react-native";
import { Button } from "@ui-kitten/components";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function ProjectOptions({ navigation }: any) {
  const route = useRoute();
  const projectProperties = route.params?.projectProperties;

  return (
    <>
      <View className="w-full h-full flex justify-around pb-14 bg-white">
        <View className="h-1/2 py-5 w-2/3 justify-around mx-auto">
          <Button
            style={styles.button}
            size="giant"
            appearance="filled"
            onPress={() =>
              navigation.navigate("Blocks", { blocks: route.params?.blocks })
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
            onPress={() => navigation.navigate("MyProjects")}
          >
            Eksport do kodu
          </Button>
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
