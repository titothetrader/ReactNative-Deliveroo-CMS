import { View, Text, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { urlFor } from '../sanity'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid'

const DishRow = (props) => {
    const imageUrl = urlFor(props.image).width(1000).url()
    const [isPressed, setIsPressed] = useState(false)

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
                        <Text className='mb-1 text-lg'>{props.name}</Text>
                        <Text className='text-gray-400'>{props.description}</Text>
                        <CurrencyFormat 
                            value={props.price} 
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
                            className='w-20 h-20 p-4 bg-gray-300 border border-gray-100'
                        />
                    </View>
                </View>
            </Pressable>

            {isPressed && (
                <View className='px-4 bg-white'>
                    <View className='flex-row items-center pb-3 space-x-2'>
                        <Pressable>
                            <MinusCircleIcon size={40} color='#00ccbb'/>
                        </Pressable>
                        <Text>0</Text>
                        <Pressable>
                            <PlusCircleIcon size={40} color='#00ccbb'/>
                        </Pressable>
                    </View>
                </View>
            )}
        </>
    )
}

export default DishRow