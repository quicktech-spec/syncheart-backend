import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import useSyncStore from '../../store/useSyncStore';

export default function LoginScreen({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const setUser = useSyncStore(state => state.setUser);

    const handleLogin = () => {
        // In a real app, this calls the NestJS backend
        setUser({ id: '1', name: 'Juliana' });
    };

    return (
        <View className="flex-1 bg-dark items-center justify-center px-5 py-10">
            <Text className="text-white text-4xl font-black tracking-widest mb-2 text-center">SynchHeart</Text>
            <Text className="text-gray-400 text-sm mb-12 text-center">Emotional Intelligence OS for Couples</Text>

            <View className="w-full mb-6">
                <Text className="text-gray-300 text-xs font-bold ml-4 mb-2 uppercase tracking-wide">Email</Text>
                <TextInput
                    className="bg-card text-white px-5 py-4 rounded-full w-full border border-gray-800 focus:border-primary"
                    placeholder="your@email.com"
                    placeholderTextColor="#4B4B5C"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
            </View>

            <View className="w-full mb-10">
                <Text className="text-gray-300 text-xs font-bold ml-4 mb-2 uppercase tracking-wide">Password</Text>
                <TextInput
                    className="bg-card text-white px-5 py-4 rounded-full w-full border border-gray-800 focus:border-primary"
                    placeholder="••••••••"
                    placeholderTextColor="#4B4B5C"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <TouchableOpacity
                className="bg-primary w-full py-5 rounded-full items-center shadow-lg elevation-xl"
                onPress={handleLogin}
            >
                <Text className="text-white text-base font-bold tracking-widest">ENTER</Text>
            </TouchableOpacity>
        </View>
    );
}
