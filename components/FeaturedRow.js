import { View, Text, ScrollView } from 'react-native'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import { urlFor } from '../sanity'

const FeaturedRow = ({id, title, description, data}) => {
    
  return (
    <View>
        <View className='flex-row items-center justify-between px-4 mt-4'>
            <Text className='text-lg font-bold'>{title}</Text>
            <ArrowRightIcon size={20} color='#00ccbb' />
        </View>

        <Text className='px-4 text-xs text-gray-500'>{description}</Text>
    
        <ScrollView
            horizontal
            className='px-4'
            // contentContainerStyle={{paddingHorizontal: 15}}
            showHorizontalScrollIndicator={false}
        >
            {/* Restaurant Card */}
            {data?.map(restaurant => {
                const imageUrl = urlFor(restaurant.image).width(1000).url()
                return (
                    <RestaurantCard 
                        key={restaurant._id}
                        id={restaurant._id}
                        imageUrl={imageUrl}
                        title={restaurant.name}
                        rating={restaurant.rating}
                        category={restaurant.category._ref}
                        address={restaurant.address}
                        short_description={restaurant.short_description}
                        dishes={restaurant.dishes}
                        long={restaurant.long}
                        lat={restaurant.lat}
                    />
                )
            })}
        </ScrollView>
    </View>
  )
}

export default FeaturedRow