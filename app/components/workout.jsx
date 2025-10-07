import { Ionicons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React, { useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';


const Workout = ({ name, duration, exercises = [] }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
        <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className='w-full h-24 bg-background rounded-2xl p-6 flex flex-row justify-between items-center my-3'
        >
            <View className="flex-row items-center">
                <View className="w-10 h-10 bg-[#7C4DFF] rounded-full items-center justify-center mr-3">
                    <Ionicons name="barbell" size={20} color="white" />
                </View>
                <Text className="text-lg font-semibold">{name || 'Workout'}</Text>
            </View>
            {/* <Ionicons name='chevron-forward-outline' size={28} color={'lightgray'}/> */}
        </TouchableOpacity>

        {/* Modal To View Workout */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end">
          <View className="bg-white rounded-t-3xl p-6 h-3/4 w-full">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-2xl font-bold">{name || 'Workout'}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            
            <Text className="text-lg font-semibold mb-4">Exercises</Text>
            
            {exercises.length > 0 ? (
              <FlatList
                data={exercises}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View className="flex-row justify-between items-center p-4 bg-background rounded-xl mb-3">
                    <View>
                      <Text className="font-semibold text-base">{item.name}</Text>
                      <Text className="text-gray-500">{item.sets} sets × {item.reps} reps</Text>
                    </View>
                    <Text className="text-[#7C4DFF] font-semibold">{item.weight}</Text>
                  </View>
                )}
              />
            ) : (
              <View className="flex-1 items-center justify-center">
                <Text className="text-gray-400">No exercises added yet</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </>
  )
}

export default Workout