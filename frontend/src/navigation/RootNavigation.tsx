import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useSyncStore from '../store/useSyncStore';

// Main Screens
import HomeScreen from '../screens/HomeScreen';
import ConnectScreen from '../screens/ConnectScreen';
import InsightsScreen from '../screens/InsightsScreen';
import GrowthScreen from '../screens/GrowthScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SensualScreen from '../screens/SensualScreen';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import InvitePartnerScreen from '../screens/auth/InvitePartnerScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#1E1E2C',
                    borderTopWidth: 0,
                    elevation: 5,
                },
                tabBarActiveTintColor: '#FF3366',
                tabBarInactiveTintColor: '#8E8E93'
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Connect" component={ConnectScreen} />
            <Tab.Screen name="Insights" component={InsightsScreen} />
            <Tab.Screen name="Growth" component={GrowthScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen
                name="Sensual"
                component={SensualScreen}
                options={{ tabBarButton: () => null }}
            />
        </Tab.Navigator>
    );
}

function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    );
}

export default function RootNavigation() {
    const user = useSyncStore(state => state.user);
    const partner = useSyncStore(state => state.partner);

    return (
        <NavigationContainer>
            {!user ? (
                <AuthStack />
            ) : !partner ? (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="InvitePartner" component={InvitePartnerScreen} />
                </Stack.Navigator>
            ) : (
                <MainTabs />
            )}
        </NavigationContainer>
    );
}
