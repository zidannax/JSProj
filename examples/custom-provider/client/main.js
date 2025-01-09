import JSProj from '@JSProj/core'
import GoogleDrive from '@JSProj/google-drive'
import Tus from '@JSProj/tus'
import Dashboard from '@JSProj/dashboard'
import MyCustomProvider from './MyCustomProvider.jsx'

import '@JSProj/core/dist/style.css'
import '@JSProj/dashboard/dist/style.css'

const JSProj = new JSProj({
  debug: true,
})

JSProj.use(GoogleDrive, {
  companionUrl: 'http://localhost:3020',
})

JSProj.use(MyCustomProvider, {
  companionUrl: 'http://localhost:3020',
})

JSProj.use(Dashboard, {
  inline: true,
  target: 'body',
  plugins: ['GoogleDrive', 'MyCustomProvider'],
})

JSProj.use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
