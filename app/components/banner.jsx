import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const Banner = () => {
  return (
    <View className='bg-purple w-11/12 h-72 rounded-2xl p-10 flex flex-row justify-center items-center'>
        <View className='w-2/3'>
            <Text className='text-3xl font-bold text-white'>Hi, User!</Text>
            <Text className='text-3xl font-bold text-white'>Lets get to work</Text>
            <TouchableOpacity className='bg-white p-2 rounded-2xl mt-4 w-40 h-12 flex items-center justify-center'>
                <Text className='text-purple'>Get Started</Text>
            </TouchableOpacity>
        </View>
        <View className=''>
            <Image source={require('../assets/images/ExerciseDude.png')} className='w-36 h-48'/>
        </View>
    </View>
  )
}

export default Banner