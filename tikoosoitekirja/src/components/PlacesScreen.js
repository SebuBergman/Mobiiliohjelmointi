import React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Alert, TouchableHighlight } from 'react-native';
import { Input, Button, ListItem, Icon, Text } from'react-native-elements';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('test2db.db');

export default function PlacesScreen({ navigation }) {
  const [address, setAddress] = useState('');
  const [mapAddress, setMapAdress] = useState('');
  const [savedAddresses, setSavedAddresses] = useState([]);

  const delay = 500; // anti-rebound for 500ms
  let lastExecution = 0;

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

  const errorAlertDelete = () => {
    Alert.alert('Something went wrong with deletion');
  }

  const errorAlertSave = () => {
    Alert.alert('Something went wrong saving');
  }

  const ShowOnMap = (address) => {
    setMapAdress(address);
    navigation.navigate('Map', {mapAddress});
  }

  /*const NavigateToMapPage = () => {
    navigation.navigate('Map', {mapAddress});
  }*/

  //onPress={() => navigation.navigate('Map', {mapAddress})}
  //onPress={ShowOnMap(item.address)}

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
            <ListItem key={i} onPress={() => ShowOnMap(item.address)} onLongPress={() => deleteItems(item.id)} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{item.address}</ListItem.Title>
              </ListItem.Content>
              <Text>Show on map</Text>
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