import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import 'react-native-get-random-values';
import { SafeAreaView } from 'react-native-safe-area-context';
import WorkoutSet from '../../components/workoutSet';
import { ActivitiesContext } from '../../contexts/activitiesContext';

const Activities = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [newWorkoutName, setNewWorkoutName] = useState('');

    const { workOuts, setWorkOuts, loading, error, userId, fetchWorkOuts } = useContext(ActivitiesContext);

    const router = useRouter();

    const toggleModal = () => {
        setModalVisible(prev => !prev);
        if (isModalVisible) { // If modal is closing, clear the input
            setNewWorkoutName('');
        }
    };

    const handleAddWorkout = async () => {
        if (newWorkoutName.trim() === '') {
            Alert.alert("Error: ", "Please give the workout set a name!")
            return;
        }

        //Post
        try {
            const response = await fetch("https://workoutservice.onrender.com/api/Workout", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    id: '',
                    userId: userId,
                    name: newWorkoutName
                })
            });

            if (!response.ok) {
                const errorText = await response.text().catch(() => '');
                console.log('Create workout failed', response.status, errorText);
                Alert.alert('Failed', 'Could not create workout.');
                return;
            }

            const text = await response.text();
            const data = text ? JSON.parse(text) : null;
            console.log('Create workout response:', data ?? text);

            if (data) {
                setWorkOuts(currentWorkouts => [data, ...currentWorkouts]);
            }
            // Always refresh to stay in sync with backend
            await fetchWorkOuts();

            toggleModal(); // This will close modal and reset name
        } catch (error) {
            console.log('Create workout error', error);
            Alert.alert('Error', 'An error occurred while creating workout.');
        }
    };

    const handleDeleteWorkout = (idToDelete) => {
        setWorkOuts(currentWorkouts => currentWorkouts.filter(workout => workout.id !== idToDelete));
    };

    return (
        <SafeAreaView className='flex-1 bg-white'>
            {loading ? (
                <View className="flex-1 items-center justify-center">
                    <MaterialCommunityIcons className='animate-spin' name='progress-helper' size={30} color={'#6430E8'}/>
                </View>
            ) : (
                <ScrollView className='w-full p-6' showsVerticalScrollIndicator={false}>
                <View className="w-full">
                    <Text className='text-2xl font-bold mb-4 text-center'>Workout Sets</Text>
                </View>

                {/* Render your WorkoutSet components with unique keys and onDelete prop */}
                {workOuts.map(workout => (
                    <WorkoutSet
                        key={workout.id}
                        id={workout.id}
                        name={workout.name}
                        duration={workout.duration}
                        onDelete={() => handleDeleteWorkout(workout.id)}
                        onEdit={() => { }}
                        onPress={() => { router.push(`/workout/${workout.id}`) }}
                    />
                ))}

            </ScrollView>
            )}
            {error && !loading && (
                <View className="w-full items-center justify-center my-2">
                    <MaterialCommunityIcons className='animate-spin' name='progress-alert' size={30} color={'#6430E8'}/>
                </View>
            )}
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

            {!loading && (<Pressable onPress={toggleModal} className='w-full flex flex-row justify-end absolute bottom-4 right-6'>
                <View className='w-16 h-16 bg-purple-dark rounded-full items-center justify-center'>
                    <Text className='text-white text-3xl font-semibold'>+</Text>
                </View>
            </Pressable>)}
        </SafeAreaView>
    );
};

export default Activities;