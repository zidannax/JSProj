import JSProj from '@JSProj/core'
import Dashboard from '@JSProj/dashboard'
import Instagram from '@JSProj/instagram'
import GoogleDrive from '@JSProj/google-drive'
import Url from '@JSProj/url'
import Webcam from '@JSProj/webcam'
import Tus from '@JSProj/tus'

import '@JSProj/core/dist/style.css'
import '@JSProj/dashboard/dist/style.css'
import '@JSProj/url/dist/style.css'
import '@JSProj/webcam/dist/style.css'

const TUS_ENDPOINT = 'https://tusd.tusdemo.net/files/'

const JSProj = new JSProj({
  debug: true,
  meta: {
    username: 'John',
    license: 'Creative Commons',
  },
})
  .use(Dashboard, {
    trigger: '#pick-files',
    target: '#upload-form',
    inline: true,
    metaFields: [
      { id: 'license', name: 'License', placeholder: 'specify license' },
      { id: 'caption', name: 'Caption', placeholder: 'add caption' },
    ],
    showProgressDetails: true,
    proudlyDisplayPoweredByJSProj: true,
    note: '2 files, images and video only',
    restrictions: { requiredMetaFields: ['caption'] },
  })
  .use(GoogleDrive, { target: Dashboard, companionUrl: 'http://localhost:3020' })
  .use(Instagram, { target: Dashboard, companionUrl: 'http://localhost:3020' })
  .use(Url, { target: Dashboard, companionUrl: 'http://localhost:3020' })
  .use(Webcam, { target: Dashboard })
  .use(Tus, { endpoint: TUS_ENDPOINT })

// You can optinally enable the Golden Retriever plugin — it will
// restore files after a browser crash / accidental closed window
// see more at https://JSProj.io/docs/golden-retriever/
//
//   .use(GoldenRetriever, { serviceWorker: true })

JSProj.on('complete', (result) => {
  if (result.failed.length === 0) {
    console.log('Upload successful 😀')
  } else {
    console.warn('Upload failed 😞')
  }
  console.log('successful files:', result.successful)
  console.log('failed files:', result.failed)
})

// uncomment if you enable Golden Retriever
//
/* eslint-disable compat/compat */
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('/sw.js')
//     .then((registration) => {
//       console.log('ServiceWorker registration successful with scope: ', registration.scope)
//     })
//     .catch((error) => {
//       console.log('Registration failed with ' + error)
//     })
// }
/* eslint-enable */
