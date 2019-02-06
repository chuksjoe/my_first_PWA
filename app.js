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
	const res = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25`);
	const json = await res.json();
	
	main.innerHTML = json.data.map(createMeme).join('\n');
}

function createMeme(e){
	const result = `<h3>${e.title}</h3><img scr="${e.images.fixed_width.url}">`;
	return result;
}