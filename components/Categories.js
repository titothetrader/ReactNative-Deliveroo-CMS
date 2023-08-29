import { useEffect, useState } from 'react'
import { FlatList, ScrollView, Text, View } from 'react-native'
import CategoryCard from './CategoryCard'
import { getAllCategories, urlFor } from '../sanity';

const categoriesData = [
  {
    id: '1',
    title: 'First Item',
    imageUrl: 'https://links.papareact.com/gn7'
  },
  {
    id: '2',
    title: 'Second Item',
    imageUrl: 'https://links.papareact.com/gn7'
  },
  {
    id: '3',
    title: 'Third Item',
    imageUrl: 'https://links.papareact.com/gn7'
  },
];


const Categories = () => {
  const [allCategories, setAllCategories] = useState([])


  useEffect(() => {
    getAllCategories()
    .then(data => {
      setAllCategories(data)
    })
  
  }, [])
  
  const renderCategory = (category) => { 
    return (
      <CategoryCard imageUrl={urlFor(category.image).url()} title={category.name}/>
    )
  }

  return (
    allCategories && <FlatList 
      className='px-4 py-15'
      horizontal
      data={allCategories}
      renderItem={({item}) => renderCategory(item)}
      eyExtractor={item => item.id}
    />
  )
}

export default Categories