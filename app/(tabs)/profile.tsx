import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, View, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  return (
    <SafeAreaView className='flex-1 items-center bg-white p-6'>
      <View className='text-2xl font-bold text-center text-purple'>
        <Ionicons name='person-circle-outline' size={100} color='#6430E8'/>
      </View>
      <View className='w-full mt-8'>
        <Text className='text-xl font-semibold text-text mb-2'>Age</Text>
        <TextInput className='border-gray-300 border h-16 bg-background rounded-xl px-4' placeholder='Age' placeholderTextColor="#9ca3af" />
      </View>
      <View className='w-full mt-8'>
        <Text className='text-xl font-semibold text-text mb-2'>Weight</Text>
        <TextInput className='border-gray-300 border h-16 bg-background rounded-xl px-4' placeholder='Weight' placeholderTextColor="#9ca3af" />
      </View>
      <View className='w-full mt-8'>
        <Text className='text-xl font-semibold text-text mb-2'>Height</Text>
        <TextInput className='border-gray-300 border h-16 bg-background rounded-xl px-4' placeholder='Height' placeholderTextColor="#9ca3af" />
      </View>
      <View className='w-full mt-8'>
        <Text className='text-xl font-semibold text-text mb-2'>Goal: No. of workouts per week</Text>
        <TextInput className='border-gray-300 border h-16 bg-background rounded-xl px-4' placeholder='No. Of Workouts Per Week' placeholderTextColor="#9ca3af" />
      </View>
      <View className='w-full mt-8'>
        <Text className='text-xl font-semibold text-text mb-2'>Goal: Height</Text>
        <TextInput className='border-gray-300 border h-16 bg-background rounded-xl px-4' placeholder='No. Of Workouts Per Week' placeholderTextColor="#9ca3af" />
      </View>
    </SafeAreaView>
  )
}

export default Profile