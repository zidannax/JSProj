import { JSProj } from '@JSProj/core'
import Dashboard from '@JSProj/dashboard'
import XHRUpload from '@JSProj/xhr-upload'
import Unsplash from '@JSProj/unsplash'
import Url from '@JSProj/url'

import '@JSProj/core/dist/style.css'
import '@JSProj/dashboard/dist/style.css'

const companionUrl = 'http://localhost:3020'
const JSProj = new JSProj()
  .use(Dashboard, { target: '#app', inline: true })
  .use(XHRUpload, { endpoint: 'https://xhr-server.herokuapp.com/upload', limit: 6 })
  .use(Url, { target: Dashboard, companionUrl })
  .use(Unsplash, { target: Dashboard, companionUrl })

// Keep this here to access JSProj in tests
window.JSProj = JSProj
