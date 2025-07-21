import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'


export interface Coffee {
  id: string
  name: string
}

export default function FavScreen() {

  const [coffees, setCoffees] = useState<Coffee[]>([])
  const [newName, setNewName] = useState<string>('')

  useEffect(() => {
    loadCoffes()
  }, [])

  const loadCoffes = async () => {

    try {
      const json = await AsyncStorage.getItem('@fav_coffees')
      if (json) {
        const list: Coffee[] = JSON.parse(json)
        setCoffees(list)
      }

    } catch (e) {
      console.error('Kahveler yüklenirken hata:', e)
    }

  }

  const saveCoffes = async (list: Coffee[]) => {
    try {
      await AsyncStorage.setItem('@fav_coffees', JSON.stringify(list))

    } catch (e) {
      console.error('Kahveler yüklenirken hata:', e)
    }
  }

  const addCoffee = () => {

    const name = newName.trim();

    if (!name) {
      Alert.alert('Uyarı', 'Lütfen bir kahve adı girin.')
      return
    }
    const newCoffee: Coffee = { id: Date.now().toString(), name }
    const updated = [...coffees, newCoffee]
    setCoffees(updated)
    saveCoffes(updated)
    setNewName('')

  }

  const deleteCoffee = (id: string) => {

      Alert.alert(
        "Sil",
        "Bu Kahveyi Silmek istediğine eminmisin",
        [
          {text:'iptal', style:'cancel'},
          {
            text:'sil',
            style:'destructive',
            onPress:()=>{
              const filtred = coffees.filter(c => c.id !== id)
              setCoffees(filtred)
              saveCoffes(filtred)
            }
          }
        ]
      )

  }


  return (
    <View className='flex-1 p-4 mb-4 mt-8'>
      <Text className='text-2xl font-bold text-center mb-4'>Favori kahveler</Text>

      <View className='flex-row items-center mb-4 gap-2'>
        <TextInput
          placeholder='Yeni kahve adı'
          className='flex-1 border'
          value={newName}
          onChangeText={setNewName}
        />
        <TouchableOpacity
          className='bg-primary py-3 px-4 rounded-lg'
          onPress={addCoffee}
        >
          <Text>Ekle</Text>
        </TouchableOpacity>


      </View>

      <FlatList
        data={coffees}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View
            className='flex-row justify-between items-center py-3 px-2 border-b
           border-gray-200'>
            <Text>{item.name}</Text>
            <TouchableOpacity
              className='bg-red-500 px-3 py-1 rounded'
              onPress={()=>deleteCoffee(item.id)}
            >
              <Text className='text-white'>Sil</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text className='text-center text-gray-500 mt-8'>
            Liste boş
          </Text>
        }

      />
    </View>
  )
}

const styles = StyleSheet.create({})