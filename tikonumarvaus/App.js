import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {
  const [count, setCount] = React.useState(0);

  const [guess, setGuess] = React.useState(0);

  const [syote, setSyote] = React.useState({ guess: ''});

  const makeGuessPressed = () => {
    setCount(parseInt(guess));
  }

  return (
    <View style={styles.container}>
      <Text>Guess a number between 1-100 {count}</Text>
      <TextInput
        style={styles.input}
        onChangeText={guess => setGuess(guess)}
        value={guess}
      />
      <View style={styles.buttons}>
        <Button
          title="Make Guess"
          onPress={makeGuessPressed}
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
