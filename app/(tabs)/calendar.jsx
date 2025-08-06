import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, TextInput } from 'react-native';
import { Calendar, CalendarList } from 'react-native-calendars';
import { AntDesign, MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const CalendarScreen = () => {
  // Workout data state
  const [workouts, setWorkouts] = useState({
    '2025-07-15': [
      { id: '1', name: 'Upper Body Strength', type: 'strength', completed: true },
      { id: '2', name: 'Morning Run', type: 'cardio', completed: false }
    ],
    '2025-07-18': [
      { id: '3', name: 'Yoga Flow', type: 'flexibility', completed: true }
    ]
  });

  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    type: 'strength'
  });
  const [viewMode, setViewMode] = useState('month');

  // Get marked dates for calendar
  const getMarkedDates = () => {
    const marked = {};
    
    Object.keys(workouts).forEach(date => {
      const allCompleted = workouts[date].every(w => w.completed);
      const anyCompleted = workouts[date].some(w => w.completed);
      
      marked[date] = {
        marked: true,
        dotColor: allCompleted ? '#10b981' : anyCompleted ? '#f59e0b' : '#3b82f6',
        selected: date === selectedDate,
      };
    });

    if (selectedDate) {
      marked[selectedDate] = {
        ...marked[selectedDate],
        selected: true,
        selectedColor: '#6366f1',
      };
    }

    return marked;
  };

  const handleAddWorkout = () => {
    if (!newWorkout.name.trim()) return;
    
    const updatedWorkouts = { ...workouts };
    const workoutToAdd = {
      id: Date.now().toString(),
      name: newWorkout.name.trim(),
      type: newWorkout.type,
      completed: false
    };

    if (!updatedWorkouts[selectedDate]) {
      updatedWorkouts[selectedDate] = [];
    }
    
    updatedWorkouts[selectedDate].push(workoutToAdd);
    setWorkouts(updatedWorkouts);
    setNewWorkout({ name: '', type: 'strength' });
    setModalVisible(false);
  };

  const toggleWorkoutCompletion = (workoutId) => {
    const updatedWorkouts = { ...workouts };
    const workout = updatedWorkouts[selectedDate].find(w => w.id === workoutId);
    
    if (workout) {
      workout.completed = !workout.completed;
      setWorkouts(updatedWorkouts);
    }
  };

  const getWorkoutTypeIcon = (type) => {
    const icons = {
      strength: 'dumbbell',
      cardio: 'run-fast',
      flexibility: 'yoga',
    };
    return icons[type] || 'dumbbell';
  };

  const renderWorkoutItem = ({ item }) => (
    <TouchableOpacity className="flex-row justify-between items-center p-4 bg-white rounded-lg shadow-sm mb-2">
      <View className="flex-row items-center space-x-3">
        <MaterialCommunityIcons 
          name={getWorkoutTypeIcon(item.type)} 
          size={20}
          className={item.type === 'strength' ? 'text-blue-500' : 
                    item.type === 'cardio' ? 'text-red-500' : 'text-green-500'}
        />
        <Text className={`text-base ${item.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {item.name}
        </Text>
      </View>
      <TouchableOpacity onPress={() => toggleWorkoutCompletion(item.id)}>
        <AntDesign 
          name={item.completed ? 'checkcircle' : 'checkcircleo'} 
          size={20} 
          className={item.completed ? 'text-green-500' : 'text-gray-300'} 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      {/* View Mode Toggle */}
      <View className="flex-row mb-4 bg-white rounded-lg shadow-sm overflow-hidden">
        <TouchableOpacity 
          className={`flex-1 py-3 items-center ${viewMode === 'month' ? 'bg-indigo-100' : 'bg-white'}`}
          onPress={() => setViewMode('month')}
        >
          <Text className={`font-medium ${viewMode === 'month' ? 'text-indigo-600' : 'text-gray-500'}`}>Month</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className={`flex-1 py-3 items-center ${viewMode === 'week' ? 'bg-indigo-100' : 'bg-white'}`}
          onPress={() => setViewMode('week')}
        >
          <Text className={`font-medium ${viewMode === 'week' ? 'text-indigo-600' : 'text-gray-500'}`}>Week</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar */}
      <View className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
        {viewMode === 'month' ? (
          <Calendar
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={getMarkedDates()}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#6b7280',
              selectedDayBackgroundColor: '#6366f1',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#6366f1',
              dayTextColor: '#111827',
              textDisabledColor: '#d1d5db',
              dotColor: '#3b82f6',
              selectedDotColor: '#ffffff',
              arrowColor: '#6366f1',
              monthTextColor: '#111827',
              indicatorColor: '#6366f1',
              textDayFontWeight: '500',
              textMonthFontWeight: '600',
              textDayHeaderFontWeight: '500',
            }}
          />
        ) : (
          <CalendarList
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={getMarkedDates()}
            pastScrollRange={1}
            futureScrollRange={1}
            pagingEnabled
            horizontal
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#6b7280',
              selectedDayBackgroundColor: '#6366f1',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#6366f1',
              dayTextColor: '#111827',
              textDisabledColor: '#d1d5db',
              dotColor: '#3b82f6',
              selectedDotColor: '#ffffff',
              arrowColor: '#6366f1',
              monthTextColor: '#111827',
              indicatorColor: '#6366f1',
              textDayFontWeight: '500',
              textMonthFontWeight: '600',
              textDayHeaderFontWeight: '500',
            }}
          />
        )}
      </View>

      {/* Workouts List */}
      <View className="flex-1 bg-white p-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-semibold text-gray-800">
            {selectedDate ? new Date(selectedDate).toDateString() : 'Select a date'}
          </Text>
          {selectedDate && (
            <TouchableOpacity 
              onPress={() => setModalVisible(true)}
              className="bg-indigo-500 p-2 rounded-full"
            >
              <AntDesign name="plus" size={16} color="white" />
            </TouchableOpacity>
          )}
        </View>
        
        {selectedDate ? (
          workouts[selectedDate] ? (
            <FlatList
              data={workouts[selectedDate]}
              renderItem={renderWorkoutItem}
              keyExtractor={item => item.id}
              contentContainerStyle={{ paddingBottom: 16 }}
            />
          ) : (
            <View className="flex-1 justify-center items-center p-8">
              <Ionicons name="walk" size={40} color={'#6430E8'} className="text-gray-300 mb-4" />
              <Text className="text-gray-500 mb-4 text-center">You have not worked out today!</Text>
              {/* <TouchableOpacity 
                className="bg-indigo-500 px-6 py-2 rounded-full"
                onPress={() => setModalVisible(true)}
              >
                <Text className="text-white font-medium">Add Workout</Text>
              </TouchableOpacity> */}
            </View>
          )
        ) : (
          <View className="flex-1 justify-center items-center">
            <MaterialCommunityIcons name="calendar-blank" size={40} className="text-gray-300 mb-4" />
            <Text className="text-gray-500">Select a date to view workouts</Text>
          </View>
        )}
      </View>

      {/* Add Workout Modal */}
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center p-4 bg-black bg-opacity-50">
          <View className="bg-white rounded-xl p-6">
            <Text className="text-xl font-bold text-gray-800 mb-6">Add New Workout</Text>
            
            <TextInput
              className="border border-gray-200 rounded-lg px-4 py-3 mb-4"
              placeholder="Workout name"
              value={newWorkout.name}
              onChangeText={text => setNewWorkout({...newWorkout, name: text})}
            />
            
            <View className="mb-6">
              <Text className="text-gray-700 mb-2">Workout Type:</Text>
              <View className="flex-row space-x-2">
                {['strength', 'cardio', 'flexibility'].map(type => (
                  <TouchableOpacity 
                    key={type}
                    className={`py-2 px-4 rounded-full ${newWorkout.type === type ? 
                      type === 'strength' ? 'bg-blue-100 border-blue-500' : 
                      type === 'cardio' ? 'bg-red-100 border-red-500' : 
                      'bg-green-100 border-green-500' : 
                      'bg-gray-100 border-gray-200'} border`}
                    onPress={() => setNewWorkout({...newWorkout, type})}
                  >
                    <Text className={newWorkout.type === type ? 
                      type === 'strength' ? 'text-blue-700' : 
                      type === 'cardio' ? 'text-red-700' : 
                      'text-green-700' : 
                      'text-gray-600'}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View className="flex-row justify-end space-x-3">
              <TouchableOpacity 
                className="px-6 py-2 border border-gray-300 rounded-lg"
                onPress={() => {
                  setNewWorkout({ name: '', type: 'strength' });
                  setModalVisible(false);
                }}
              >
                <Text className="text-gray-700">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="px-6 py-2 bg-indigo-500 rounded-lg"
                onPress={handleAddWorkout}
              >
                <Text className="text-white">Add Workout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> */}
    </SafeAreaView>
  );
};

export default CalendarScreen;
