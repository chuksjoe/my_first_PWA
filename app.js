window.addEventListener('load', async eve => {
	await fetchTrending();
	if('serviceWorker' in navigator){
		try{
			navigator.serviceWorker.register('serviceWorker.js');
			console.log('SW registered');
		}catch(err){
			console.log('SW failed!');
		}
	}
});

async function fetchTrending(){
	const apiKey = '1jHrig4xyEykjl3nnVeMoCHPzRb3o7Lu';
	const main = document.getElementById('main');
	const res = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=10`);
	const json = await res.json();
	
	// for(let i = 0; i < json.data.length; i++){
		// main.appendChild((createMeme(json.data[i])));
	// }
	json.data.map(e => {
		main.appendChild((createMeme(e)));
	});
}

function createMeme(e){
	const ele = document.createElement('div');
	const h3 = document.createElement('h3');
	const img = document.createElement('img');
	
	h3.innerHTML = e.title;
	img.setAttribute('src', e.images.original.url);
	img.setAttribute('alt', e.title);
	
	ele.append(h3, img);
	
	return ele;
}