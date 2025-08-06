import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

const _layout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name='index'
                options={{
                title:"Home",
                tabBarInactiveTintColor: '#6B7280',
                tabBarActiveTintColor: '#7C4DFF',
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => (
                    focused ? (
                        <Ionicons name="home" size={size} color="#7C4DFF" />
                    ) : (
                        <Ionicons name="home-outline" size={size} color={color} />
                    )
                ),
                }}
            />
            <Tabs.Screen
                name='activities'
                options={{
                title:"Activities",
                tabBarInactiveTintColor: '#6B7280',
                tabBarActiveTintColor: '#7C4DFF',
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => (
                    focused ? (
                        <Ionicons name="body" size={size} color="#7C4DFF" />
                    ) : (
                        <Ionicons name="body-outline" size={size} color={color} />
                    )
                ),
                }}
            />
            <Tabs.Screen
                name='calendar'
                options={{
                title:"Calendar",
                tabBarInactiveTintColor: '#6B7280',
                tabBarActiveTintColor: '#7C4DFF',
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => (
                    focused ? (
                        <Ionicons name="calendar" size={size} color="#7C4DFF" />
                    ) : (
                        <Ionicons name="calendar-outline" size={size} color={color} />
                    )
                ),
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                title:"Profile",
                tabBarInactiveTintColor: '#6B7280',
                tabBarActiveTintColor: '#7C4DFF',
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => (
                    focused ? (
                        <Ionicons name="person" size={size} color="#7C4DFF" />
                    ) : (
                        <Ionicons name="person-outline" size={size} color={color} />
                    )
                ),
                }}
            />
        </Tabs>
    )
}

export default _layout