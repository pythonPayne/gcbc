import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {schemaTypes} from './schemas'
import {media} from 'sanity-plugin-media'

export default defineConfig({  
  name: import.meta.env.SANITY_STUDIO_NAME,
  title: import.meta.env.SANITY_STUDIO_TITLE,
  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_DATASET,
  plugins: [
    deskTool(), 
    visionTool(), 
    media(),
    unsplashImageAsset(),
  ],
  schema: {
    types: schemaTypes,
  },
})



