import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import CurrencyFormat from 'react-currency-format'
import { router } from 'expo-router'

const BasketIcon = () => {
    const cart = useSelector(selectBasketItems)
    
    // Need to use createSelector in order to memoize value of large data to make it persistent
    const selectedItems = createSelector(
        state => state.basket,
        itemsArray => selectBasketTotal(itemsArray)
    )
    const cartTotal = useSelector(selectedItems)

    // Disable Basket icon if empty
    if (cart.length < 1) return null

    return (
        <View className='absolute z-50 w-full bottom-10'>
            <Pressable 
                className='flex-row mx-5 bg-[#00ccbb] items-center p-4 rounded-lg space-x-1 justify-around'
                onPress={() => {
                    router.replace({
                        pathname: '/(screens)/Basket', 
                        // params: {
                        //     cart: JSON.stringify(cart)
                        // }
                    })
                }}
            >
                <Text className='text-lg font-extrabold text-white bg-[#01a296] py-1 px-2 rounded-lg'>
                    {cart.length}
                </Text>
                <Text className='text-lg font-extrabold text-white'>
                    View Basket
                </Text>
                <CurrencyFormat 
                    value={cartTotal} 
                    displayType={'text'} 
                    thousandSeparator={true} 
                    prefix={'$'} 
                    renderText={formattedValue => (
                        <Text className='text-lg font-extrabold text-white'>{formattedValue}</Text>
                    )} 
                />
            </Pressable>
        </View>
    )
}

export default BasketIcon