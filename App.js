import { StyleSheet, Text, View } from "react-native";

import List from "./components/List";
export default function App() {
  return (
    <View style={styles.container}>
      <List />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
});
