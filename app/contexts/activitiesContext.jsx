import React, { createContext, useEffect, useState } from "react";

export const ActivitiesContext = createContext();

export const ActivitiesContextProvider = ({ children }) => {
    const [workOuts, setWorkOuts] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [workOutId, setWorkoutId] = useState(null);
    const [newExercise, setNewExercise] = useState({
        id:'',
        workoutId:'',
        userId:'',
        name: '',
        sets: '',
        repetitions: '',
        weight: ''
    })

    //Main URL Dev
    const devUrl = "https://workoutservice.onrender.com";

    //Temporary user id
    const userId = "60c72b2f9b1d8e001f8e4c5e";
 
    const fetchWorkOuts = async () => {
        try {
            setLoading(true);
            // Note: There's a double slash in the URL, which might be a typo.
            const response = await fetch(`${devUrl}/api/Workout`);
            const data = await response.json();
            setWorkOuts(data);
        } catch (error) {
            console.log("Error fetching workouts:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    //Fetch Exerises
    const fetchExercises = async (workoutId, userId) => {
        try {
            const response = await fetch(`${devUrl}/api/Exercises/workout/${workoutId}/user/${userId}`);
            const data = await response.json();
            setExercises(data);
        } catch (error) {
            console.log("Error fetching exercises:", error);
            // setError(error);
        } finally {
            //setLoading(false);
        }
    }

    //Add new Exercise to a Workout
    const addNewExercise = async (workoutId, exerciseData) => {
        try {
            setExercises(prev => [...prev, newExercise]);
            const response = await fetch(`${devUrl}/api/Exercises/Workout/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(exerciseData),
            });

            if (!response.ok) {
                const errorText = await response.text().catch(() => '');
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            const text = await response.text();
            const data = text ? JSON.parse(text) : null; // Handle 204/empty responses

            if (data) {
                setExercises(prevExercises => [...prevExercises, data]);
            }
            // Always refresh list to stay in sync with backend
            if (workOutId) {
                await fetchExercises(workOutId, userId);
            }
            return data;
        } catch (error) {
            console.log("Error adding exercise:", error);
            throw error;
        }
    }
 
    useEffect(() => {
        fetchWorkOuts();
    }, []); // The empty dependency array ensures this runs only once on mount

    useEffect(() => {
        fetchExercises(workOutId, userId);
    }, [workOutId]);
 
    return (
        <ActivitiesContext.Provider value={{ workOuts, setWorkOuts, workOutId, setWorkoutId, userId, loading, error, fetchWorkOuts, fetchExercises, exercises, setExercises, setNewExercise, newExercise, addNewExercise, userId }}>
            {children}
        </ActivitiesContext.Provider>
    );
};

export default ActivitiesContextProvider;