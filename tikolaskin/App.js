import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {
  const [count, setCount] = React.useState(0);

  const [number1, setNumber1] = React.useState(0);
  const [number2, setNumber2] = React.useState(0);

  const [syote, setSyote] = React.useState({ number1: '', number2: '' });

  const buttonPressedPlus = () => {
    setCount(parseInt(number1) + parseInt(number2));
  }

  const buttonPressedMinus = () => {
    setCount(parseInt(number1) - parseInt(number2));
  }

  return (
    <View style={styles.container}>
      <Text>Results: {count}</Text>
      <TextInput
        style={styles.input}
        onChangeText={number1 => setNumber1(number1)}
        value={number1}
      />
      <TextInput
        style={styles.input}
        onChangeText={number2 => setNumber2(number2)}
        value={number2}
      />
      <View style={styles.buttons}>
      <Button
        title="+"
        onPress={buttonPressedPlus}
      />
      <Button
        title="-"
        onPress={buttonPressedMinus}
      />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 100,
    margin: 10,
    borderWidth: 1,
    padding: 10,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
