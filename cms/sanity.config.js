import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {schemaTypes} from './schemas'
import {media} from 'sanity-plugin-media'

export default defineConfig({  
  name: 'default',
  title: 'cms',
  projectId: '4ufj1fpw',
  dataset: 'production',
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



