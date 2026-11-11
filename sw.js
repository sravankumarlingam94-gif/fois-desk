const CACHE='rakes-desk-shell-2';
const SHELL=['./','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(SHELL);}).then(function(){return self.skipWaiting();}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==CACHE;}).map(function(n){return caches.delete(n);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin) return;
  e.respondWith(fetch(e.request).then(function(r){
    if(r.ok){const copy=r.clone();caches.open(CACHE).then(function(c){c.put(e.request,copy);});}
    return r;
  }).catch(function(){return caches.match(e.request,{ignoreSearch:true}).then(function(m){return m||caches.match('./');});}));
});
