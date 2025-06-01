import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "./global.css"
import Entypo from '@expo/vector-icons/Entypo';

export default function App() {
  return (
    <View style={styles.container}>
      <Text className='bg-red-800'>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Entypo name="home" size={24} color="#000" />
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
