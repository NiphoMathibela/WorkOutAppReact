import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native'

const Login = () => {
    return (
        <SafeAreaView className='flex-1 items-center justify-center bg-white p-6'>
            <View className='w-full shadow-purple-light rounded-2xl p-6'>
                <Text>Email</Text>
                <TextInput placeholder='e.g. your.email@gmail.com' className='w-full h-12 rounded-2xl bg-background mt-2 px-3' />
                <Text>Password</Text>
                <TextInput placeholder='e.g. your.password' className='w-full h-12 rounded-2xl bg-background mt-2 px-3' />
                <TouchableOpacity className='bg-purple-dark w-full p-4 rounded-2xl mb-8 items-center justify-center shadow'>
                    <Text className='text-xl font-semibold text-white'>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Login