import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const client = createClient({
    projectId: '1lp3w5qg',
    dataset: 'production',
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: '2023-05-03',
    token: 'skdTUDbPYxbALX6ZOeVZnQuexaApl4CI7lt12rhrNAONkVRZ0O85EXWVUitFdj8n9Cqbg1YFFco7ObfltC5IKaZM7qwWZjIq933PiNFyMAJL7qDd1iU3LmUmq2Rt55scAaNGJdS6TbkiF2LlWzteR6SCtFLBMLW4eG7WKSGWdsKDNTmgqlGH'
    // token: process.env.SANITY_SECRET_TOKEN
})

const builder = imageUrlBuilder(client)


export async function getFeaturedRestaurants() {
    const featuredRestaurants = await client.fetch(`
      * [_type == "featured"] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->,
        },
      }
    `)
    return featuredRestaurants
  }

export async function getAllCategories() {
  const categories = await client.fetch(`
    * [_type == "category"] {
      ...,
    }
  `)
  return categories
}

export async function getSingleCategoryById(id) {
  const category = await client.fetch(`
  * [_type == "category" && _id == "${id}"] {
  ...
}[0]
  `)
  return category.name
}

export const urlFor = (source) => {return builder.image(source)}

// RUN THIS to add exception for localhost 3000 CORS policy error
// sanity cors add http://localhost:3000

export default client