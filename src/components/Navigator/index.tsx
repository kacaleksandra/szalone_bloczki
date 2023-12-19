import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home";
import Register from "../../screens/Register";
import MainMenu from "../../screens/MainMenu";
import MyProjects from "../../screens/MyProjects";
import EditProject from "../../screens/EditProject";
import NewProject from "../../screens/NewProject";

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
      <Stack.Screen
        name="MyProjects"
        component={MyProjects}
        options={{ title: "Moje projekty" }}
      />
      <Stack.Screen
        name="NewProject"
        component={NewProject}
        options={{ title: "Nowy projekt" }}
      />
      <Stack.Screen
        name="EditProject"
        component={EditProject}
        options={{ title: "Edycja projektu" }}
      />
    </Stack.Navigator>
  );
}
