import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Restaurant Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'short_description',
      title: 'Short Description',
      type: 'string',
      validation: Rule => {
        Rule.required()
          .max(200)
      },
    }),
    defineField({
      name: 'image',
      title: 'Image of the Restaurant',
      type: 'image',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'lat',
      title: 'Latitude of the Restaurant',
      type: 'number',
    }),
    defineField({
      name: 'long',
      title: 'Longitude of the Restaurant',
      type: 'number',
    }),
    defineField({
      name: 'address',
      title: 'Address of the Restaurant',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating of the Restaurant',
      type: 'number',
      validation: Rule => {
        Rule.required()
        .min(1)
        .max(5)
        .error('Please enter a number between 1 and 5')
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      validation: Rule => Rule.required(),
      to: [{ type: 'category' }]
    }),
    defineField({
      name: 'dishes',
      title: 'Dishes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'dish' }] }]
    }),
  ],

  // preview: {
  //   select: {
  //     title: 'title',
  //     author: 'author.name',
  //     media: 'mainImage',
  //   },
  //   prepare(selection) {
  //     const {author} = selection
  //     return {...selection, subtitle: author && `by ${author}`}
  //   },
  // },
})
