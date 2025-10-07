import { StyleSheet, Text, View, TouchableOpacity, TextInput, Pressable, Modal, KeyboardAvoidingView, Platform, Keyboard, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { useContext } from 'react';
import { ActivitiesContext } from '../contexts/activitiesContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';

const WorkoutDetails = () => {
  const { id } = useLocalSearchParams();
  const { setWorkoutId, exercises, setExercises, newExercise, setNewExercise, addNewExercise } = useContext(ActivitiesContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [workoutInfo, setWorkoutInfo] = useState({});
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
    <View key={(exercise && exercise.id) ?? index} className='flex-row w-full justify-between items-center p-4 bg-background rounded-xl mb-3'>
      <View>
        <View className='flex-row items-center'>
          <Ionicons name='barbell' size={28} color='#6430E8' />
          <Text className='font-semibold ml-2 text-base'>{exercise.name}</Text>
        </View>
        <Text className='text-gray-500'>{exercise.sets} sets × {exercise.repetitions} reps</Text>
      </View>
      <Text className='text-[#7C4DFF] font-semibold'>{exercise.weight} kg</Text>
    </View>
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

      {/* Add new exercise button */}
      <TouchableOpacity onPress={() => setIsModalVisible(true)} className='absolute bottom-6 right-6 w-16 h-16 bg-purple-dark rounded-full items-center justify-center'>
        <Ionicons name='add' size={26} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default WorkoutDetails;