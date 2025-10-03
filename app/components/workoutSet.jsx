import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const { width } = Dimensions.get('window');
const ACTION_BUTTON_WIDTH = 80;

const WorkoutSet = ({ name, duration, onEdit, onDelete, onPress }) => {
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
            className='bg-background'
        >
            <TouchableOpacity style={styles.workoutSetContent} onPress={onPress}>
                <View style={styles.workoutSetDetails}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="barbell" size={20} color="white" />
                    </View>
                    <Text style={styles.workoutName}>{name || 'Workout'}</Text>
                </View>
                <Ionicons name='chevron-forward-outline' size={28} color={'lightgray'}/>
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
        backgroundColor: '#F3F6FB',
    },
    workoutSetContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        height: '100%',
        backgroundColor: '#F3F6FB',
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
