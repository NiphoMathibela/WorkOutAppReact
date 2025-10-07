import React, { useEffect, useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, TextInput, FlatList, ActivityIndicator } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import Constants from 'expo-constants'

const Search = () => {
  const { EXERCISEDB_API_KEY } = "cb1ca56723msh57f9ab99c139ef9p17f519jsn994c7a412851";

  const [searchTerm, setSearchTerm] = useState('')
  const [bodyPart, setBodyPart] = useState('all')
  const [equipment, setEquipment] = useState('all')
  const [target, setTarget] = useState('all')

  const [exercises, setExercises] = useState([])
  const [bodyParts, setBodyParts] = useState(['all'])
  const [equipments, setEquipments] = useState(['all'])
  const [targets, setTargets] = useState(['all'])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const headers = useMemo(() => ({
    'X-RapidAPI-Key': EXERCISEDB_API_KEY || '',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  }), [EXERCISEDB_API_KEY])

  useEffect(() => {
    const fetchLists = async () => {
      try {
        setLoading(true)
        setError(null)
        const [bpRes, eqRes, tgRes] = await Promise.all([
          fetch('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', { headers }),
          fetch('https://exercisedb.p.rapidapi.com/exercises/equipmentList', { headers }),
          fetch('https://exercisedb.p.rapidapi.com/exercises/targetList', { headers }),
        ])
        const [bp, eq, tg] = await Promise.all([bpRes.json(), eqRes.json(), tgRes.json()])
        setBodyParts(['all', ...bp])
        setEquipments(['all', ...eq])
        setTargets(['all', ...tg])
      } catch (e) {
        setError('Failed to load filter lists')
      } finally {
        setLoading(false)
      }
    }
    fetchLists()
  }, [headers])

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true)
        setError(null)
        // Limit to reasonable number for client-side filtering
        const res = await fetch('https://exercisedb.p.rapidapi.com/exercises?limit=1000', { headers })
        const data = await res.json()
        setExercises(Array.isArray(data) ? data : [])
      } catch (e) {
        setError('Failed to load exercises')
      } finally {
        setLoading(false)
      }
    }
    fetchExercises()
  }, [headers])

  const filteredExercises = useMemo(() => {
    return exercises.filter((ex) => {
      const matchesSearch = searchTerm.trim().length === 0 || ex.name?.toLowerCase().includes(searchTerm.trim().toLowerCase())
      const matchesBody = bodyPart === 'all' || ex.bodyPart === bodyPart
      const matchesEquip = equipment === 'all' || ex.equipment === equipment
      const matchesTarget = target === 'all' || ex.target === target
      return matchesSearch && matchesBody && matchesEquip && matchesTarget
    })
  }, [exercises, searchTerm, bodyPart, equipment, target])

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='p-4 gap-4'>
        <Text className='text-xl font-semibold'>Search Exercises</Text>

        <TextInput
          placeholder='Search by name (e.g., push up)'
          value={searchTerm}
          onChangeText={setSearchTerm}
          className='border border-gray-300 rounded px-3 py-2'
        />

        <View className='border border-gray-200 rounded'>
          <Picker selectedValue={bodyPart} onValueChange={setBodyPart}>
            {bodyParts.map((bp) => (
              <Picker.Item key={bp} label={`Body Part: ${bp}`} value={bp} />
            ))}
          </Picker>
        </View>

        <View className='border border-gray-200 rounded'>
          <Picker selectedValue={equipment} onValueChange={setEquipment}>
            {equipments.map((eq) => (
              <Picker.Item key={eq} label={`Equipment: ${eq}`} value={eq} />
            ))}
          </Picker>
        </View>

        <View className='border border-gray-200 rounded'>
          <Picker selectedValue={target} onValueChange={setTarget}>
            {targets.map((tg) => (
              <Picker.Item key={tg} label={`Target: ${tg}`} value={tg} />
            ))}
          </Picker>
        </View>
      </View>

      {loading && (
        <View className='flex-1 items-center justify-center'>
          <ActivityIndicator size='large' />
        </View>
      )}

      {!loading && error && (
        <View className='px-4'>
          <Text className='text-red-500'>{error}</Text>
        </View>
      )}

      {!loading && !error && (
        <FlatList
          data={filteredExercises}
          keyExtractor={(item) => String(item.id ?? item.name)}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
          renderItem={({ item }) => (
            <View className='border-b border-gray-200 py-3'>
              <Text className='font-semibold'>{item.name}</Text>
              <Text className='text-gray-600'>Body Part: {item.bodyPart}</Text>
              <Text className='text-gray-600'>Equipment: {item.equipment}</Text>
              <Text className='text-gray-600'>Target: {item.target}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  )
}

export default Search