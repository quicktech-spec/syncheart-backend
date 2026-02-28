import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import useSyncStore from '../../store/useSyncStore';

export default function InvitePartnerScreen({ navigation }: any) {
    const [inviteCode, setInviteCode] = useState('');
    const setPartner = useSyncStore(state => state.setPartner);

    const handleConnect = () => {
        // Mocking pairing
        setPartner({ id: '2', name: 'Partner' });
    };

    return (
        <View className="flex-1 bg-dark items-center justify-center px-5 py-10">
            <Text className="text-white text-2xl font-bold mb-4 text-center">Pair Your Hearts</Text>
            <Text className="text-gray-400 text-sm mb-12 text-center px-4 leading-6">
                SynchHeart works best when both partners are connected. Share your code or enter your partner's code to sync.
            </Text>

            <View className="bg-card p-8 rounded-3xl w-full items-center mb-10">
                <Text className="text-gray-400 text-sm mb-4">Your Pairing Code</Text>
                <Text className="text-primary text-4xl font-black tracking-[0.2em] mb-4">XP7B-9Q</Text>
                <TouchableOpacity className="bg-gray-800 py-3 px-6 rounded-full">
                    <Text className="text-white text-sm font-semibold">Share Code</Text>
                </TouchableOpacity>
            </View>

            <View className="w-full mb-8">
                <TextInput
                    className="bg-card text-white px-5 py-4 rounded-full w-full border border-gray-800 text-center text-lg tracking-widest"
                    placeholder="Enter Partner's Code"
                    placeholderTextColor="#4B4B5C"
                    value={inviteCode}
                    onChangeText={setInviteCode}
                    autoCapitalize="characters"
                />
            </View>

            <TouchableOpacity
                className="bg-white w-full py-5 rounded-full items-center mb-4"
                onPress={handleConnect}
            >
                <Text className="text-dark text-base font-bold tracking-widest">CONNECT</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleConnect()}>
                <Text className="text-gray-500 mt-4 underline">Skip for now</Text>
            </TouchableOpacity>
        </View>
    );
}
