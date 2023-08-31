import { View, Text, SafeAreaView, Pressable, Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectRestaurant } from '../../features/restaurantSlice'
import { XMarkIcon } from 'react-native-heroicons/solid'
import { router } from 'expo-router'
import * as Progress from 'react-native-progress'

const Delivery = () => {

  const restaurant = useSelector(selectRestaurant)

  return (
    <View className='bg-[#00ccbb] flex-1'>
      <SafeAreaView className='z-50'>
        <View className='flex-row items-center justify-between p-5'>
          <Pressable
            onPress={() => router.replace('/')}
          >
            <XMarkIcon size={30} color='white' />
          </Pressable>
          <Text className='text-lg font-light text-white'>Order Help</Text>
        </View>

        <View className='z-50 p-6 mx-5 my-2 bg-white rounded-md shadow-md'>
          <View className='flex-row justify-between'>
            <View>
              <Text className='text-lg text-gray-400'>Estimated Arrival</Text>
              <Text className='text-4xl font-bold'>45-55 Minutes</Text>
            </View>
            <Image 
              source={{
                uri: 'https://links.papareact.com/fls'
              }}
              className='w-20 h-20'
            />
          </View>

          <Progress.Bar indeterminate={true} color='#00ccbb' width={100}/>

          <Text className='mt-3 text-gray-500'>
            Your order at {restaurant.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default Delivery