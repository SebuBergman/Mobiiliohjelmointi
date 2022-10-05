import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, FlatList, Alert  } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('productdb.db');

export default function App() {
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists grocerylist (id integer primary key not null, product text, amount text);');
    }, null, updateList); 
  }, []);

  const saveGroceries = () => {
    db.transaction(tx => {
      tx.executeSql('insert into grocerylist (product, amount) values (?, ?);',
        [product, amount]);
    }, errorAlertSave, updateList)
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from grocerylist;', [], (_, { rows }) =>
        setItemList(rows._array)
      );
    }, null, null);
  }

  const deleteItems = (id) => {
    db.transaction(tx => {
      tx.executeSql('delete from grocerylist where id = ?;', [id]);
    }), errorAlertDelete, updateList
  }

  const errorAlertDelete = () => {
    Alert.alert('Something went wrong with deletion');
  }

  const errorAlertSave = () => {
    Alert.alert('Something went wrong saving');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.textInput}
          placeholder='Product'
          onChangeText={ product => setProduct(product) }
          value={product}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Amount'
          onChangeText={ amount => setAmount(amount) }
          value={amount}
        />
        <Button title="Save" onPress={saveGroceries} />
      </View>
      <View style={styles.viewShoppingList}>
        <Text style={styles.heading}>Shopping list</Text>
        <FlatList
          data={itemList}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) =>
            <View style={styles.listcontainer}>
              <Text>{item.product}, {item.amount}</Text>
              <Text style={{color: '#0000ff'}} onPress={() => deleteItems(item.id)}>bought</Text>
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
