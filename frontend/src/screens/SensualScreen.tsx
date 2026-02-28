import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

export default function SensualScreen() {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-card items-center pt-16 px-5 pb-10">
            <Text className="text-white text-2xl font-bold mb-10 tracking-widest">Sensual Mode</Text>

            <View className="flex-row mb-10">
                <View className="w-16 h-16 rounded-xl bg-gray-800 justify-center items-center mx-2 border-2 border-transparent">
                    <Text className="text-gray-400 text-2xl">♀</Text>
                </View>
                <View className="w-16 h-16 rounded-xl bg-white justify-center items-center mx-2 border-2 border-white">
                    <Text className="text-black text-2xl">♂</Text>
                </View>
            </View>

            <View className="w-full mb-8">
                <View className="flex-row justify-between bg-gray-800 px-5 py-4 rounded-xl mb-4">
                    <Text className="text-white text-base">Juliana</Text>
                    <Text className="text-gray-400 text-lg">♀</Text>
                </View>
                <View className="flex-row justify-between bg-gray-800 px-5 py-4 rounded-xl mb-4 opacity-75">
                    <Text className="text-white text-base">Matthias</Text>
                    <Text className="text-gray-400 text-lg">♂</Text>
                </View>
            </View>

            <TouchableOpacity className="bg-primary py-5 px-16 rounded-full mb-16 shadow-lg elevation-xl">
                <Text className="text-white text-lg font-bold tracking-widest">START</Text>
            </TouchableOpacity>

            <View className="flex-row justify-center w-full">
                <View className="w-32 h-40 rounded-3xl p-5 items-center justify-center bg-blue-500 shadow-md -mr-5">
                    <Text className="text-white text-base font-semibold mb-2">Matthias</Text>
                    <Text className="text-5xl">🐰</Text>
                </View>
                <View className="w-32 h-40 rounded-3xl p-5 items-center justify-center bg-sensual shadow-md mt-10 z-10">
                    <Text className="text-white text-base font-semibold mb-2">Juliana</Text>
                    <Text className="text-5xl">🐇</Text>
                </View>
            </View>
        </ScrollView>
    );
}
