import { StyleSheet, Text, View } from 'react-native';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue } from 'firebase/database';

export default function App() {
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

  //ref(database,'items/')

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
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
});
