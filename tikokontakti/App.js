import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Button } from 'react-native';
import * as Contacts from'expo-contacts';
import * as SMS from'expo-sms';

export default function App() {
  const [contact, setContact] = useState({});

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers] }
        );
      if (data.length > 0) {
        setContact(data[0]);
      }
    }
    console.log(contact);
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.centerResult}>
          <FlatList
              data={contact}
              renderItem={({ item }) =>
                <View>
                  <Text style={styles.title}>{item.name} {item.PhoneNumbers[0].number}</Text>
                </View>
              }
              />
        </View>
        <Button
          title="Get Contacts"
          onPress={getContacts}
        />
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
    width: 100,
  },
  centerResult: {
    alignItems: 'center',
  },
  title: {
    fontSize: 10,
  }
});
