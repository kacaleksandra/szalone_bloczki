import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home";
import Register from "../../screens/Register";
import MainMenu from "../../screens/MainMenu";

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "Strona główna" }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: "Rejestracja" }}
      />
      <Stack.Screen
        name="MainMenu"
        component={MainMenu}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
