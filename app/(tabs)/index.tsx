import { SafeAreaView, Text, View, ScrollView } from "react-native";
import '../global.css';
import Banner from '../components/banner';
import ProgressComp from '../components/progress';

export default function Index() {
  return (
    <SafeAreaView className='flex-1 items-center p-6 bg-white'>
      {/* Banner */}
      <Banner />
      {/* Progress */}
      <View className="w-11/12">
        <Text className='text-2xl font-bold text-left my-4'>Progress</Text>
      </View>
      <View className='w-11/12 flex flex-row justify-between'>
        <ProgressComp />
        <ProgressComp />
      </View>
    </SafeAreaView>
  );
}
