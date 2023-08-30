import { View, Text, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { urlFor } from '../sanity'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid'
import { useSelector, useDispatch } from 'react-redux'
import { addToBasket, removeFromBasket, selectBasketItemsWithId } from '../features/basketSlice'
import { createSelector } from 'reselect'

const DishRow = ({id, name, price, description, image}) => {
    const imageUrl = urlFor(image).width(1000).url()
    const [isPressed, setIsPressed] = useState(false)
    const dispatch = useDispatch()

    // Need to use createSelector in order to memoize value of large data to make it persistent
    const selectedItems = createSelector(
        state => state.basket,
        itemsArray => selectBasketItemsWithId(itemsArray, id)
    )
    const cart = useSelector(selectedItems)

    const addItemToBasket = () => {
        dispatch(addToBasket({id, name, price, description, image}))
    }

    const removeItemFromBasket = () => {
        if (cart.length < 1) return // defensive programming to stop consuming resources of trying to remove something that doesn't exist
        
        dispatch(removeFromBasket({ id }))
    }

    return (
        <>
            <Pressable 
                className={`p-4 bg-white border border-gray-200 ${
                    isPressed && 'border-b-0'
                }`}
                onPress={() => setIsPressed(!isPressed)}
            >
                <View className='flex-row'>
                    <View className='flex-1 pr-2'>
                        <Text className='mb-1 text-lg'>{name}</Text>
                        <Text className='text-gray-400'>{description}</Text>
                        <CurrencyFormat 
                            value={price} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'$'} 
                            renderText={formattedValue => (
                                <Text className='mt-2 text-gray-400'>{formattedValue}</Text>
                            )} 
                        />
                    </View>

                    <View>
                        <Image 
                            source={{ uri: imageUrl }} 
                            className='w-20 h-20 p-4 bg-gray-300'
                            style={{
                                borderWidth: 1,
                                borderColor: 'lightgray'
                            }}
                        />
                    </View>
                </View>
            </Pressable>

            {isPressed && (
                <View className='px-4 bg-white'>
                    <View className='flex-row items-center pb-3 space-x-2'>
                        <Pressable onPress={removeItemFromBasket} disabled={cart.length < 1}>
                            <MinusCircleIcon size={40} color={`${cart.length < 1 ? 'lightgray' : '#00ccbb'}`}/>
                        </Pressable>
                        <Text>{cart.length}</Text>
                        <Pressable onPress={addItemToBasket}>
                            <PlusCircleIcon size={40} color='#00ccbb'/>
                        </Pressable>
                    </View>
                </View>
            )}
        </>
    )
}

export default DishRow