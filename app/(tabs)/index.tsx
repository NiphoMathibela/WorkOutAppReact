import { SafeAreaView, ScrollView, Text, View } from "react-native";
import Banner from '../components/banner';
import ProgressComp from '../components/progress';
import Workout from '../components/workout';
import '../global.css';

// Sample workout data
const workoutData = [
  {
    name: "Upper Body",
    duration: "45:00",
    exercises: [
      { name: "Bench Press", sets: 3, reps: 10, weight: "60kg" },
      { name: "Pull-ups", sets: 3, reps: 8, weight: "Body" },
      { name: "Shoulder Press", sets: 3, reps: 12, weight: "15kg" }
    ]
  },
  {
    name: "Lower Body",
    duration: "40:00",
    exercises: [
      { name: "Squats", sets: 4, reps: 12, weight: "80kg" },
      { name: "Lunges", sets: 3, reps: 10, weight: "20kg" },
      { name: "Leg Press", sets: 3, reps: 15, weight: "120kg" }
    ]
  },
  {
    name: "Lower Body",
    duration: "40:00",
    exercises: [
      { name: "Squats", sets: 4, reps: 12, weight: "80kg" },
      { name: "Lunges", sets: 3, reps: 10, weight: "20kg" },
      { name: "Leg Press", sets: 3, reps: 15, weight: "120kg" }
    ]
  }

];

export default function Index() {
  return (
    <SafeAreaView className='flex-1 items-center p-6 bg-white w-full'>
      <ScrollView className='w-11/12' showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <Banner />
        <View className="w-full">
          <Text className='text-2xl font-bold text-left my-4'>Progress</Text>
        </View>
        <View className='w-full flex flex-row justify-between'>
          <ProgressComp />
          <ProgressComp />
        </View>
        {/* Recent Workouts */}
        <Text className='text-2xl font-bold text-left mt-4'>Recent Workouts</Text>
        {workoutData.map((workout, index) => (
          <Workout
            key={index}
            name={workout.name}
            duration={workout.duration}
            exercises={workout.exercises}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
