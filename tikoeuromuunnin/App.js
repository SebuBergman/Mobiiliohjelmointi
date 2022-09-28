import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';

export default function App() {
  const [exhangeTo, setExhangeTo] = useState('');
  const [exhangeFrom, setExhangeFrom] = useState('GBP');
  const [exhangeAmount, setExhangeAmount] = useState('');
  const [exchange, setExchange] = useState('');
  const pickerRef = useRef();

  var myHeaders = new Headers();
  myHeaders.append("apikey", "zWfBTubnPyFpshaM9LqIoLwJdl3s0J50");

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  const getExchange = () => {
    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=${exhangeFrom}&amount=${exhangeAmount}`, requestOptions)
      .then(res => res.text())
      .then(data => {
        setExchange(data);
        var parsedData = JSON.parse(data);
        setExhangeTo(parsedData.result.toFixed(2) + " €")
      })
      .catch(err => console.error(err));
    }

  useEffect(() => {
    getExchange();
  }, []);

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }
//
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
        style={styles.tinyImage}
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Euro_banknotes%2C_Europa_series.png/800px-Euro_banknotes%2C_Europa_series.png',
        }}
        />
        <Text style={styles.heading}>Exchange: {exhangeTo}</Text>
      </View>
      <View style={styles.exchangebar}>
        <TextInput
          style={{fontSize: 18, width: 80, borderBottomWidth: 1.0, marginBottom: 5}}
          placeholder='amount'
          onChangeText={text => setExhangeAmount(text) }
        />
        <Picker
          style={styles.picker}
          ref={pickerRef}
          selectedValue={exhangeFrom}
          onValueChange={(itemValue, itemIndex) =>
            setExhangeFrom(itemValue)
          }>
          <Picker.Item label="GBP" value="GBP" />
          <Picker.Item label="USD" value="USD" />
          <Picker.Item label="AUD" value="AUD" />
          <Picker.Item label="CAD" value="CAD" />
          <Picker.Item label="JPY" value="JPY" />
        </Picker>
        <Button title="Convert" onPress= {getExchange} />
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
  exchangebar: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: 100,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tinyImage: {
    marginTop: 20,
    width: 150,
    height: 150,
  },
});
