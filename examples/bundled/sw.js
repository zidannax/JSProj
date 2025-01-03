// This service worker is needed for Golden Retriever plugin,
// only include if you’ve enabled it
// https://JSProj.io/docs/golden-retriever/

/* globals clients */
/* eslint-disable no-restricted-globals */

const fileCache = Object.create(null)

function getCache (name) {
  if (!fileCache[name]) {
    fileCache[name] = Object.create(null)
  }
  return fileCache[name]
}

self.addEventListener('install', (event) => {
  console.log('Installing JSProj Service Worker...')

  event.waitUntil(Promise.resolve()
    .then(() => self.skipWaiting()))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

function sendMessageToAllClients (msg) {
  clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage(msg)
    })
  })
}

function addFile (store, file) {
  getCache(store)[file.id] = file.data
  console.log('Added file blob to service worker cache:', file.data)
}

function removeFile (store, fileID) {
  delete getCache(store)[fileID]
  console.log('Removed file blob from service worker cache:', fileID)
}

function getFiles (store) {
  sendMessageToAllClients({
    type: 'JSProj/ALL_FILES',
    store,
    files: getCache(store),
  })
}

self.addEventListener('message', (event) => {
  switch (event.data.type) {
    case 'JSProj/ADD_FILE':
      addFile(event.data.store, event.data.file)
      break
    case 'JSProj/REMOVE_FILE':
      removeFile(event.data.store, event.data.fileID)
      break
    case 'JSProj/GET_FILES':
      getFiles(event.data.store)
      break

    default: throw new Error('unreachable')
  }
})
