import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const AddSet = () => {
  return (
    <TouchableOpacity className='w-16 h-16 bg-purple-dark rounded-full items-center justify-center animate-bounce'>
      <Text className='text-white text-3xl font-semibold'>+</Text>
    </TouchableOpacity>
  )
}

export default AddSet