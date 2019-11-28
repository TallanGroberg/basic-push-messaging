console.log('hello from /sw.js')
self.addEventListener('push', e => {
  
    e.target.data = '<a>hello</a>'
  console.log('push recieved')
  self.registration.showNotification(e.target.data, {
    title: 'this title',
    body: 'notifffIIIIIed',
  })
})
