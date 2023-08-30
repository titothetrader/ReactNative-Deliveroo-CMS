import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter, Link, Stack } from 'expo-router'
import Header from '../Header'
import { ArrowLeftIcon, ChevronRightIcon, MapPinIcon, StarIcon } from 'react-native-heroicons/solid'
import { QuestionMarkCircleIcon } from 'react-native-heroicons/outline'
import DishRow from '../../components/DishRow'

const Restaurant = (props) => {
  const router = useRouter()
  const {
    id,
    imageUrl,
    title,
    rating,
    category,
    address,
    short_description,
    dishes,
    long,
    lat,
  } = useLocalSearchParams()
  const dishesArray = JSON.parse(dishes) // Need to parse data back into array form

  return (
    <ScrollView>
      <Stack.Screen
          options={{
            title: title,
            headerStyle: { backgroundColor: '#f4511e' },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            // headerTitle: props => <LogoTitle {...props} />,
            header: props => <Header {...props} />,
          }}
        />
        <View className='relative'>
          <Image 
              source={{
                  uri: imageUrl
              }}
              className='w-full h-56 p-4 bg-gray-300 rounded-sm'
          />
          <View className='absolute p-2 m-5 bg-gray-100 rounded-full'>
            <Link href={'/'}>
              <ArrowLeftIcon size={20} color='#00ccbb'/>
            </Link>
          </View>
        </View>

        <View className='bg-white'>
          <View className='px-4 pt-4'>
            <Text className='text-3xl font-bold'>{title}</Text>
            <View className='flex-row items-center my-1 space-x-2'>
              
              <View className='flex-row items-center space-x-1'>
                <StarIcon 
                      size={22}
                      // className='w-10 h-10'
                      color='green'
                      opacity={.4}
                  />
                  <Text className='text-xs text-gray-500'>
                    <Text className='text-green-500'>
                        {rating}
                    </Text>
                    {' · '}{category}
                  </Text>
                </View>

                <View className='flex-row items-center space-x-1'>
                  <MapPinIcon 
                    size={22}
                    // className='w-10 h-10'
                    color='gray'
                    opacity={.4}
                  />
                  <Text className='text-xs text-gray-500'>Nearby · {address}</Text>
                </View>
            </View>
            <Text className='pb-4 mt-2 text-gray-500'>{short_description}</Text>
          </View>

          <Pressable className='flex-row items-center p-4 space-x-2 border-gray-300 border-y'>
            <QuestionMarkCircleIcon size={20} color='gray' opacity={.4}/>
            <Text className="flex-1 pl-2 font-bold text-md">
              Have a food allergy?
            </Text>
            <ChevronRightIcon color="#00ccbb" />
          </Pressable>
        </View>

        <View>
          <Text className='px-4 pt-6 mb-3 text-xl font-bold'>
            Menu
          </Text>

          {/* Dishrows */}
          {dishesArray?.map(dish => (
            <DishRow 
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
        
    </ScrollView>
  )
}

export default Restaurant