import { Pressable, View, Text, Image } from 'react-native'
import { StarIcon } from 'react-native-heroicons/solid'
import { MapPinIcon } from 'react-native-heroicons/outline'
import { getSingleCategoryById } from '../sanity'
import { useState, useEffect } from 'react'

const RestaurantCard = (props) => {
    const [categoryName, setCategoryName] = useState('')

    useEffect(() => {
        getSingleCategoryById(props.category).then(data => {
            setCategoryName(data)
        })
    }, [])
    

  return (
    <Pressable className='mr-3 bg-white shadow-lg'>
        <Image 
            source={{
                uri: props.imageUrl
            }}
            className='h-40 rounded-sm w-96'
        />
        <View className='px-3 pb-4'>
            <Text className='pt-2 text-lg font-bold'>{props.title}</Text>

            <View className='flex-row items-center space-x-1'>
                <StarIcon 
                    size={22}
                    className='w-10 h-10'
                    color='green'
                    opacity={.5}
                />
                <Text className='text-xs text-gray-500'>
                    <Text className='text-green-500'>
                        {props.rating}
                    </Text>
                    {' · '}{categoryName}
                </Text>
            </View>
            
            <View className='flex-row items-center space-x-1'>
                <MapPinIcon 
                    size={22}
                    className='w-10 h-10'
                    color='gray'
                    opacity={.4}
                />
                <Text className='text-xs text-gray-500'>Nearby · {props.address}</Text>
            </View>
            
        </View>
    </Pressable>
  )
}

export default RestaurantCard