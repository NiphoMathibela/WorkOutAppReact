import { useContext, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import 'react-native-get-random-values';
import { SafeAreaView } from 'react-native-safe-area-context';
import { v4 as uuidv4 } from 'uuid';
import WorkoutSet from '../components/workoutSet';
import { useRouter } from 'expo-router';
import { ActivitiesContext } from '../contexts/activitiesContext';

const Activities = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [newWorkoutName, setNewWorkoutName] = useState('');

    const { workOuts, setWorkOuts, loading, error } = useContext(ActivitiesContext);

    const router = useRouter();

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
        setWorkOuts(currentWorkouts => [newWorkout, ...currentWorkouts]);
        toggleModal(); // This will close modal and reset name
    };

    const handleDeleteWorkout = (idToDelete) => {
        setWorkOuts(currentWorkouts => currentWorkouts.filter(workout => workout.id !== idToDelete));
    };

    return (
        <SafeAreaView className='flex-1 items-center p-6 bg-white'>
            {loading && (
                <View className="w-full items-center my-4">
                    <Text className='text-gray-500'>Loading workouts...</Text>
                </View>
            )}
            {error && (
                <View className="w-full items-center my-2">
                    <Text className='text-red-500'>Failed to load workouts.</Text>
                </View>
            )}
            <ScrollView className='w-full' showsVerticalScrollIndicator={false}>
                <View className="w-full">
                    <Text className='text-2xl font-bold text-left my-4'>Activities</Text>
                </View>

                {/* Render your WorkoutSet components with unique keys and onDelete prop */}
                {workOuts.map(workout => (
                    <WorkoutSet
                        key={workout.id}
                        id={workout.id}
                        name={workout.name}
                        duration={workout.duration}
                        onDelete={() => handleDeleteWorkout(workout.id)}
                        onEdit={() => {}}
                        onPress={() => {router.push(`/workout/${workout.id}`)}}
                    />
                ))}

            </ScrollView>
            {/* Adding New Workput Modal */}
            <Modal visible={isModalVisible} animationType="slide" transparent={true} onRequestClose={toggleModal} statusBarTranslucent={true}>
                <View className='flex-1 justify-center items-center'>
                    <View className='w-5/6 p-6 rounded-2xl bg-white shadow'>
                        <View>
                            <Text className='text-lg font-bold mb-2'>Workout Name</Text>
                            <TextInput
                                className='border border-gray-300 p-4 rounded-2xl mt-2 h-14 focus:border-purple focus:outline-none'
                                placeholder="e.g. Full Body Workout Set"
                                placeholderTextColor={'gray'}
                                value={newWorkoutName}
                                onChangeText={setNewWorkoutName}
                            />
                        </View>
                        <View className='flex-row justify-end mt-4'>
                            <Pressable onPress={handleAddWorkout} className='mt-4 p-3 bg-purple rounded-2xl'>
                                <Text className='text-white text-center font-bold'>Add Workout</Text>
                            </Pressable>
                            <Pressable onPress={toggleModal} className='mt-4 p-3 bg-white border-purple border-2 rounded-2xl ml-4'>
                                <Text className='text-purple text-center font-bold'>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            <Pressable onPress={toggleModal} className='w-full flex flex-row justify-end absolute bottom-4 right-6'>
                <View className='w-16 h-16 bg-purple-dark rounded-full items-center justify-center'>
                    <Text className='text-white text-3xl font-semibold'>+</Text>
                </View>
            </Pressable>
        </SafeAreaView>
    );
};

export default Activities;