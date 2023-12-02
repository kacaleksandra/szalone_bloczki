import { useEffect, useState } from "react";
import { View } from "react-native";
import { ListDividersShowcase, IListItem } from "../../components/List";

export default function MyProjects() {
  const [projects, setProjects] = useState<IListItem[]>([]);

  useEffect(() => {
    const exampleProjects = [
      { title: "jeden" },
      { title: "dwa" },
      { title: "trzy" },
    ];
    setProjects(exampleProjects);
  }, []);
  return (
    <View>
      <ListDividersShowcase items={projects} />
    </View>
  );
}
