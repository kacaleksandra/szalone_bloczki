import React from "react";
import { StyleSheet } from "react-native";
import {
  Divider,
  Icon,
  IconElement,
  List,
  ListItem,
} from "@ui-kitten/components";

export interface IListItem {
  id: number;
  data: string;
  name: string;
  description: string;
}

interface ListDividersShowcaseProps {
  items: IListItem[];
}

export const ListDividersShowcase = ({
  items,
}: ListDividersShowcaseProps): React.ReactElement => {
  const renderItemIcon = (props: any): IconElement => (
    <Icon
      {...props}
      style={[props.style, { width: 25, height: 25 }]}
      name="trash-outline"
    />
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
      accessoryRight={renderItemIcon}
      style={styles.items}
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
