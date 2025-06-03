import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "./global.css"
import Entypo from '@expo/vector-icons/Entypo';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <AppNavigator/>
  );
}

