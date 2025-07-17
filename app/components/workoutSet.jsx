import { TouchableOpacity, View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const WorkoutSet = ({ name, duration }) => {
    return (
      <TouchableOpacity 
        onPress={() => setModalVisible(true)}
        className='w-full h-24 bg-background rounded-2xl p-6 flex flex-row justify-between items-center my-4'
      >
        <View className="flex-row items-center">
          <View className="w-10 h-10 bg-[#7C4DFF] rounded-full items-center justify-center mr-3">
            <Ionicons name="barbell" size={20} color="white" />
          </View>
          <Text className="text-lg font-semibold">{name || 'Workout'}</Text>
        </View>
        <Text className="text-gray-500">{duration || '20:00'}</Text>
      </TouchableOpacity>
    )
}

export default WorkoutSet