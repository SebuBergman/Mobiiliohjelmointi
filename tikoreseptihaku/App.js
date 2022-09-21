import React from 'react';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, FlatList, Image, TextInput, Button } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [allRecipes, setAllRecipes] = useState('');

  const getRecipes = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(res => res.json())
    .then(data => {
      setAllRecipes(data.meals);
    })
    .catch(err => console.error(err));
    }

  useEffect(() => {
    getRecipes();
    console.log(allRecipes);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>Recipes:</Text>
        <FlatList
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) =>
              <View>
                <Text style={styles.title}>{item.strMeal}</Text>
                <Image style={styles.tinyImage} source={{uri: item.strMealThumb,}} />
              </View>
            }
            data={allRecipes} />
        </View>
      <View style={styles.searchbar}>
      <TextInput
        style={{fontSize: 18, width: 200, borderBottomWidth: 1.0, marginBottom: 5}}
        placeholder='keyword'
        onChangeText={text => setKeyword(text) } />
      <Button title="Find" onPress= {getRecipes} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 5,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 15,
  },
  tinyImage: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  searchbar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
