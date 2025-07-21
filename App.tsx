import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "./global.css"
import Entypo from '@expo/vector-icons/Entypo';
import AppNavigator from './src/navigation/AppNavigator';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://98449296b27eb4307ddb68474d6943d1@o4509708302876672.ingest.us.sentry.io/4509708324110336',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function App() {
  return (
    <AppNavigator/>
  );
});