import React from "react";
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import MapView, { Marker } from'react-native-maps';


export default function App() {

  const getLocation = () => {
    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=GFcrUQ7gujmMbNajsEZdqAyVecm8LL9v&location=Ratapihantie13,Helsinki,FINLAND`)
    .then(res => res.json())
    .then(data => {
    })
    .catch(err => console.error(err));
    }

  useEffect(() => {
    getLocation();
  }, []);

  const [region, setRegion ] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <MapView
          style={styles.mapstyle}
          region={region} >
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude}}
              title='Testi'
          />
        </MapView>
      </View>
      <View style={styles.locationSearch}>
        <TextInput
          style={{fontSize: 18, width: 180, borderBottomWidth: 1.0, marginBottom: 5}}
          placeholder='Syötä osoite, kaupunki'
          onChangeText={text => setSearchLocation(text) }
        />
        <Button title="Show" onPress={getLocation} />
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
