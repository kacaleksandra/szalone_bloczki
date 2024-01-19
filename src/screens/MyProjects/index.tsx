import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ListDividersShowcase, IListItem } from "../../components/List";
import { getApiURL } from "../../composables/getApiURL";
import { getToken } from "../../composables/getToken";

export default function MyProjects() {
  const [projects, setProjects] = useState<IListItem[]>([]);
  const token = getToken();

  const fetchProjects = async () => {
    try {
      const apiUrl = getApiURL();
      const response = await fetch(`${apiUrl}schematics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(
          `Network request failed with status ${response.status}`
        );
      }
      const data = await response.json();
      console.log(data);
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <View>
      <ListDividersShowcase items={projects} set={setProjects} />
    </View>
  );
}
