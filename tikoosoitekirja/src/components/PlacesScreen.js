import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, Alert } from 'react-native';
import { Input, Button, ListItem, Icon, Text } from'react-native-elements';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('addressdb.db');

export default function AddressScreen() {
  const [address, setAddress] = useState('');
  const [savedAddresses, setSavedAddresses] = useState([]);

  //SQLite functions
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists addresslist (id integer primary key not null, address text);');
    }, null, updateList); 
  }, []);

  const saveAddress = () => {
    db.transaction(tx => {
      tx.executeSql('insert into addresslist (address) values (?);',
        [address]);
    }, errorAlertSave, updateList);
    console.log(savedAddresses);
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from addresslist;', [], (_, { rows }) =>
        setSavedAddresses(rows._array)
      );
    }, null, null);
  }

  const deleteItems = (id) => {
    db.transaction(tx => {
      tx.executeSql('delete from addresslist where id = ?;', [id]);
    }, errorAlertDelete, updateList);
  }

  const deleteDB = () => {
    db.transaction(tx => {
      tx.executeSql('drop database addresslist;');
    }, errorAlertDelete, updateList);
  }

  const errorAlertDelete = () => {
    Alert.alert('Something went wrong with deletion');
  }

  const errorAlertSave = () => {
    Alert.alert('Something went wrong saving');
  }

  const ShowOnMap = () => {
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
      <Input
        placeholder="Type in address"
        onChangeText={ address => setAddress(address) }
        value={address}
      />
      <Button
        icon={
          <Icon
            type="material"
            name="save"
            size={20}
            color="white"
          />
        }
        title="Save"
        onPress={saveAddress}
      />
      </View>
      <View style={styles.addressContainer}>
        {
          savedAddresses.map((item, i) => (
            <ListItem key={i} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{item.address}</ListItem.Title>
              </ListItem.Content>
              <Text onPress={() => ShowOnMap()}>Show on map</Text>
              {/*<Text onPress={() => deleteItems(item.id)}>delete</Text>*/}
              <ListItem.Chevron />
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
  inputContainer: {
    flex: 1,
  },
  addressContainer: {
    flex: 1,
  },

});
