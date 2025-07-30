import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Animated from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const ACTION_BUTTON_WIDTH = 80;

const WorkoutSet = ({ name, duration, onEdit, onDelete }) => {
    const swipeableRef = useRef(null);

    const renderRightActions = (progress, dragX) => {
        return (
            <View style={styles.rightActionsContainer}>
                <TouchableOpacity
                    style={styles.actionButtonEdit}
                    onPress={() => {
                        swipeableRef.current?.close();
                        onEdit();
                    }}
                >
                    <Ionicons name="create-outline" size={24} color="white" />
                    <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.actionButtonDelete}
                    onPress={() => {
                        swipeableRef.current?.close();
                        onDelete();
                    }}
                >
                    <Ionicons name="trash-outline" size={24} color="white" />
                    <Text style={styles.actionButtonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <Swipeable
            ref={swipeableRef}
            friction={2}
            rightThreshold={40}
            renderRightActions={renderRightActions}
            containerStyle={styles.swipeContainer}
        >
            <TouchableOpacity style={styles.workoutSetContent}>
                <View style={styles.workoutSetDetails}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="barbell" size={20} color="white" />
                    </View>
                    <Text style={styles.workoutName}>{name || 'Workout'}</Text>
                </View>
                <Text style={styles.workoutDuration}>{duration || '20:00'}</Text>
            </TouchableOpacity>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    swipeContainer: {
        height: 96,
        marginVertical: 8,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    workoutSetContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        height: '100%',
        backgroundColor: 'white',
    },
    rightActionsContainer: {
        flexDirection: 'row',
        height: '100%',
    },
    actionButtonEdit: {
        width: ACTION_BUTTON_WIDTH,
        height: '100%',
        backgroundColor: '#3B82F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButtonDelete: {
        width: ACTION_BUTTON_WIDTH,
        height: '100%',
        backgroundColor: '#EF4444',
        justifyContent: 'center',
        alignItems: 'center',
    },
    workoutSetDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#7C4DFF',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    workoutName: {
        fontSize: 18,
        fontWeight: '600',
    },
    workoutDuration: {
        color: 'gray',
    },
    actionButtonText: {
        color: 'white',
        fontSize: 12,
        marginTop: 4,
    },
});

export default WorkoutSet;
