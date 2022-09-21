import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';

export default function HistoryScreen({ route, navigation }) {
    const { data } = route.params;

return (
    <SafeAreaView style={styles.container}>
        <View style={styles.history}>
            <Text style={{ fontSize: 20, fontWeight: 'bold'}}>History</Text>
            <FlatList
                data={data}
                renderItem={({ item }) =>
                <Text style={{ fontSize: 15 }}>{item.title}</Text>
                }
            />
        </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    history: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
    },
  });