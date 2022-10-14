import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Alert } from 'react-native';
import { Input, Button, ListItem, Icon } from'react-native-elements';
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
    }, errorAlertSave, updateList);
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
    }, errorAlertDelete, updateList);
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
        <Input
          placeholder='Product'
          onChangeText={ product => setProduct(product) }
          value={product}
        />
        <Input
          placeholder='Amount'
          onChangeText={ amount => setAmount(amount) }
          value={amount}
        />
        <Button 
        icon={
          <Icon
            name="save"
            size={25}
            color="white"
          />
        }
        title="Save" onPress={saveGroceries} />
      </View>
      <View style={styles.viewShoppingList}>
        
        <Text style={styles.heading}>Shopping list</Text>
        {
          itemList.map((item, i) => (
            <ListItem key={i} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{item.product}, {item.amount} </ListItem.Title>
              </ListItem.Content>
              <Icon type="material" name="delete" onPress={() => deleteItems(item.id)}/>
            </ListItem>
          ))
        }
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewShoppingList: {
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listcontainer: {
    marginTop: 10,
    justifyContent: 'center',
  },
});