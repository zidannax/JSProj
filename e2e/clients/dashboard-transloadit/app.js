import { JSProj } from '@JSProj/core'
import Dashboard from '@JSProj/dashboard'
import Transloadit from '@JSProj/transloadit'

import generateSignatureIfSecret from './generateSignatureIfSecret.js'

import '@JSProj/core/dist/style.css'
import '@JSProj/dashboard/dist/style.css'

// Environment variables:
// https://en.parceljs.org/env.html
const JSProj = new JSProj()
  .use(Dashboard, { target: '#app', inline: true })
  .use(Transloadit, {
    service: process.env.VITE_TRANSLOADIT_SERVICE_URL,
    waitForEncoding: true,
    getAssemblyOptions: () => generateSignatureIfSecret(process.env.VITE_TRANSLOADIT_SECRET, {
      auth: { key: process.env.VITE_TRANSLOADIT_KEY },
      template_id: process.env.VITE_TRANSLOADIT_TEMPLATE,
    }),
  })

// Keep this here to access JSProj in tests
window.JSProj = JSProj
