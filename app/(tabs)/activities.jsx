// Activities.js
import { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import 'react-native-get-random-values'; // Must be imported before uuid
import { SafeAreaView } from 'react-native-safe-area-context';
import { v4 as uuidv4 } from 'uuid';
import WorkoutSet from '../components/workoutSet';

const Activities = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [newWorkoutName, setNewWorkoutName] = useState('');
    const [workouts, setWorkouts] = useState([
        { id: '1', name: 'Upper Body', duration: '45:00' },
        { id: '2', name: 'Lower Body', duration: '30:00' },
        { id: '3', name: 'Cardio', duration: '60:00' },
    ]);

    const toggleModal = () => {
        setModalVisible(prev => !prev);
        if (isModalVisible) { // If modal is closing, clear the input
            setNewWorkoutName('');
        }
    };

    const handleAddWorkout = () => {
        if (newWorkoutName.trim() === '') {
            return; // Or show an alert
        }
        const newWorkout = { id: uuidv4(), name: newWorkoutName, duration: '00:00' };
        setWorkouts(currentWorkouts => [newWorkout, ...currentWorkouts]);
        toggleModal(); // This will close modal and reset name
    };

    const handleDeleteWorkout = (idToDelete) => {
        setWorkouts(currentWorkouts => currentWorkouts.filter(workout => workout.id !== idToDelete));
    };

    return (
        <SafeAreaView className='flex-1 items-center p-6 bg-white'>
            <ScrollView className='w-full' showsVerticalScrollIndicator={false}> {/* Added w-full here */}
                <View className="w-full">
                    <Text className='text-2xl font-bold text-left my-4'>Activities</Text>
                </View>

                {/* Render your WorkoutSet components with unique keys and onDelete prop */}
                {workouts.map(workout => (
                    <WorkoutSet
                        key={workout.id}
                        id={workout.id}
                        name={workout.name}
                        duration={workout.duration}
                        onDelete={() => handleDeleteWorkout(workout.id)}
                        onEdit={() => ""}
                    />
                ))}

            </ScrollView>

            <Modal visible={isModalVisible} animationType="slide" transparent={true} onRequestClose={toggleModal} statusBarTranslucent={true}>
                <View className='flex-1 justify-center items-center'>
                    <View className='w-4/5 p-6 rounded-lg bg-white shadow'>
                        <View>
                            <Text className='text-lg font-bold mb-2'>Workout Name</Text>
                            <TextInput
                                className='border border-gray-300 p-2 rounded-xl mt-2 h-14'
                                placeholder="e.g. Full Body Workout"
                                value={newWorkoutName}
                                onChangeText={setNewWorkoutName}
                            />
                        </View>
                        <View className='flex-row justify-end mt-4'>
                            <Pressable onPress={handleAddWorkout} className='mt-4 p-3 bg-purple rounded-xl'>
                                <Text className='text-white text-center font-bold'>Add Workout</Text>
                            </Pressable>
                            <Pressable onPress={toggleModal} className='mt-4 p-3 bg-white border-purple border-2 rounded-xl ml-4'>
                                <Text className='text-purple text-center font-bold'>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            <Pressable onPress={toggleModal} className='w-full flex flex-row justify-end absolute bottom-4 right-6'>
                <View className='w-16 h-16 bg-purple-dark rounded-full items-center justify-center animate-bounce'>
                    <Text className='text-white text-3xl font-semibold'>+</Text>
                </View>
            </Pressable>
        </SafeAreaView>
    );
};

export default Activities;