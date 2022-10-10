import React, { useState } from 'react';
import { StyleSheet, Button, SafeAreaView, TextInput } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
  const [thingToSay, setThingToSay] = useState('');

  const speak = () => {
    Speech.speak(thingToSay);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={thingToSay => setThingToSay(thingToSay)} value={thingToSay}
      />
      <Button title="Press to hear some words" onPress={speak} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  input: {
    marginBottom: 5,
    borderColor: 'gray',
    borderBottomWidth: 1.0,
    height: 40,
    width: 340,
  },
});