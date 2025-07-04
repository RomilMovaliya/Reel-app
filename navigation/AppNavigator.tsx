import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator<{
    SplashScreen: undefined;
    HomeScreen: undefined;
}>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
            </Stack.Navigator>

        </NavigationContainer>

    );
}