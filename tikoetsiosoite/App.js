import React from "react";
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import MapView, { Marker } from'react-native-maps';

export default function App() {
  const [location, setLocation] = useState(null); // State where location is saved
  const [searchLocation, setSearchLocation] = useState('');
  const [mapLatitude, setMapLatitude] = useState(60.200692);
  const [mapLongitude, setMapLongitude] = useState(24.934302);

  const getLocation = () => {
    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=GFcrUQ7gujmMbNajsEZdqAyVecm8LL9v&location=${searchLocation},FINLAND`)
    .then(res => res.json())
    .then(data => {
      setMapLatitude(data.results[0].locations[0].latLng.lat);
      setMapLongitude(data.results[0].locations[0].latLng.lng);
      //setRegion({latitude: data.results[0].locations[0].latLng.lng, longitude: data.results[0].locations[0].latLng.lat});
      //console.log(data.results[0].locations[0].latLng.lat);
      //console.log(data.results[0].locations[0].latLng.lng);
      console.log(`http://www.mapquestapi.com/geocoding/v1/address?key=GFcrUQ7gujmMbNajsEZdqAyVecm8LL9v&location=${searchLocation},FINLAND`)
    })
    .catch(err => console.error(err));
    }

  useEffect(() => {
    getLocation();
  }, []);

  const [region, setRegion ] = useState({
    latitude: mapLatitude,
    longitude: mapLongitude,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });

  function onRegionChange() {
    setRegion({latitude: mapLatitude, longitude: mapLongitude});
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <MapView
          style={styles.mapstyle}
          region={region}
          onChange={onRegionChange} >
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
