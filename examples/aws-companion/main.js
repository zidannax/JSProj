import AwsS3 from '@JSProj/aws-s3'
import JSProj from '@JSProj/core'
import Dashboard from '@JSProj/dashboard'
import GoogleDrive from '@JSProj/google-drive'
import Webcam from '@JSProj/webcam'

import '@JSProj/core/dist/style.css'
import '@JSProj/dashboard/dist/style.css'
import '@JSProj/webcam/dist/style.css'

const JSProj = new JSProj({
  debug: true,
  autoProceed: false,
})

JSProj.use(GoogleDrive, {
  companionUrl: 'http://localhost:3020',
})
JSProj.use(Webcam)
JSProj.use(Dashboard, {
  inline: true,
  target: 'body',
  plugins: ['GoogleDrive', 'Webcam'],
})
JSProj.use(AwsS3, {
  companionUrl: 'http://localhost:3020',
})
