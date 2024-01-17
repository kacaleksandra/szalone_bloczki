import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ListDividersShowcase, IListItem } from "../../components/List";
import { getApiURL } from "../../composables/getApiURL";
import useAccessTokenStore from "../../composables/store";

export default function MyProjects() {
  const [projects, setProjects] = useState<IListItem[]>([]);
  const accessToken = useAccessTokenStore((state) => state.accessToken);

  const fetchProjects = async () => {
    try {
      const apiUrl = getApiURL();
      const response = await fetch(`${apiUrl}schematics`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
      <ListDividersShowcase items={projects} />
    </View>
  );
}
