import { JSProj } from '@JSProj/core'
import Dashboard from '@JSProj/dashboard'
import Tus from '@JSProj/tus'
import Unsplash from '@JSProj/unsplash'
import Url from '@JSProj/url'

import '@JSProj/core/dist/style.css'
import '@JSProj/dashboard/dist/style.css'

function onShouldRetry (err, retryAttempt, options, next) {
  if (err?.originalResponse?.getStatus() === 418) {
    return true
  }
  return next(err)
}

const companionUrl = 'http://localhost:3020'
const JSProj = new JSProj()
  .use(Dashboard, { target: '#app', inline: true })
  .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files', onShouldRetry })
  .use(Url, { target: Dashboard, companionUrl })
  .use(Unsplash, { target: Dashboard, companionUrl })

// Keep this here to access JSProj in tests
window.JSProj = JSProj
