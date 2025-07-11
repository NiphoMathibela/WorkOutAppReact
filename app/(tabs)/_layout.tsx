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
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons name="home" size={size} color={color} />
                ),
                }}
            />
            <Tabs.Screen
                name='activities'
                options={{
                title:"Activities",
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons name="body" size={size} color={color} />
                ),
                }}
            />
            <Tabs.Screen
                name='calendar'
                options={{
                title:"Calendar",
                headerShown: true,
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons name="calendar" size={size} color={color} />
                ),
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                title:"Profile",
                headerShown: true,
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons name="person" size={size} color={color} />
                ),
                }}
            />
        </Tabs>
    )
}

export default _layout