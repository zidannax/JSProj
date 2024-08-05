import JSProj from '@JSProj/core'
import Dashboard from '@JSProj/dashboard'
import RemoteSources from '@JSProj/remote-sources'
import Webcam from '@JSProj/webcam'
import ScreenCapture from '@JSProj/screen-capture'
import GoldenRetriever from '@JSProj/golden-retriever'
import ImageEditor from '@JSProj/image-editor'
import DropTarget from '@JSProj/drop-target'
import Audio from '@JSProj/audio'
import Compressor from '@JSProj/compressor'

import '@JSProj/core/dist/style.css'
import '@JSProj/dashboard/dist/style.css'

const COMPANION_URL = 'http://companion.JSProj.io'

const JSProj = new JSProj()
  .use(Dashboard, { target: '#app', inline: true })
  .use(RemoteSources, { companionUrl: COMPANION_URL })
  .use(Webcam, {
    target: Dashboard,
    showVideoSourceDropdown: true,
    showRecordingLength: true,
  })
  .use(Audio, {
    target: Dashboard,
    showRecordingLength: true,
  })
  .use(ScreenCapture, { target: Dashboard })
  .use(ImageEditor, { target: Dashboard })
  .use(DropTarget, { target: document.body })
  .use(Compressor)
  .use(GoldenRetriever, { serviceWorker: true })

// Keep this here to access JSProj in tests
window.JSProj = JSProj
