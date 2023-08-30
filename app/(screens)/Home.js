import { useState, useEffect } from 'react'
import { SafeAreaView, Text, Image, View, TextInput, ScrollView } from 'react-native'
import { UserIcon, ChevronDownIcon, MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from 'react-native-heroicons/outline'
import { Stack } from 'expo-router';

import Categories from '../../components/Categories';
import FeaturedRow from '../../components/FeaturedRow';
// import FeaturedRowSection from '../components/FeaturedRowSection';
import { getAllCategories, getFeaturedRestaurants } from '../../sanity'

// NEED THIS FOR TAILWIND TO LOAD ON WEB
import { NativeWindStyleSheet } from "nativewind";
NativeWindStyleSheet.setOutput({
  default: "native",
});

import "../../global.css";
import Header from '../Header';


export default function HomePage() {
  // let imageUrl = require('../assets/yo-soy-LAC.png')
  
  const [featuredRestaurants, setFeaturedRestaurants] = useState([])

  useEffect(() => {
    getFeaturedRestaurants()
    .then(data => {
      setFeaturedRestaurants(data)
    })
  }, [])

  return (
    <SafeAreaView className='bg-gray-100'>    
      {/* Header */}
      <View className='flex-row items-center px-4 pt-5 space-x-2 bg-white pb-7'>
        <Stack.Screen
          options={{
            title: 'Deliveroo',
            headerStyle: { backgroundColor: '#f4511e' },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            // headerTitle: props => <Header {...props} />,
            header: props => <Header {...props} />,
          }}
        />
        <Image
          // source={imageUrl}
          source={{
            uri: 'https://links.papareact.com/wru'
          }}
          className="w-10 h-10 p-4 bg-gray-300 rounded-full"
        /> 

        <View className='flex-1'>
          <Text className='text-xs font-bold text-gray-400'>Deliver Now!</Text>
          <Text className='text-xl font-bold'>
            Current Location
            <ChevronDownIcon size={20} color='#00ccbb' />
          </Text>
        </View>

        <UserIcon size={35} color='#00ccbb'/>
      </View>
      
      {/* Search */}
      <View className='flex-row items-center px-4 pb-2 space-x-2 bg-white'>
        <View className='flex-row flex-1 p-3 space-x-2 bg-gray-200'>
          <MagnifyingGlassIcon size={20} color='gray' />
          <TextInput 
            placeholder='Restaurants and Cuisines' 
            keyboardType='default'  
          />
        </View>
        <AdjustmentsHorizontalIcon size={35} color='#00ccbb'/>
      </View>

      {/* Body */}
      <ScrollView>
        {/* Categories */}
        <Categories />

        {/* Featured */}
        {featuredRestaurants?.map(featured => (
          <FeaturedRow 
          key={featured?._id}
          id={featured?._id}
          title={featured?.name}
          description={featured?.short_description}
          data={featured?.restaurants}
        />
        ))}
        


      </ScrollView>

      {/* Featured Rows SECTIONLIST usage*/}
      {/* <View className='h-[69vh]'>
        <FeaturedRowSection 
            title='Featured Title'
            description='Paid placements for our partners'
          />
      </View> */}
      
    </SafeAreaView>
  )
}