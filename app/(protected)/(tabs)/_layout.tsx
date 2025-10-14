import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

const _layout = () => {
    return (
            <Tabs screenOptions={{
                headerShown: false,
                tabBarInactiveTintColor: '#6B7280',
                tabBarActiveTintColor: '#7C4DFF',
            }}>
                <Tabs.Screen
                    name='index'
                    options={{
                    title:"Home",
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
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ? (
                            <Ionicons name="calendar" size={size} color="#7C4DFF" />
                        ) : (
                            <Ionicons name="calendar-outline" size={size} color={color} />
                        )
                    ),
                    }}
                />
                {/* <Tabs.Screen
                    name='search'
                    options={{
                    title:"Search",
                    tabBarInactiveTintColor: '#6B7280',
                    tabBarActiveTintColor: '#7C4DFF',
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ? (
                            <Ionicons name="search" size={size} color="#7C4DFF" />
                        ) : (
                            <Ionicons name="search-outline" size={size} color={color} />
                        )
                    ),
                    }}
                />           */}
                <Tabs.Screen
                    name='profile'
                    options={{
                    title:"Profile",
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