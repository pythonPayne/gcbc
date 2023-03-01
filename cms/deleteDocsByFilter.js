const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: '4ufj1fpw',
  dataset: 'production',
  apiVersion: '2022-01-08',
  // token: '',
  useCdn: false,
})

client
  .delete({query: '*[_type == "confession"]'})
  .then(() => {
    console.log('It was deleted')
  })
  .catch((err) => {
    console.error('Delete failed: ', err.message)
  })
