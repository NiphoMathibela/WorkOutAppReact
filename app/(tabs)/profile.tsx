import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  return (
    <SafeAreaView className='flex-1 items-center bg-white w-full min-h-full'>
      <ScrollView className='w-11/12' showsVerticalScrollIndicator={false}>
        <View className='text-2xl font-bold text-center text-purple mx-auto'>
          <Ionicons name='person-circle-outline' size={80} color='#6430E8' />
        </View>
        <View className='w-full mt-8'>
          <Text className='text-xl font-semibold text-text mb-2'>Age</Text>
          <TextInput className='border-gray-300 border h-16 bg-background rounded-2xl px-4 focus:border-purple focus:outline-none' placeholder='Age' placeholderTextColor="#9ca3af" />
        </View>
        <View className='w-full mt-5'>
          <Text className='text-xl font-semibold text-text mb-2'>Weight</Text>
          <TextInput className='border-gray-300 border h-16 bg-background rounded-2xl px-4 focus:border-purple focus:outline-none' placeholder='Weight' placeholderTextColor="#9ca3af" />
        </View>
        <View className='w-full mt-5'>
          <Text className='text-xl font-semibold text-text mb-2'>Height</Text>
          <TextInput className='border-gray-300 border h-16 bg-background rounded-2xl px-4 focus:border-purple focus:outline-none' placeholder='Height' placeholderTextColor="#9ca3af" />
        </View>
        <View className='w-full mt-5'>
          <Text className='text-xl font-semibold text-text mb-2'>Goal: No. of workouts per week</Text>
          <TextInput className='border-gray-300 border h-16 bg-background rounded-2xl px-4 focus:border-purple focus:outline-none' placeholder='No. Of Workouts Per Week' placeholderTextColor="#9ca3af" />
        </View>
        <View className='w-full mt-5'>
          <Text className='text-xl font-semibold text-text mb-2'>Goal: Height</Text>
          <TextInput className='border-gray-300 border h-16 bg-background rounded-2xl px-4 focus:border-purple focus:outline-none' placeholder='No. Of Workouts Per Week' placeholderTextColor="#9ca3af" />
        </View>
        <TouchableOpacity className='bg-purple w-full p-4 rounded-2xl mt-5 justify-center items-center'>
          <Text className='text-xl font-semibold text-white mb-2'>Update</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile