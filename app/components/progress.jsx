import React from 'react';
import { Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const ProgressComp = () => {
  return (
    <View className="w-48 h-48 md:w-1/2 md:h-64 lg:w-3/4 lg:h-72 bg-background rounded-2xl p-4 items-center justify-center">
        <View className="items-center justify-center">
            <AnimatedCircularProgress
                size={100}
                width={15}
                fill={75}
                rotation={0}
                tintColor="#7C4DFF"
                backgroundColor="#F3F6FB"
                duration={1500}
                lineCap="round"
            >
                {(fill) => (
                    <Text className="text-lg font-bold">3/5</Text>
                )}
            </AnimatedCircularProgress>

            <Text className="mt-2 text-center">Workouts Completed</Text>
        </View>
    </View>
  )
}

export default ProgressComp;