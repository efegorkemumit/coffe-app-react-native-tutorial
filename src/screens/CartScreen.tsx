import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { useNavigation } from '@react-navigation/native'
import { AntDesign, Entypo, Feather } from '@expo/vector-icons'
import { themeColors } from '../theme'
import { clearCart, decreaseQty, increaseQty, removeItem } from '../store/CartSlice'

export default function CartScreen() {

    const dispatch = useDispatch()
    const items = useSelector((state: RootState) => state.cart.items)
    const navigation = useNavigation()

    const safePrice = (p) => {
        const n = Number(p)
        return isNaN(n) ? 0 : n
    }

    const totalPrice = items.reduce(
        (sum, i) => sum + safePrice(i.price) * i.qty,
        0
    )
    return (
        <SafeAreaView>
            <StatusBar hidden />
            <View className='flex-row mt-5 items-center justify-between px-4 py-3 border border-gray-200'>
                <TouchableOpacity className='p-2 rounded-full border border-white'
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="arrowleft" size={24} color={themeColors.text} />
                </TouchableOpacity>
                <Text className='text-lg font-semibold text-secondary'>
                    Cart
                </Text>

                <TouchableOpacity className='p-2 rounded-full border border-white'
                    onPress={() => dispatch(clearCart())}
                >
                    <Entypo name="trash" size={20} color="red" />
                </TouchableOpacity>


            </View>

            <View className='px-4 pt-4'>
                <FlatList
                    data={items}
                    keyExtractor={i => i.id.toString()}
                    ListEmptyComponent={
                        <Text className='text-center text-gray-400'>
                            Empty Cart
                        </Text>
                    }
                    renderItem={({ item }) => {
                        const price = safePrice(item.price)
                        return (
                            <View className='flex-row items-center p-4 mb-4 border-b border-b-primary'>
                                <Image source={item.image} className='w-16 h-16 ' />
                                <View className='flex-1 ml-4'>

                                    <Text className='text-base font-medium'>
                                        {item.name}
                                    </Text>

                                    <Text className='text-base font-medium'>
                                        {price.toFixed(2)}$  x  {item.qty}
                                    </Text>


                                    <View className='flex-row items-center mt-3'>
                                        <TouchableOpacity
                                            onPress={() => dispatch(decreaseQty(item.id))}
                                            className="p-1"
                                        >
                                            <AntDesign
                                                name="minuscircle"
                                                size={24}
                                                color={themeColors.bgPrimary}
                                            />
                                        </TouchableOpacity>

                                        <Text
                                            className="mx-3 text-base"
                                            style={{ color: themeColors.text }}
                                        >
                                            {item.qty}
                                        </Text>

                                        <TouchableOpacity
                                            onPress={() => dispatch(increaseQty(item.id))}
                                            className="p-1"
                                        >
                                            <AntDesign
                                                name="pluscircle"
                                                size={24}
                                                color={themeColors.bgPrimary}
                                            />
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress={() => dispatch(removeItem(item.id))}
                                            className="ml-auto"
                                        >
                                            <Feather name="delete" size={24} color="red" />
                                        </TouchableOpacity>

                                    </View>
                                </View>

                            </View>
                        )
                    }}
                />


            </View>

            {items.length > 0 && (
                <View className='px-4 pb-8'>
                    <Text className='text-lg font-semibold mb-3 text-secondary'>
                       Toplam {totalPrice.toFixed(2)}$
                    </Text>
                    <TouchableOpacity className='bg-primary py-4 rounded-full px-2'>
                        <Text className='text-center text-xl font-semibold text-white'>
                            Checkout
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})