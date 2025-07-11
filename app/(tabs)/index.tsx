import { SafeAreaView, Text, View } from "react-native";
import '../global.css';
import Banner from '../components/banner';

export default function Index() {
  return (
    <SafeAreaView className='flex-1 items-center p-6'>
      <Banner />
    </SafeAreaView>
  );
}
