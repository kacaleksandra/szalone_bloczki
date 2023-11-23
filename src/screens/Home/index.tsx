import { Image, View, Dimensions } from "react-native";
import { Layout, Text, Input, Button } from "@ui-kitten/components";

const windowWidth = Dimensions.get("window").width;

//MAIN PAGE
export default function Home({ navigation }: any) {
  return (
    <Layout
      style={{ flex: 1, justifyContent: "space-around", alignItems: "center" }}
    >
      <View className="flex self-center h-1/3 py-16">
        <Image
          source={require("../../assets/full_app_logo.png")}
          style={{ width: windowWidth, height: 200 }}
          resizeMode="contain"
        />
      </View>
      <View className="flex justify-around h-1/2 mb-24 w-3/4">
        <View>
          <Text style={{ textAlign: "center" }} category="h2">
            Logowanie
          </Text>
        </View>
        <View className="flex justify-between h-1/3">
          <Input label="Login" size="large" />
          <Input label="Hasło" size="large" />
        </View>
        <View>
          <Button>Zaloguj mnie</Button>
          <Text
            category="s2"
            style={{ textAlign: "center", padding: 16 }}
            onPress={() => navigation.navigate("Register")}
          >
            Nie masz konta? Zarejestruj się
          </Text>
        </View>
      </View>
    </Layout>
  );
}
