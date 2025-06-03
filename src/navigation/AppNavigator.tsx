import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FavScreen from '../screens/FavScreen';
import ProductScreen from '../screens/ProductScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Entypo from '@expo/vector-icons/Entypo';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const TAB_BAR_HEIGHT = Math.round(SCREEN_HEIGHT * 0.065);
const TAB_BAR_RADIUS = Math.round(TAB_BAR_HEIGHT / 2);


function HomeTabs() {

    const insets = useSafeAreaInsets()

    return (
        <SafeAreaView style={styles.safeArea}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarShowLabel: false,

                    tabBarStyle: [
                        styles.tabBar,
                        {
                            bottom: insets.bottom + 2
                        }
                    ],
                    tabBarItemStyle: styles.tabBarItem,
                    tabBarIcon: ({ focused }) => renderTabIcon(route.name, focused)
                })}
            >
                <Tab.Screen name="home" component={HomeScreen} />
                <Tab.Screen name="fav" component={FavScreen} />
                <Tab.Screen name="product" component={ProductScreen} />

            </Tab.Navigator>

        </SafeAreaView>

    )
}

const renderTabIcon = (routeName, focused) => {
    let iconName;
    if (routeName === 'home') {
        iconName = 'home';
    } else if (routeName === "fav") {
        iconName = 'heart';
    } else if (routeName === "product") {
        iconName = 'shopping-cart'
    }

    const containerClass = `
        w-12
        h-12
        rounded-full
        items-center
        justify-center
        ${focused ? 'bg-gray-200' : ''}
    `

    return (
        <View className={containerClass.trim()}>
            <Entypo name={iconName} size={24} color={focused ? '#d4a574' : '#fff'} />
        </View>
    )

}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    contentStyle: { backgroundColor: "#000" }
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={HomeTabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Product"
                    component={ProductScreen}
                    options={{ headerShown: false }}

                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    tabBar: {
        position: "absolute",
        backgroundColor: '#d4a574',
        marginRight:SCREEN_WIDTH  * 0.05,
        marginLeft:SCREEN_WIDTH  * 0.05,
        height:TAB_BAR_HEIGHT,
        width:SCREEN_WIDTH * 0.9,
        borderRadius:TAB_BAR_RADIUS,
        shadowColor:  '#000',
        shadowOffset:{width :0 , height: 5},
        shadowOpacity:0.1,
        shadowRadius:5,
        elevation:5


    },
    tabBarItem: {
        marginTop: 8
    }
})