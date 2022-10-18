import React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button } from'react-native-elements';
import MapView, { Marker } from'react-native-maps';

export default function MapScreen({ route, navigation }) {
  const { mapAddress } = route.params;
  const [address, setAddress] = useState('');

  const [mapLatitude, setMapLatitude] = useState(60.200692);
  const [mapLongitude, setMapLongitude] = useState(24.934302);
  const [mapLatitudeDelta, setMapLatitudeDelta] = useState(0.0200);
  const [mapLongitudeDelta, setMapLongitudeDelta] = useState(0.0220);

  useEffect(() => {
    const unsubscribe = navigation.addListener('transitionStart', (e) => {
      setAddress('');
      e.preventDefault();
    });
  
    return unsubscribe;
  }, [navigation]);

  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0200,
    longitudeDelta: 0.0220,
  });

  const getLocation = () => {
    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=GFcrUQ7gujmMbNajsEZdqAyVecm8LL9v&location=${address},FINLAND`)
      .then(res => res.json())
      .then(data => {
        setMapLatitude(data.results[0].locations[0].latLng.lat);
        setMapLongitude(data.results[0].locations[0].latLng.lng);
        console.log(`http://www.mapquestapi.com/geocoding/v1/address?key=GFcrUQ7gujmMbNajsEZdqAyVecm8LL9v&location=${address},FINLAND`);
      })
      .catch(err => console.error(err));
  }

  const onLocationChange = () => {
    console.log(mapAddress);
    setAddress(mapAddress);
    console.log(address);
    getLocation();
    setRegion({
      latitude: mapLatitude,
      longitude: mapLongitude,
      latitudeDelta: mapLatitudeDelta,
      longitudeDelta: mapLongitudeDelta
    });
  }

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
          />
        </MapView>
      </View>
      <View style={styles.locationShow}>
        <Button title="Show" onPress={onLocationChange} />
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
    locationShow: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapstyle: {
      minHeight: 50,
      minWidth: 50,
      height: 300,
      width: 200,
    },
  });