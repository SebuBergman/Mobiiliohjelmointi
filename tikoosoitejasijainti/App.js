import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button } from 'react-native';
import MapView, { Marker } from'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null); // State where location is saved
  const [searchLocation, setSearchLocation] = useState('');
  const [mapLatitude, setMapLatitude] = useState(60.200692);
  const [mapLongitude, setMapLongitude] = useState(24.934302);
  const [mapLatitudeDelta, setMapLatitudeDelta] = useState(0.0200);
  const [mapLongitudeDelta, setMapLongitudeDelta] = useState(0.0200);

  const getLocation = () => {
    setMapLatitude(location.coords.latitude);
    setMapLongitude(location.coords.longitude);
    setRegion({...region, latitude: mapLatitude, longitude: mapLongitude, latitudeDelta: mapLatitudeDelta, longitudeDelta: mapLongitudeDelta});
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('No permission to get location')
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const [region, setRegion ] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0200,
    longitudeDelta: 0.0200,
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
          />
        </MapView>
      </View>
      <View style={styles.locationSearch}>
        <Button title="Päivitä sijaintiisi" onPress={getLocation}/>
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
    height: 600,
    width: 400,
  },
});
