const staticAssets = [
	'./',
	'./favicon.png',
	'./styles.css',
	'./app.js'
];

self.addEventListener('install', async event => {
	const cache = await caches.open('static-meme');
	cache.addAll(staticAssets);
});

self.addEventListener('fetch', async event => {
	const {request} = event;
	const url = new URL(request.url);
	if(url.origin == location.origin){
		event.respondWith(cacheData(request));
	}
	else{
		event.respondWith(networkFirst(request));
	}
});

async function cacheData(request){
	const cacheResponse = await caches.match(request);
	return cacheResponse || fetch(request);
}

async function networkFirst(request){
	const cache = await caches.open('dynami-meme');
	try{
		const response = await fetch(request);
		cache.put(request, response.clone());
		return response;
	}catch(error){
		return await cache.match(request);
	}
}