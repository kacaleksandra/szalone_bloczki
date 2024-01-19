import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  Divider,
  Icon,
  IconElement,
  List,
  ListItem,
} from "@ui-kitten/components";
import { getApiURL } from "../../composables/getApiURL";
import { getToken } from "../../composables/getToken";
import { ProjectProperties } from "../../screens/NewProject/definitions";
import { useNavigation } from "@react-navigation/native";

export interface IListItem {
  id: number;
  data: string;
  name: string;
  description: string;
}

interface ListDividersShowcaseProps {
  items: IListItem[];
  set: any;
}

export const ListDividersShowcase = ({
  items,
  set: setProjects,
}: ListDividersShowcaseProps): React.ReactElement => {
  const navigation = useNavigation() as any;
  const token = getToken();

  const handleDeleteProject = async (itemId: number) => {
    try {
      const apiUrl = getApiURL();
      const response = await fetch(`${apiUrl}schematics/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(
          `Network request failed with status ${response.status}`
        );
      }
      setProjects(items.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting projects");
    }
  };

  function handleClick(item: ProjectProperties) {
    navigation.navigate("ProjectOptions", item);
  }

  const renderItemIcon = (props: any, itemId: number): IconElement => (
    <TouchableOpacity onPress={() => handleDeleteProject(itemId)}>
      <Icon
        {...props}
        style={[props.style, { width: 25, height: 25 }]}
        name="trash-outline"
      />
    </TouchableOpacity>
  );

  const renderItem = ({
    item,
    index,
  }: {
    item: IListItem;
    index: number;
  }): React.ReactElement => (
    <ListItem
      title={`${index + 1}. ${item.name}`}
      accessoryRight={(props) => renderItemIcon(props, item.id)}
      style={styles.items}
      onPress={() => handleClick(item)}
    />
  );

  return (
    <List
      style={styles.container}
      data={items}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  items: {
    paddingVertical: 30,
  },
  icon: {
    width: 32,
    height: 32,
  },
});
