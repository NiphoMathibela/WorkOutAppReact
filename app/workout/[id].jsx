import { Ionicons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import { useLocalSearchParams } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivitiesContext } from '../contexts/activitiesContext';

const WorkoutDetails = () => {
  const { id } = useLocalSearchParams();
  const { setWorkoutId, exercises, setExercises, newExercise, setNewExercise, addNewExercise } = useContext(ActivitiesContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [workoutInfo, setWorkoutInfo] = useState({});
  const [selectedExercise, setSelectedExercise] = useState({});

  //Long press edit or delete state
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDeleted] = useState(false);

  const headerHeight = useHeaderHeight();

  //Handle new exercise submit
  const handleAddNewExercise = async () => {
    const payload = {
      id: '',
      workoutId: id,
      userId: '60c72b2f9b1d8e001f8e4c5e',
      name: newExercise.name?.trim() || '',
      sets: newExercise.sets ? Number(newExercise.sets) : 0,
      repetitions: newExercise.repetitions ? Number(newExercise.repetitions) : 0,
      weight: newExercise.weight ? Number(newExercise.weight) : 0,
    };
    if (!payload.name) return;

    try {
      const response = await fetch("https://workoutservice.onrender.com/api/Exercises", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log(data);

      //Add new exercise to current exercise data to Front End
      setExercises(prev => [...prev, payload]);

      //Show Alert
      Alert.alert('Success', 'Exercise added successfully');
      // reset and close
      setNewExercise({ name: '', sets: '', repetitions: '', weight: '' });
      setIsModalVisible(false);
    } catch (err) {
      // You may add a toast/snackbar here
      console.log('Failed to add exercise', err);
    }
  };

  //Handle Exercise Form Change (React Native TextInput provides text only)
  const handleExerciseChange = (key) => (text) => {
    setNewExercise({ ...newExercise, [key]: text });
  }

  //Fetch Workout Based On Id
  const getWorkOutById = async () => {
    const response = await fetch(`https://workoutservice.onrender.com/api/Workout/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      }
    });

    const data = await response.json();
    setWorkoutInfo(data)
    console.log("This is Test: ", data)
    return data;
  }


  //Handle long press on exercise item
  const handleLongPress = (exercise) => {
    setSelectedExercise(exercise);
    console.log("Selected: ", exercise.id + " " + exercise.name);
    setIsEdit(true);
  }

  //Delete selected exercise
  const handleDeleteExercise = async (exerciseId) => {
    try {
      console.log("Deleting: ", exerciseId);
      const response = await fetch(`https://workoutservice.onrender.com/api/Exercises/${exerciseId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
    });

    if (response.ok) {
      //Remove deleted exercise from current exercise data to Front End
      setExercises(prev => prev.filter(exercise => exercise.id !== exerciseId));
      setIsEdit(false);
      //Show Alert
      Alert.alert('Success', 'Exercise deleted successfully');
    } else {
      const errorText = await response.text();
      throw new Error(`Server responded with ${response.status}: ${errorText}`);
    }
    } catch (err) {
      // You may add a toast/snackbar here
      Alert.alert('Error', 'Failed to delete exercise');
      console.log('Failed to delete exercise', err);
    }
  }


  useEffect(() => {
    if (id) {
      setWorkoutId(id);

      //Fetch Workout Info
      (async () => {
        try {
          const workouts = await getWorkOutById();
          // setWorkoutInfo(workouts);
        } catch (e) {
          console.log('Failed to fetch workout info', e);
        }
      })();
    }


  }, [id, setWorkoutId]);

  //Map through fethed exercises
  const exercisesList = exercises.map((exercise, index) => (
    <TouchableOpacity onLongPress={() => handleLongPress(exercise)} key={(exercise && exercise.id) ?? index} className='flex-row w-full justify-between items-center p-4 bg-background rounded-xl mb-3'>
      <View>
        <View className='flex-row items-center'>
          <Ionicons name='barbell' size={28} color='#6430E8' />
          <Text className='font-semibold ml-2 text-base'>{exercise.name}</Text>
        </View>
        <Text className='text-gray-500'>{exercise.sets} sets × {exercise.repetitions} reps</Text>
      </View>
      <Text className='text-[#7C4DFF] font-semibold'>{exercise.weight} kg</Text>
    </TouchableOpacity>
  ));

  return (
    <SafeAreaView className='flex-1 items-center p-6 bg-white'>
      <Text className='text-2xl font-bold text-left my-4 text-black'>{workoutInfo.name}</Text>
      {exercisesList}

      <Modal
        visible={isModalVisible}
        animationType='slide'
        transparent
        onRequestClose={() => setIsModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={(headerHeight || 0) + 12}
          className='flex-1'
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className='flex-1 items-center justify-center bg-transparent'>
              <View className='w-5/6 max-h-[80%] rounded-2xl bg-white shadow'>
                <ScrollView contentContainerStyle={{ padding: 24 }} keyboardShouldPersistTaps='handled'>
                  <View>
                    <Text className='text-lg font-bold mb-2'>Exercise Name</Text>
                    <TextInput
                      className='border border-gray-300 p-4 rounded-2xl mt-2 h-14 focus:border-purple focus:outline-none'
                      placeholder='e.g. Push-Ups'
                      placeholderTextColor={'gray'}
                      value={newExercise.name}
                      onChangeText={handleExerciseChange('name')}
                    />
                    <Text className='text-lg font-bold mb-2'>Number Of Sets</Text>
                    <TextInput
                      className='border border-gray-300 p-4 rounded-2xl mt-2 h-14 focus:border-purple focus:outline-none'
                      placeholder='e.g. Sets'
                      placeholderTextColor={'gray'}
                      value={newExercise.sets}
                      onChangeText={handleExerciseChange('sets')}
                      keyboardType='number-pad'
                    />
                    <Text className='text-lg font-bold mb-2'>Number Of Repetitions</Text>
                    <TextInput
                      className='border border-gray-300 p-4 rounded-2xl mt-2 h-14 focus:border-purple focus:outline-none'
                      placeholder='e.g. Repetitions'
                      placeholderTextColor={'gray'}
                      value={newExercise.repetitions}
                      onChangeText={handleExerciseChange('repetitions')}
                      keyboardType='number-pad'
                    />
                    <Text className='text-lg font-bold mb-2'>Weight</Text>
                    <TextInput
                      className='border border-gray-300 p-4 rounded-2xl mt-2 h-14 focus:border-purple focus:outline-none'
                      placeholder='e.g. Weight'
                      placeholderTextColor={'gray'}
                      value={newExercise.weight}
                      onChangeText={handleExerciseChange('weight')}
                      keyboardType='decimal-pad'
                    />
                  </View>
                  <View className='flex-row justify-end mt-4'>
                    <Pressable onPress={handleAddNewExercise} className='mt-4 p-3 bg-purple rounded-2xl'>
                      <Text className='text-white text-center font-bold'>Add Exercise</Text>
                    </Pressable>
                    <Pressable onPress={() => setIsModalVisible(false)} className='mt-4 p-3 bg-white border-purple border-2 rounded-2xl ml-4'>
                      <Text className='text-purple text-center font-bold'>Cancel</Text>
                    </Pressable>
                  </View>
                </ScrollView>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>

      {/* Edit or Delete Modal */}
      <Modal visible={isEdit} animationType='fade' transparent={true} onRequestClose={() => setIsEdit(false)}>
        <View className='flex-1 items-center justify-center bg-black/40'>
          <View className='w-5/6 rounded-2xl bg-white p-6'>
            <Text className='text-lg font-bold text-black mb-4'>Edit or Delete?</Text>
            <View className='flex-row justify-end'>
              <Pressable onPress={() => setIsEdit(false)} className='p-3 bg-white border-purple border-2 rounded-2xl ml-2'>
                <Text className='text-purple text-center font-bold'>Cancel</Text>
              </Pressable>
              <Pressable onPress={() => setIsEdit(false)} className='p-3 bg-purple rounded-2xl ml-2 w-20'>
                <Text className='text-white text-center font-bold'>Edit</Text>
              </Pressable>
              <Pressable onPress={() => handleDeleteExercise(selectedExercise?.id)} className='p-3 bg-purple rounded-2xl ml-2'>
                <Text className='text-white text-center font-bold'>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add new exercise button */}
      <TouchableOpacity onPress={() => setIsModalVisible(true)} className='absolute bottom-6 right-6 w-16 h-16 bg-purple-dark rounded-full items-center justify-center'>
        <Ionicons name='add' size={26} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default WorkoutDetails;