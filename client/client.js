
publicVapidKey="BAXjBIcLzswbtiked4dtTw1GCE0KzfTWpkocdrBVrh2P2Jmr-S0VwwBt_wpXvOLQado6xemCGoWDpWwrxAqYT2E"



if('serviceWorker' in navigator) {
  send().catch(err => console.error(err))
}


//register sw register push, send push
async function send(){
  console.log('registering serviceWorker')
  //dont use ./ in front of sevice worker on registery use /sw.js
  const register = await navigator.serviceWorker.register('/sw.js')
  console.log('serviceWorker registered...')
  const subscription = register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  })
  console.log('push subscribed', subscription)

  //send push notification 

  console.log('sending push')

  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': "application/json"
    }
  })
  console.log('push sent')
} 

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
 
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
 
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}