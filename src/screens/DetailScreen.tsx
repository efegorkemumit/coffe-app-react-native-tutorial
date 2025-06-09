import { Dimensions, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign, Feather } from '@expo/vector-icons'
import { themeColors } from '../theme'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, decreaseQty, increaseQty } from '../store/CartSlice'

const windowWidth = Dimensions.get('window').width
const BG_IMAGE_HEIGHT = windowWidth * 0.75
const ITEM_CONTAINER_SIZE = windowWidth * 0.65
const ITEM_IMAGE_SIZE = ITEM_CONTAINER_SIZE

export default function DetailScreen(props) {

  const item = props.route.params;
  const [size, setSize] = useState('small')
  const navigation = useNavigation()

    const dispatch = useDispatch()

    const cartItem = useSelector(state=>state.cart.items.find(i=>i.id === item.id))
    const qty = cartItem?.qty ?? 1 

  return (
    <View className='flex-1 bg-white'>
      <StatusBar hidden />

      <Image
        source={require('../../assets/images/bg2.png')}
        className='absolute w-full'
        style={{
          height: BG_IMAGE_HEIGHT,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
        }}
      />
      <SafeAreaView className='flex-1 justify-between'>

        {/* Üst toolbar */}
        <View className='mx-4 flex-row mt-9 justify-between items-center'>
          <TouchableOpacity className='p-2 rounded-full border border-white'
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className='p-2 rounded-full border border-white' >
            <AntDesign name="hearto" size={24} color="white" />
          </TouchableOpacity>
        </View>


        {/* Ortadaki kahve görseli */}
        <View className='items-center -mt-8'>
          <View
            style={{
              width: ITEM_CONTAINER_SIZE,
              height: ITEM_CONTAINER_SIZE,
              shadowColor: themeColors.bgSecondary,
              shadowRadius: 20,
              shadowOpacity: 0.4
            }}
          >

            <Image
              source={item.image}
              style={{
                width: ITEM_IMAGE_SIZE,
                height: ITEM_IMAGE_SIZE
              }}
              resizeMode='contain'
            />


          </View>

        </View>

        {/* İçerik kartı */}

        <View className='px-6 pt-8 pb-6'
          style={{
            marginTop: -ITEM_CONTAINER_SIZE / 2.5,

          }}
        >
          <View className='flex-row justify-between items-center'>
            <View>
              <Text
                className='text-3xl font-semibold'
                style={{ color: themeColors.text }}
              >
                {item.name}
              </Text>

              <Text
                className='text-xl mt-1 font-semibold'
                style={{ color: themeColors.text }}
              >
                ${item.price}
              </Text>

            </View>
            <View className='absolute right-6 bg-primary px-3 py-1 rounded-full'>
              <Text
                className='text-xl mt-1 font-semibold'
                style={{ color: themeColors.text }}
              >
                {item.stars}
              </Text>
            </View>


          </View>


          {/* Boyut seçim butonları */}

          <View className='flex flex-row justify-between gap-8 mt-2'>
            {['small', 'medium', 'large'].map((s) => (
              <TouchableOpacity
                key={s}
                onPress={() => setSize(s)}
                className='flex-1 py-3 rounded-full'
                style={{
                  backgroundColor:
                    size === s ? themeColors.bgPrimary : '#fff',
                  borderWidth: size === s ? 0 : 1,
                  borderColor: themeColors.bgPrimary
                }}
              >
                <Text className='text-center font-semibold'
                  style={{
                    color: size === s ? '#fff' : themeColors.text
                  }}
                >
                  {s.charAt(0).toLocaleUpperCase() + s.slice(1)}
                </Text>


              </TouchableOpacity>


            ))}



          </View>

          {/* Hakkında metni */}
          <Text className='mt-6 text-lg font-semibold'>
            About
          </Text>

          <Text className='mt-2 text-base text-gray-600'>
            {item.desc}
          </Text>


        </View>


        {/* Alt bölüm: hacim & adet kontrolleri */}

        <View className='px-4 mb-8 space-y-4'>

          <View className='flex flex-row justify-between'>
            {/* Volume */}
            <View className='flex-row items-center gap-2'>
              <Text className=' text-lg font-semibold'>
                Volume
              </Text>

              <Text className='text-base text-gray-600'>
                {item.volume}
              </Text>
            </View>
            {/* minus plus */}

            <View className='flex-row items-center p-1 px-4 gap-4'>
              <TouchableOpacity 
              onPress={()=>{
                if(qty > 1){
                  dispatch(decreaseQty(item.id))
                }
              }}>
                <AntDesign name="minuscircle" size={24} color={themeColors.bgPrimary} />
              </TouchableOpacity>
              <Text className='text-base text-gray-600'>
                {qty}
              </Text>
              <TouchableOpacity
                onPress={()=>{
                  if(!cartItem){
                    dispatch(addItem({
                      id:item.id,
                      name:item.name,
                      price:item.price,
                      image:item.image
                    }))
                    dispatch(increaseQty(item.id))
                  }else{
                     dispatch(increaseQty(item.id))
                  }
                }}
              >
                <AntDesign name="pluscircle" size={24} color={themeColors.bgPrimary} />
              </TouchableOpacity>
            </View>


          </View>

          <View className='flex-row items-center justify-between mt-1'>
            <TouchableOpacity className="p-4 rounded-full border border-gray-300">
              <Feather name="shopping-bag" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
            className='bg-primary flex-1 ml-4 rounded-full p-4'>
              <Text className='text-center text-white font-semibold text-base'>
                Buy Now
              </Text>
            </TouchableOpacity>



          </View>

        </View>




      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({})