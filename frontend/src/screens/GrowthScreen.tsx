import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

export default function GrowthScreen() {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-dark pt-16 px-5">
            <Text className="text-white text-2xl font-bold mb-8">Growth Programs</Text>

            <TouchableOpacity className="bg-indigo-600 p-6 rounded-2xl mb-5">
                <Text className="text-white text-lg font-bold mb-2">7-Day Reconnect</Text>
                <Text className="text-gray-200 text-sm">Day 3 • In Progress</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-card p-6 rounded-2xl mb-5 opacity-70">
                <Text className="text-gray-400 text-lg font-bold mb-2">30-Day Trust Builder</Text>
                <Text className="text-gray-400 text-sm">🔒 Locked</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-card p-6 rounded-2xl mb-5 opacity-70">
                <Text className="text-gray-400 text-lg font-bold mb-2">Conflict Reset Plan</Text>
                <Text className="text-gray-400 text-sm">🔒 Locked</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}
