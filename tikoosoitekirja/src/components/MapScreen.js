import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, Alert } from 'react-native';
import { Input, Button, ListItem, Icon, Text } from'react-native-elements';
import MapView, { Marker } from'react-native-maps';
import * as Location from 'expo-location';

export default function AddressScreen() {
    const [address, setAddress] = useState('');
    const [mapLatitude, setMapLatitude] = useState(60.200692);
    const [mapLongitude, setMapLongitude] = useState(24.934302);
    const [mapLatitudeDelta, setMapLatitudeDelta] = useState(0.0200);
    const [mapLongitudeDelta, setMapLongitudeDelta] = useState(0.0220);
  
    const getLocation = () => {
      fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=GFcrUQ7gujmMbNajsEZdqAyVecm8LL9v&location=${searchLocation},FINLAND`)
      .then(res => res.json())
      .then(data => {
        setMapLatitude(data.results[0].locations[0].latLng.lat);
        setMapLongitude(data.results[0].locations[0].latLng.lng);
        //setRegion({latitude: data.results[0].locations[0].latLng.lng, longitude: data.results[0].locations[0].latLng.lat});
        //console.log(data.results[0].locations[0].latLng.lat);
        //console.log(data.results[0].locations[0].latLng.lng);
        console.log(`http://www.mapquestapi.com/geocoding/v1/address?key=GFcrUQ7gujmMbNajsEZdqAyVecm8LL9v&location=${searchLocation},FINLAND`);
      })
      .catch(err => console.error(err));
    }
  
    useEffect(() => {
      getLocation();
      setLocation({latitude: mapLatitude, longitude: mapLongitude, latitudeDelta: mapLatitudeDelta, longitudeDelta: mapLongitudeDelta});
    }, []);
  
    const [location, setLocation ] = useState({
      latitude: 60.200692,
      longitude: 24.934302,
      latitudeDelta: 0.0200,
      longitudeDelta: 0.0220,
    });
  
    const onLocationChange = () => {
        setLocation({latitude: mapLatitude, longitude: mapLongitude, latitudeDelta: mapLatitudeDelta, longitudeDelta: mapLongitudeDelta});
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
          <View style={styles.locationSearch}>
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