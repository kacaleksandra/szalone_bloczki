import { Image, View, Dimensions } from "react-native";
import { Layout, Text } from "@ui-kitten/components";

const windowWidth = Dimensions.get("window").width;

//MAIN PAGE
export default function Home() {
  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../../assets/full_app_logo.png")}
        style={{ width: windowWidth }}
        resizeMode="contain"
      />
    </Layout>
  );
}
