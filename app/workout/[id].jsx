import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { useContext } from 'react';
import { ActivitiesContext } from '../contexts/activitiesContext';

const WorkoutDetails = () => {
    const {id} = useLocalSearchParams();
    const {setWorkoutId, exercises} = useContext(ActivitiesContext);

    useEffect(() => {
        if (id) {
            setWorkoutId(id);
        }
    }, [id, setWorkoutId]);

    //Map through fethed exercises
    const exercisesList = exercises.map((exercise, index) => (
        <View key={index}>
            <Text>{exercise.name}</Text>
        </View>
    ));

  return (
    <View className='flex-1 items-center justify-center p-6 bg-white'>
      <Text>Workout ID = {id}</Text>
      {exercisesList}
    </View>
  )
}

export default WorkoutDetails;