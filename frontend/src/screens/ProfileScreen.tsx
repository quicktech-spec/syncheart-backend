import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
    return (
        <View className="flex-1 bg-dark pt-16 px-5">
            <Text className="text-white text-2xl font-bold mb-8">Profile & DNA</Text>

            <View className="bg-card p-6 rounded-2xl mb-8">
                <Text className="text-primary text-lg font-bold mb-4">Your Emotional DNA Profile</Text>
                <View className="flex-row justify-between mb-3">
                    <Text className="text-gray-400 text-base">Attachment Style:</Text>
                    <Text className="text-white text-base font-semibold">Secure</Text>
                </View>
                <View className="flex-row justify-between mb-3">
                    <Text className="text-gray-400 text-base">Love Language:</Text>
                    <Text className="text-white text-base font-semibold">Physical Touch</Text>
                </View>
            </View>

            <TouchableOpacity className="py-5 border-b border-gray-800">
                <Text className="text-gray-200 text-base">Settings & Subscription</Text>
            </TouchableOpacity>

            <TouchableOpacity className="py-5">
                <Text className="text-gray-200 text-base">Privacy Controls</Text>
            </TouchableOpacity>

        </View>
    );
}
