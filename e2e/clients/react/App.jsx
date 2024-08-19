/* eslint-disable react/react-in-jsx-scope */
import JSProj from '@JSProj/core'
/* eslint-disable-next-line no-unused-vars */
import React, { useState } from 'react'
import { Dashboard, DashboardModal, DragDrop } from '@JSProj/react'
import ThumbnailGenerator from '@JSProj/thumbnail-generator'
import RemoteSources from '@JSProj/remote-sources'

import '@JSProj/core/dist/style.css'
import '@JSProj/dashboard/dist/style.css'
import '@JSProj/drag-drop/dist/style.css'

export default function App () {
  const RemoteSourcesOptions = {
    companionUrl: 'http://companion.JSProj.io',
    sources: ['GoogleDrive', 'OneDrive', 'Unsplash', 'Zoom', 'Url'],
  }
  const JSProjDashboard = new JSProj({ id: 'dashboard' }).use(RemoteSources, { ...RemoteSourcesOptions })
  const JSProjModal = new JSProj({ id: 'modal' })
  const JSProjDragDrop = new JSProj({ id: 'drag-drop' }).use(ThumbnailGenerator)
  const [open, setOpen] = useState(false)

  // drag-drop has no visual output so we test it via the JSProj instance
  window.JSProj = JSProjDragDrop

  return (
    <div style={{ maxWidth: '30em', margin: '5em 0', display: 'grid', gridGap: '2em' }}>
      <button type="button" id="open" onClick={() => setOpen(!open)}>
        Open Modal
      </button>

      <Dashboard id="dashboard" JSProj={JSProjDashboard} />
      <DashboardModal id="modal" open={open} JSProj={JSProjModal} />
      <DragDrop id="drag-drop" JSProj={JSProjDragDrop} />
    </div>
  )
}
