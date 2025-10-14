import { useContext } from 'react';
import { Image, KeyboardAvoidingView, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from "./contexts/authContext";

const Login = () => {

    //Auth context variables
    const {isLoggedIn, login} = useContext(AuthContext);
    
    return (
        <SafeAreaView className='flex-1 items-center justify-center bg-white p-6'>
            <KeyboardAvoidingView className='w-full' behavior='padding'>
                <View className='items-center mb-8'>
                    <Image source={require("./assets/images/logo2.png")} className='w-80 mb-4 object-contain'/>
                </View>
                <View className='w-full shadow-purple-light rounded-2xl p-6'>
                    <Text className="text-2xl font-bold mb-2">Email</Text>
                    <TextInput placeholder='e.g. your.email@gmail.com' className='w-full h-16 border border-gray-300 focus:border-purple focus:border-2 rounded-2xl bg-background px-3' />
                    <Text className="text-2xl font-bold mt-4 mb-2">Password</Text>
                    <TextInput placeholder='e.g. @#password' className='w-full h-16 border border-gray-300 focus:border-purple focus:border-2 rounded-2xl bg-background px-3' />
                    <TouchableOpacity onPress={() => login()} className='bg-purple-dark w-full my-4 p-4 rounded-2xl mb-8 items-center justify-center shadow'>
                        <Text className='text-xl font-semibold text-white'>Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Login