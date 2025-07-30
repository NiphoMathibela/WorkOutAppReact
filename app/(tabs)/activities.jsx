// Activities.js
import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddSet from '../components/addSet'; // Assuming this is your + button component
import WorkoutSet from '../components/workoutSet'; // Your now swipeable WorkoutSet component
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs, install if you don't have: npm install uuid

const Activities = () => {
    const [open, setOpen] = useState(false);
    const [workouts, setWorkouts] = useState([
        { id: '1', name: 'Upper Body', duration: '45:00' },
        { id: '2', name: 'Lower Body', duration: '30:00' },
        { id: '3', name: 'Cardio', duration: '60:00' },
    ]);

    const AddWorkOutDb = () => {
        setOpen(prev => !prev);
    };

    const handleDeleteWorkout = (idToDelete) => {
        setWorkouts(currentWorkouts =>
            currentWorkouts.filter(workout => workout.id !== idToDelete)
        );
        console.log(`Deleted workout with ID: ${idToDelete}`);
    };

    return (
        <SafeAreaView className='flex-1 items-center p-6 bg-white'>
            <ScrollView className='w-full' showsVerticalScrollIndicator={false}> {/* Added w-full here */}
                <View className="w-full">
                    <Text className='text-2xl font-bold text-left my-4'>Activities</Text>
                </View>

                <Modal visible={open} animationType="slide">
                    <View className='flex-1 justify-center items-center'>
                        <View className='w-4/5 p-4 rounded-md bg-white shadow-lg'>
                            <View>
                                <Text className='text-lg font-bold mb-2'>Workout Name</Text>
                                <TextInput
                                    className='border border-gray-300 p-2 rounded-md mt-2'
                                    placeholder="e.g. Full Body Workout"
                                />
                            </View>
                            <Pressable onPress={AddWorkOutDb} className='mt-4 p-2 bg-blue-500 rounded-md'>
                                <Text className='text-white text-center font-bold'>Close Modal</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

                {/* Render your WorkoutSet components with unique keys and onDelete prop */}
                {workouts.map(workout => (
                    <WorkoutSet
                        key={workout.id} // Essential for lists
                        id={workout.id}
                        name={workout.name}
                        duration={workout.duration}
                        onDelete={handleDeleteWorkout}
                        onEdit={() => ""}
                    />
                ))}

            </ScrollView>

            <Pressable onPress={AddWorkOutDb} className='w-full flex flex-row justify-end absolute bottom-4 right-6'>
                <AddSet />
            </Pressable>
        </SafeAreaView>
    );
};

export default Activities;