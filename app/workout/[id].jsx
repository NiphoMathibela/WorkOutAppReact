import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const WorkoutDetails = () => {
    const {id} = useLocalSearchParams();
  return (
    <View>
      <Text>Workout ID = {id}</Text>
    </View>
  )
}

export default WorkoutDetails;

const styles = StyleSheet.create({})