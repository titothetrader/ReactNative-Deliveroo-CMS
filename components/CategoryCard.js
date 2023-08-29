import { View, Text, Image, Pressable } from 'react-native'

const CategoryCard = ({imageUrl, title}) => {
  return (
    <Pressable className='relative mr-2'>
        <Image 
            source={{
                uri: imageUrl,
            }} 
            className='w-20 h-20 rounded'
        />
        <Text className='absolute font-bold text-white bottom-1 left-1'>{title}</Text>
    </Pressable>
  )
}

export default CategoryCard