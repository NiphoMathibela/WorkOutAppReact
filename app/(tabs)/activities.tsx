import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AddSet from '../components/addSet'
import WorkoutSet from '../components/workoutSet'

const Activities = () => {
  return (
    <SafeAreaView className='flex-1 items-center p-6 bg-white'>
      <ScrollView className='' showsVerticalScrollIndicator={false}>

        <View className="w-full">
          <Text className='text-2xl font-bold text-left my-4'>Activities</Text>
        </View>

        <WorkoutSet name="Upper Body" duration="45:00" />
      </ScrollView>

      <View className='w-full flex flex-row justify-end absolute bottom-4'>
        <AddSet />
       </View>
    </SafeAreaView>
  )
}

export default Activities