import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

export default function ConnectScreen({ navigation }: any) {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-dark pt-16 px-5">
            <Text className="text-white text-2xl font-bold mb-8">Connect</Text>

            <View className="bg-card p-6 rounded-2xl mb-5">
                <Text className="text-primary text-lg font-bold mb-2">Daily Deep Question</Text>
                <Text className="text-gray-300 text-base leading-6">"What is a recent dream you remember clearly, and how did it make you feel?"</Text>
            </View>

            <TouchableOpacity
                className="bg-sensual p-6 rounded-2xl mb-5"
                onPress={() => navigation.navigate('Sensual')}
            >
                <Text className="text-white text-xl font-bold">Sensual Mode</Text>
                <Text className="text-purple-200 mt-1">Erotic Dares & Deep Connections</Text>
            </TouchableOpacity>

            <View className="bg-primary p-6 rounded-2xl mb-5">
                <Text className="text-white text-xl font-bold">Express Mode</Text>
                <Text className="text-pink-200 mt-1">Share something private.</Text>
            </View>

            <View className="bg-card p-6 rounded-2xl mb-5">
                <Text className="text-primary text-lg font-bold mb-2">Conflict Repair Tool</Text>
                <Text className="text-gray-300 text-base leading-6">Not feeling heard? Let's break it down together.</Text>
            </View>

        </ScrollView>
    );
}
