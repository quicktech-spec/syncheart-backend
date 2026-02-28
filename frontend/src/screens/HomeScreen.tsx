import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import useSyncStore from '../store/useSyncStore';

export default function HomeScreen() {
    const syncScore = useSyncStore((state) => state.dailySyncScore);
    const streak = useSyncStore((state) => state.streak);

    return (
        <View className="flex-1 bg-dark items-center pt-16 px-5">
            <Text className="text-white text-2xl font-bold mb-10">SynchHeart</Text>

            <View className="bg-card p-8 rounded-2xl items-center mb-5 shadow-lg elevation-md w-full">
                <Text className="text-gray-400 text-base mb-2">Current Sync</Text>
                <Text className="text-secondary text-5xl font-black">{syncScore}%</Text>
            </View>

            <View className="mb-10">
                <Text className="text-yellow-500 text-base font-semibold">🔥 {streak} Day Streak</Text>
            </View>

            <TouchableOpacity className="bg-primary w-full py-4 rounded-full items-center mb-4">
                <Text className="text-white text-base font-bold tracking-widest">TODAY'S MOOD SYNC</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-transparent w-full py-4 rounded-full items-center border border-primary">
                <Text className="text-primary text-base font-semibold">Quick Prompt</Text>
            </TouchableOpacity>
        </View>
    );
}
