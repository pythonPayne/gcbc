import sanityClient from '@sanity/client'
import {basename} from 'path'
import {createReadStream} from 'fs'
import { mp3s } from './mp3List'

const client = sanityClient({
  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_DATASET,
  apiVersion: import.meta.env.SANITY_STUDIO_API_VERSION,
  // token: '',  
  useCdn: false,
})

const upload_sermon_audio = (mp3) => {
  const {mp3FileName, assetId} = mp3
  const filePath = `/Users/stephen/dev/gcbc/mp3s/${mp3FileName}`
  client.assets
    .upload('file', createReadStream(filePath), { filename: basename(filePath) })
    .then(fileAsset => {
      
      return client
        .patch(assetId)
        .set({
          audio: {
            _type: 'file',
            asset: {
              _type: "reference",
              _ref: fileAsset._id
            }
          }
        })
        .commit()      
    })
    .catch((err) => {console.error('Upload failed: ', err.message)})

  }

mp3s.forEach((mp3) => upload_sermon_audio(mp3))

