import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ListDividersShowcase, IListItem } from "../../components/List";
import { getApiURL } from "../../composables/getApiURL";
import { getToken } from "../../composables/getToken";
import { set } from "react-hook-form";
import { Text } from "@ui-kitten/components";

export default function MyProjects() {
  const [projects, setProjects] = useState<IListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <View>
      {isLoading && (
        <View className="h-1/3 flex justify-center bg-white">
          <Text style={{ textAlign: "center" }}>Loading...</Text>
        </View>
      )}
      <ListDividersShowcase items={projects} set={setProjects} />
    </View>
  );
}
