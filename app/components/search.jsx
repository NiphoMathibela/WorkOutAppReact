import React, { useEffect, useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, TextInput, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import Constants from 'expo-constants'

const Search = () => {
  const { EXERCISEDB_API_KEY } = "cb1ca56723msh57f9ab99c139ef9p17f519jsn994c7a412851";

  const [searchTerm, setSearchTerm] = useState('')
  const [bodyPart, setBodyPart] = useState('all')
  const [equipment, setEquipment] = useState('all')
  const [target, setTarget] = useState('all')
  const [activeFilter, setActiveFilter] = useState('bodyPart') // 'bodyPart' | 'equipment' | 'target'

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
        {/* Header */}
        <View className='gap-1'>
          <Text className='text-2xl font-bold text-text'>Search Exercises</Text>
          <Text className='text-purple/70'>Find workouts by name, body part, equipment, or target muscle</Text>
        </View>

        {/* Search bar */}
        <View className='flex-row items-center border border-gray-300 rounded-2xl px-3 h-12 bg-background'>
          <Text className='text-gray-400 mr-2'>🔎</Text>
          <TextInput
            placeholder='e.g. push up, squat, bench press'
            value={searchTerm}
            onChangeText={setSearchTerm}
            className='flex-1 h-full'
            placeholderTextColor={'#9ca3af'}
            returnKeyType='search'
          />
        </View>

        {/* Segmented control for primary filter */}
        <View className='flex-row bg-background rounded-2xl p-1 border border-gray-200'>
          {[
            { key: 'bodyPart', label: 'Body Part' },
            { key: 'equipment', label: 'Equipment' },
            { key: 'target', label: 'Target' },
          ].map(tab => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveFilter(tab.key)}
              className={`flex-1 h-10 rounded-2xl items-center justify-center ${activeFilter === tab.key ? 'bg-purple-dark' : ''}`}
            >
              <Text className={`${activeFilter === tab.key ? 'text-white' : 'text-text'} font-semibold`}>{tab.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Pickers (card style) */}
        <View className='bg-white rounded-2xl border border-gray-200 p-2 shadow'>
          {activeFilter === 'bodyPart' && (
            <View className='mb-2'>
              <Text className='text-sm font-semibold text-text mb-1'>Body Part</Text>
              <View className='border border-gray-200 rounded'>
                <Picker selectedValue={bodyPart} onValueChange={setBodyPart}>
                  {bodyParts.map((bp) => (
                    <Picker.Item key={bp} label={bp} value={bp} />
                  ))}
                </Picker>
              </View>
            </View>
          )}
          {activeFilter === 'equipment' && (
            <View className='mb-2'>
              <Text className='text-sm font-semibold text-text mb-1'>Equipment</Text>
              <View className='border border-gray-200 rounded'>
                <Picker selectedValue={equipment} onValueChange={setEquipment}>
                  {equipments.map((eq) => (
                    <Picker.Item key={eq} label={eq} value={eq} />
                  ))}
                </Picker>
              </View>
            </View>
          )}
          {activeFilter === 'target' && (
            <View>
              <Text className='text-sm font-semibold text-text mb-1'>Target Muscle</Text>
              <View className='border border-gray-200 rounded'>
                <Picker selectedValue={target} onValueChange={setTarget}>
                  {targets.map((tg) => (
                    <Picker.Item key={tg} label={tg} value={tg} />
                  ))}
                </Picker>
              </View>
            </View>
          )}
        </View>
      </View>

      {loading && (
        <View className='flex-1 items-center justify-center'>
          <ActivityIndicator size='large' color={'#7C4DFF'} />
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
            <View className='bg-white border border-gray-200 rounded-2xl p-4 mb-3 shadow-sm'>
              <Text className='font-semibold text-text text-base mb-1'>{item.name}</Text>
              <View className='flex-row flex-wrap gap-2 mt-1'>
                <View className='px-2 py-1 rounded-full bg-purple/10'>
                  <Text className='text-xs text-purple'>Body: {item.bodyPart}</Text>
                </View>
                <View className='px-2 py-1 rounded-full bg-purple/10'>
                  <Text className='text-xs text-purple'>Equip: {item.equipment}</Text>
                </View>
                <View className='px-2 py-1 rounded-full bg-purple/10'>
                  <Text className='text-xs text-purple'>Target: {item.target}</Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  )
}

export default Search