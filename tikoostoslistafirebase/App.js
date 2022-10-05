import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';

export default function App() {
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [items, setItems] = useState([]);

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA2SYWkh3Jc1q9Teo7I0qI3PGuYwK1uN4M",
    authDomain: "tikoostoslista.firebaseapp.com",
    databaseURL: "https://tikoostoslista-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tikoostoslista",
    storageBucket: "tikoostoslista.appspot.com",
    messagingSenderId: "787295046059",
    appId: "1:787295046059:web:398b83ef053d4ebb51eaee"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  

  //Use Effect for database connection
  useEffect(() => {
    const itemsRef = ref(database, 'items/');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      const items = data ? Object.keys(data).map(id => ({ id, ...data[id]})) : [];
      setItems(items);
    })
  }, []);

  //Save item to firebase realtime database
  const saveItem = () => {
    push(
      ref(database, 'items/'),
      { 'product': product, 'amount': amount });
  }

  const deleteItem = (item) => {
      console.log(item);
      remove(ref(database, 'items/' + item))
      .then(function() {
        console.log("Remove succeeded.")
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message)
      });
  }

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
          keyExtractor={item => item.id}
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
