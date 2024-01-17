import { View, Image } from "react-native";
import { Dimensions, StyleSheet } from "react-native";
import { Button } from "@ui-kitten/components";
import useAccessTokenStore from "../../composables/store";

export default function MainMenu({ navigation }: any) {
  const logout = () => {
    useAccessTokenStore.setState({
      accessToken: "",
    });
    navigation.navigate("Home");
  };

  const token = useAccessTokenStore((state) => state.accessToken);
  console.log(token);
  return (
    <View className="w-full h-full flex justify-around pb-14 bg-white">
      <View className="w-full h-1/2 mt-10">
        <Image
          source={require("../../assets/full_app_logo.png")}
          style={{ width: Dimensions.get("window").width, height: 200 }}
          resizeMode="contain"
          className="my-auto"
        />
      </View>
      <View className="h-1/2 py-5 w-2/3 justify-around mx-auto">
        <Button
          style={styles.button}
          size="giant"
          appearance="filled"
          onPress={() => navigation.navigate("NewProject")}
        >
          Stwórz nowy projekt
        </Button>
        <Button
          style={{
            ...styles.button,
          }}
          size="giant"
          appearance="outline"
          onPress={() => navigation.navigate("MyProjects")}
        >
          Moje zapisane projekty
        </Button>
        <Button
          style={{
            ...styles.button,
          }}
          size="giant"
          appearance="outline"
          onPress={() => logout()}
        >
          Wyloguj
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    height: 100,
  },
});
