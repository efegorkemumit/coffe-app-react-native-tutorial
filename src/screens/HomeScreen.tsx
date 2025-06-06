import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { categories } from '../constans';
import Entypo from '@expo/vector-icons/Entypo';
import { themeColors } from '../theme';
export default function HomeScreen() {

  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    if (categories.length > 0) {
      setActiveCategory(categories[0].id);
    }
  }, []);

  return (
    <View className=' flex-1 bg-white'>
      <StatusBar translucent backgroundColor="transparent" />

      <Image
        source={require('../../assets/images/bg.png')}
        resizeMode='cover'
        className='absolute top-0 left-0 w-full h-1/4 opacity-10'
      />

      <SafeAreaView className='flex-1'>
        <View className='mt-16 mx-4 flex-row justify-between items-center'>
          <Image
            source={require('../../assets/images/profile.png')}
            resizeMode='cover'
            className='h-9 w-9 rounded-full'
          />
          <View className='flex-row items-center space-x-2'>
            <Entypo name="location-pin" size={24} color={themeColors.bgPrimary} />
            <Text>İstanbul Turkey</Text>
          </View>

          <Entypo name="bell" size={24} color={themeColors.bgPrimary} />
        </View>
        <View className='mx-5 mt-4 shadow-lg '>
          <View className='flex-row bg-gray-200 p-1 rounded-full items-center'>
            <TextInput
              placeholder='Search'
              className='flex-1 px-4 py-2 font-semibold text-gray-700  rounded-full'
              
            />
            <TouchableOpacity className='rounded-full p-2 bg-primary'>
              <Entypo name="magnifying-glass" size={24} color="black" />
            </TouchableOpacity>
          </View>

        </View>

        <View className='px-5 mt-6'>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item)=>item.id.toString()}
            contentContainerStyle={{paddingRight:20}}
            renderItem={({item})=>{
              const isActive = item.id === activeCategory;
              return(
                <TouchableOpacity
                  onPress={()=>setActiveCategory(item.id)}
                  className={`mr-2 rounded-full shadow-lg px-3 py-3 ${
                    isActive ? "bg-primary" : "bg-white border border-primary"
                  }`}
                >
                  <Text className={`font-semibold ${isActive ? "text-white" : "text-gray-700"}`}>
                    {item.title}
                  </Text>

                </TouchableOpacity>
              )
            }}
          
          />

        </View>


      </SafeAreaView>

    </View>
  )
}

const styles = StyleSheet.create({})