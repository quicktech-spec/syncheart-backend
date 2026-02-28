import React from 'react';
import { View, Text } from 'react-native';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from 'victory-native';

export default function InsightsScreen() {
    const weeklyData = [
        { x: 'Mon', y: 80 },
        { x: 'Tue', y: 85 },
        { x: 'Wed', y: 70 },
        { x: 'Thu', y: 88 },
        { x: 'Fri', y: 92 },
        { x: 'Sat', y: 95 },
        { x: 'Sun', y: 90 },
    ];

    return (
        <View className="flex-1 bg-dark pt-16 px-5">
            <Text className="text-white text-2xl font-bold mb-8">Insights</Text>

            <View className="bg-card p-6 rounded-2xl mb-5">
                <Text className="text-secondary text-base font-bold mb-2">Emotional Graph (Weekly)</Text>
                <View className="items-center -ml-4">
                    <VictoryChart theme={VictoryTheme.material} height={200} padding={{ top: 20, bottom: 40, left: 40, right: 20 }}>
                        <VictoryAxis style={{ tickLabels: { fill: '#8E8E93', fontSize: 10 }, grid: { stroke: 'none' } }} />
                        <VictoryAxis dependentAxis style={{ tickLabels: { fill: '#8E8E93', fontSize: 10 }, grid: { stroke: '#2C2C3E' } }} />
                        <VictoryLine
                            style={{
                                data: { stroke: "#00D68F", strokeWidth: 3 },
                            }}
                            data={weeklyData}
                            animate={{
                                duration: 2000,
                                onLoad: { duration: 1000 }
                            }}
                        />
                    </VictoryChart>
                </View>
            </View>

            <View className="bg-card p-6 rounded-2xl mb-5">
                <Text className="text-secondary text-base font-bold mb-2">Compatibility Trend</Text>
                <Text className="text-white text-3xl font-black mb-1">High</Text>
                <Text className="text-gray-400 text-sm italic">Your communication styles are overlapping perfectly this week.</Text>
            </View>
        </View>
    );
}
