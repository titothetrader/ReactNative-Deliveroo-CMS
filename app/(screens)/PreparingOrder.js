import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress'
import { router } from 'expo-router'

const PreparingOrder = () => {

  useEffect(() => {
    setTimeout(() => {
      router.replace({
        pathname: '/(screens)/Delivery'
      })
    }, 4000)
  }, [])

  return (
    <SafeAreaView className='bg-[#00ccbb] items-center justify-center flex-1'>
      <Animatable.Image
        source={require('../../assets/deliveroodribbbble.gif')}
        className='h-96 w-96'
        animation='slideInUp'
        iterationCount={1}
      />

      <Animatable.Text 
        className='my-10 text-lg font-bold text-center text-white'
        animation='slideInUp'
        iterationCount={1}

      >
          Waiting for Restaurant to accept your order...
      </Animatable.Text>

      <Progress.Bar indeterminate={true} color='white' width={200} />

    </SafeAreaView>
  )
}

export default PreparingOrder