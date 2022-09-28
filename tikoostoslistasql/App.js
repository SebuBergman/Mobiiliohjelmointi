import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default function App() {
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [items, setItems] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.textInput}
          placeholder='Product'
          onChangeText={product => setProduct(product) }
        />
        <TextInput
          style={styles.textInput}
          placeholder='Amount'
          onChangeText={amount => setAmount(amount) }
        />
        <Button title="Save" onPress= {saveItem} />
      </View>
      <View style={styles.viewShoppingList}>
        <Text style={styles.heading}>Shopping list</Text>
        <FlatList
          style={{marginLeft : "5%"}}
          data={items}
          renderItem={({ item }) =>
            <View style={styles.listcontainer}>
              <Text>{item.product}, {item.amount}</Text>
              <Text style={{color: '#0000ff'}} onPress={() => deleteItem(item.id)}>delete</Text>
            </View>}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewShoppingList: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    fontSize: 18,
    width: 80,
    borderBottomWidth: 1.0,
    marginBottom: 5,
  },
  listcontainer: {
    marginTop: 20,
    justifyContent: 'center',
  },
});
