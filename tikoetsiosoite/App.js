import React from "react";
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import MapView, { Marker } from'react-native-maps';
import * as Location from'expo-location';

export default function App() {
  const [location, setLocation] = useState(null); // State where location is saved
  const [searchLocation, setSearchLocation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const getLocation = () => {
    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=GFcrUQ7gujmMbNajsEZdqAyVecm8LL9v&location=Madetie+10,ESPOO,02170,FINLAND`)
    .then(res => res.json())
    .then(data => {
      setLatitude(data);
      setLongitude(data);
      var parsedData = JSON.parse(data);
      //console.log(data);
      console.log(parsedData);
    })
    .catch(err => console.error(err));
    }

  useEffect(() => {
    getLocation();
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <MapView
          style={styles.mapstyle}
          initialRegion={{
            latitude: 60.16653,
            longitude: 24.77807,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0221,
          }} >
          <Marker
            coordinate={{
              latitude:60.16653,
              longitude:24.77807}}
              title='Haaga-Helia'
          />
        </MapView>
      </View>
      <View style={styles.locationSearch}>
        <TextInput
          style={{fontSize: 18, width: 120, borderBottomWidth: 1.0, marginBottom: 5}}
          placeholder='Syötä osoite'
          onChangeText={text => setSearchLocation(text) }
        />
        <Button title="Show" onPress= {getLocation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 6,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationSearch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapstyle: {
    minHeight: 50,
    minWidth: 50,
    height: 600,
    width: 360,
  },
});
