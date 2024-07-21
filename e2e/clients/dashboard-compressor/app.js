import JSProj from '@JSProj/core'
import Dashboard from '@JSProj/dashboard'
import Compressor from '@JSProj/compressor'

import '@JSProj/core/dist/style.css'
import '@JSProj/dashboard/dist/style.css'

const JSProj = new JSProj()
  .use(Dashboard, {
    target: document.body,
    inline: true,
  })
  .use(Compressor, {
    mimeType: 'image/webp',
  })

// Keep this here to access JSProj in tests
window.JSProj = JSProj
