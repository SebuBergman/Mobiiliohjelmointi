import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {
  const [randomnum, setRandomNum] = React.useState(Math.floor(Math.random() * 100) + 1);

  const [guess, setGuess] = React.useState(0);
  const [syote, setSyote] = React.useState({ guess: ''});
  const [teksti, setTeksti] = React.useState("Guess a number between 1-100")

  const [counter, setCounter] = React.useState(0)
  
  const makeGuessPressed = () => {
    if (guess == randomnum) {
      Alert.alert('You guessed the number in ' + counter + ' guesses')
      setTeksti("You guessed correct")
    }
    else if (guess < randomnum) {
      setTeksti("Your guess {guess} is too low")
      setCounter(counter + 1)
    }
    else if (guess > randomnum) {
      setTeksti("Your guess {guess} is too high")
      setCounter(counter + 1)
    }
    
  }

  return (
    <View style={styles.container}>
      <Text>{teksti}</Text>
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
