const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_DATASET,
  apiVersion: import.meta.env.SANITY_STUDIO_API_VERSION,
  // token: '',  
  useCdn: false, 
})

client
  .delete({query: '*[_type == "confession"]'})
  .then(() => {console.log('It was deleted')})
  .catch((err) => {console.error('Delete failed: ', err.message)})

