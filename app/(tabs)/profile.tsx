import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('') // kg
  const [height, setHeight] = useState('') // cm
  const [workoutsPerWeek, setWorkoutsPerWeek] = useState('')
  const [goalWeight, setGoalWeight] = useState('')

  const validateAndSave = () => {
    const num = (v: string) => (v.trim() === '' ? NaN : Number(v))
    const ageNum = num(age)
    const weightNum = num(weight)
    const heightNum = num(height)
    const workoutsNum = num(workoutsPerWeek)
    const goalWeightNum = num(goalWeight)

    if (isNaN(ageNum) || ageNum <= 0) return Alert.alert('Invalid age', 'Please enter a valid age.')
    if (isNaN(weightNum) || weightNum <= 0) return Alert.alert('Invalid weight', 'Please enter your weight in kg.')
    if (isNaN(heightNum) || heightNum <= 0) return Alert.alert('Invalid height', 'Please enter your height in cm.')
    if (isNaN(workoutsNum) || workoutsNum < 0) return Alert.alert('Invalid goal', 'Workouts per week must be 0 or more.')
    if (isNaN(goalWeightNum) || goalWeightNum <= 0) return Alert.alert('Invalid goal weight', 'Please enter a valid goal weight in kg.')

    // TODO: Persist profile info to backend or secure storage
    Alert.alert('Profile updated', 'Your profile has been saved successfully.')
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className='flex-1'>
        <ScrollView className='w-full px-6' showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
          {/* Header */}
        <TouchableOpacity onPress={() => Link('/components/login')}>
        <View className='flex-row w-full mt-2'>
            <View className='w-14 h-14 left-0 rounded-full bg-purple/10 items-center justify-center shadow-sm'>
              <Ionicons name='person-circle-outline' size={44} color='#7C4DFF' />
            </View>
          </View>
        </TouchableOpacity>

          <View className='items-center mb-6'>
            <Text className='mt-3 text-2xl font-bold text-text'>Your Profile</Text>
            <Text className='mt-1 text-purple/70'>Keep your metrics up to date for better insights</Text>
          </View>

          {/* Metrics card */}
          <View className='w-full bg-white rounded-2xl border border-gray-200 p-4 mb-6 shadow'>
            {/* Age */}
            <View className='mb-4'>
              <Text className='text-base font-semibold text-black mb-2'>Age</Text>
              <View className='flex-row items-center border border-gray-300 rounded-2xl px-3 h-14 bg-background'>
                <Ionicons name='hourglass-outline' size={20} color='#7C4DFF' />
                <TextInput
                  className='flex-1 ml-2 h-full text-base'
                  placeholder='e.g. 28'
                  placeholderTextColor={'#9ca3af'}
                  keyboardType='number-pad'
                  value={age}
                  onChangeText={setAge}
                  returnKeyType='done'
                />
              </View>
            </View>

            {/* Weight */}
            <View className='mb-4'>
              <Text className='text-base font-semibold text-black mb-2'>Weight (kg)</Text>
              <View className='flex-row items-center border border-gray-300 rounded-2xl px-3 h-14 bg-background'>
                <Ionicons name='fitness-outline' size={20} color='#7C4DFF' />
                <TextInput
                  className='flex-1 ml-2 h-full text-base'
                  placeholder='e.g. 72'
                  placeholderTextColor={'#9ca3af'}
                  keyboardType='decimal-pad'
                  value={weight}
                  onChangeText={setWeight}
                  returnKeyType='done'
                />
                <Text className='ml-2 text-gray-400'>kg</Text>
              </View>
            </View>

            {/* Height */}
            <View className='mb-2'>
              <Text className='text-base font-semibold text-black mb-2'>Height (cm)</Text>
              <View className='flex-row items-center border border-gray-300 rounded-2xl px-3 h-14 bg-background'>
                <Ionicons name='expand-outline' size={20} color='#7C4DFF' />
                <TextInput
                  className='flex-1 ml-2 h-full text-base'
                  placeholder='e.g. 175'
                  placeholderTextColor={'#9ca3af'}
                  keyboardType='number-pad'
                  value={height}
                  onChangeText={setHeight}
                  returnKeyType='done'
                />
                <Text className='ml-2 text-gray-400'>cm</Text>
              </View>
            </View>
          </View>

          {/* Goals card */}
          <View className='w-full bg-white rounded-2xl border border-gray-200 p-4 mb-6 shadow'>
            <Text className='text-lg font-semibold text-text mb-3'>Goals</Text>
            <View className='mb-4'>
              <Text className='text-base font-semibold text-black mb-2'>Workouts per week</Text>
              <View className='flex-row items-center border border-gray-300 rounded-2xl px-3 h-14 bg-background'>
                <Ionicons name='calendar-outline' size={20} color='#7C4DFF' />
                <TextInput
                  className='flex-1 ml-2 h-full text-base'
                  placeholder='e.g. 4'
                  placeholderTextColor={'#9ca3af'}
                  keyboardType='number-pad'
                  value={workoutsPerWeek}
                  onChangeText={setWorkoutsPerWeek}
                  returnKeyType='done'
                />
                <Text className='ml-2 text-gray-400'>/week</Text>
              </View>
            </View>
            <View>
              <Text className='text-base font-semibold text-black mb-2'>Goal weight (kg)</Text>
              <View className='flex-row items-center border border-gray-300 rounded-2xl px-3 h-14 bg-background'>
                <Ionicons name='trending-down-outline' size={20} color='#7C4DFF' />
                <TextInput
                  className='flex-1 ml-2 h-full text-base'
                  placeholder='e.g. 68'
                  placeholderTextColor={'#9ca3af'}
                  keyboardType='decimal-pad'
                  value={goalWeight}
                  onChangeText={setGoalWeight}
                  returnKeyType='done'
                />
                <Text className='ml-2 text-gray-400'>kg</Text>
              </View>
            </View>
          </View>

          {/* Save button */}
          <TouchableOpacity onPress={validateAndSave} className='bg-purple-dark w-full p-4 rounded-2xl mb-8 items-center justify-center shadow'>
            <Text className='text-xl font-semibold text-white'>Update Profile</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Profile