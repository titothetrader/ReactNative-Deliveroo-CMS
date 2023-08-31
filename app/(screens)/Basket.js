import { View, Text, ScrollView, SafeAreaView, Pressable, Image } from 'react-native'
import React, { useMemo, useState } from 'react'
import Header from '../Header'
import { Link, Stack, router, useLocalSearchParams, } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { selectRestaurant } from '../../features/restaurantSlice'
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../../features/basketSlice'
import { XCircleIcon } from 'react-native-heroicons/solid'
import { urlFor } from '../../sanity'
import CurrencyFormat from 'react-currency-format'
import { createSelector } from 'reselect'

const Basket = () => {
    const restaurant = useSelector(selectRestaurant)
    const cart = useSelector(selectBasketItems)
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([])
    const dispatch = useDispatch()

    // Need to use createSelector in order to memoize value of large data to make it persistent
    const selectedItems = createSelector(
        state => state.basket,
        itemsArray => selectBasketTotal(itemsArray)
    )
    const cartTotal = useSelector(selectedItems)

    useMemo(() => {
        const groupedItems = cart.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item)
            return results
        }, {})
        
        setGroupedItemsInBasket(groupedItems)
    }, [cart])

    console.log(groupedItemsInBasket)
    
  return (
    <SafeAreaView className='flex-1 bg-white'>
        <View className='flex-1 bg-gray-100'>
            <View className='p-5 border-b border-[#00ccbb] bg-white shadow-xs'>
                <View>
                    <Text className='text-lg font-bold text-center'>Cart</Text>
                    <Text className='text-center text-gray-400'>{restaurant.title}</Text>
                </View>

                <Pressable 
                    className='absolute bg-gray-100 rounded-full top-3 right-5'
                    onPress={() => {
                        router.back()
                    }}
                >
                    <XCircleIcon size={50} color='#00ccbb'/>
                </Pressable>
            </View>

            <View className='flex-row items-center px-4 py-3 my-5 space-x-4 bg-white'>
                <Image 
                    source={{
                        uri: 'https://links.papareact.com/wru'
                    }}
                    className='p-4 bg-gray-300 rounded-full h-7 w-7'
                />
                <Text className="flex-1">Deliver in 50-75 min</Text>
                <Pressable>
                    <Text className='text-[#00ccbb]'>Change</Text>
                </Pressable>
            </View>

            <ScrollView className='divide-y divide-gray-200'>
                {Object.entries(groupedItemsInBasket)?.map(([key, items]) => (
                    <View key={key} className='flex-row items-center px-5 py-2 space-x-3 bg-white'>
                        <Text className='text-[#00ccbb]'>{items.length} x </Text>
                        <Image 
                            source={{
                                uri: urlFor(items[0]?.image).url()
                            }}
                            className='w-12 h-12 rounded-full'
                        />
                        <Text className='flex-1'>{items[0].name}</Text>
                        
                        <CurrencyFormat 
                            value={items[0].price} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'$'} 
                            renderText={formattedValue => (
                                <Text className='text-gray-600'>{formattedValue}</Text>
                            )} 
                        />

                        <Pressable>
                            <Text
                                className='text-[#00ccbb] text-xs'
                                onPress={() => dispatch(removeFromBasket({ id: key }))}
                            >
                                Remove
                            </Text>
                        </Pressable>
                    </View>
                ))}
            </ScrollView>

            <View className='p-5 mt-5 space-y-4 bg-white'>
                <View className='flex-row justify-between'>
                    <Text className='text-gray-400'>Subtotal</Text>
                    <CurrencyFormat 
                            value={cartTotal} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'$'} 
                            renderText={formattedValue => (
                                <Text className='text-gray-400'>{formattedValue}</Text>
                            )} 
                        />
                </View>

                <View className='flex-row justify-between'>
                    <Text className='text-gray-400'>Delivery Fee</Text>
                    <CurrencyFormat 
                            value={`${cartTotal === 0 ? '0' : '5.99'}`} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'$'} 
                            renderText={formattedValue => (
                                <Text className='text-gray-400'>{formattedValue}</Text>
                            )} 
                        />
                </View>

                <View className='flex-row justify-between'>
                    <Text className='font-extrabold'>Order Total</Text>
                    <CurrencyFormat 
                            value={cartTotal + (cartTotal === 0 ? 0 : 5.99)} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'$'} 
                            renderText={formattedValue => (
                                <Text className='font-extrabold'>{formattedValue}</Text>
                            )} 
                        />
                </View>

                <Pressable className='bg-[#00ccbb] rounded-lg w-full p-4'>
                    <Text className='text-lg font-extrabold text-center text-white'>Place Order</Text>
                </Pressable>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default Basket