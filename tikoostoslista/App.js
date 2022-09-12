import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

export default function App() {
  const [grocery, setGrocery] = useState('');
  const [data, setData] = useState([]);
  const [key, setKey] = useState(0);

  const buttonAdd = () => {
    setData([...data, { id: key, title: grocery }]);
    setKey(key + 1);

    console.log(data);
  }

  const buttonClear = () => {

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
            style={styles.input}
            onChangeText={grocery => setGrocery(grocery)} value={grocery}
          />
        <View style={styles.buttons}>
          <Button
            title="Add"
            onPress={buttonAdd}
          />
          <Button
            title="Clear"
            onPress={() => setData(() => "")}
          />
          <StatusBar style="auto" />
        </View>
        <View style={styles.grocerylist}>
        <Text>Shopping List</Text>
        <FlatList
          data={data}
          renderItem={({ item }) =>
            <Text>{item.title}</Text>
          }
        />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  innerContainer: {
    width: 120,
  },
  centerResult: {
    alignItems: 'center',
  },
  input: {
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  grocerylist: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
});
