import { View, Text, SectionList } from 'react-native'
import { ArrowRightIcon } from 'react-native-heroicons/outline';

const featuredData = [
    {
      id: '1',
      title: 'Featured',
      data: [
        {
            description: 'Paid placement from our partners'
        },
      ],
    },
    {
      id: '2',
      title: 'Tasty Discounts',
      data: [
        {
            description: 'Everyone has been enjoying these juicy discounts!'
        },
      ],
    },
    {
      id: '3',
      title: 'Offers Near You',
      data: [
        {
            description: 'Why not support your local restaurant tonight!'
        },
     ],
    },
  ];

const FeaturedRowSection = ({title, description}) => {
  const renderTitle = (title) => (
    <View className='flex-row items-center justify-between px-4 mt-4'>
        <Text className='text-lg font-bold'>{title}</Text>
        <ArrowRightIcon size={20} color='#00ccbb' />
    </View>
  )

  const renderRow = (item) => (
    <Text className='px-4 text-xs text-gray-500'>{item.description}</Text>
  )

  return (
    <SectionList
      sections={featuredData}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => renderRow(item)}
      renderSectionHeader={({section: {title}}) => renderTitle(title)}
    />
  )
}

export default FeaturedRowSection