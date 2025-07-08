import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import LiveStreaming from '../screens/LiveStreaming';
import HomePage from '../screens/HomePage';

const Stack = createNativeStackNavigator<{
    SplashScreen: undefined;
    HomeScreen: undefined;
    LiveStreaming: undefined;
    HomePage: undefined;
}>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomePage" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="LiveStreaming" component={LiveStreaming} />
                <Stack.Screen name="HomePage" component={HomePage} />

            </Stack.Navigator>

        </NavigationContainer>

    );
}