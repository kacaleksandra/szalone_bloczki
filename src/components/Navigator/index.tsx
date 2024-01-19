import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home";
import Register from "../../screens/Register";
import MainMenu from "../../screens/MainMenu";
import MyProjects from "../../screens/MyProjects";
import EditProject from "../../screens/EditProject";
import NewProject from "../../screens/NewProject";
import ProjectOptions from "../../screens/ProjectOptions";
import Blocks from "../../screens/Blocks";
import { ProjectCode } from "../../screens/ProjectCode";

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
      <Stack.Screen
        name="ProjectOptions"
        component={ProjectOptions}
        options={{ title: "Opcje projektu" }}
      />
      <Stack.Screen
        name="Blocks"
        component={Blocks}
        options={{ title: "Bloczki" }}
      />
      <Stack.Screen
        name="ProjectCode"
        component={ProjectCode}
        options={{ title: "Eksport do kodu" }}
      />
    </Stack.Navigator>
  );
}
