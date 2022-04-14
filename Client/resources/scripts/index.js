let main_url = `https://localhost:7039/api/songs/`;







function getSongs(){
    fetch(main_url).then(function(response){
        console.log(main_url);
        console.log(response);
        return response.json();
    }).then(function(json) {
        console.log(json);
        let html = ``;
        json.forEach((song) => {
            html += `<div class="card col-md-4 bg-dark text-white">`
            html += `<img src="./resources/images/music.jpeg" class="card-img" alt="...">`
            html += `<div class="card-img-overlay">`
            var cardTitle = song.songID + " - " + song.songTitle
            if(song.favorited == "true"){
                cardTitle += " (Favorite!)";}
            html += `<h5 class="card-title">`+cardTitle+`</h5>`
            html += `</div>`
            html += `</div>`
        });
        if(html === ``){
            html = "No Songs found :("
        }
        document.getElementById("cards").innerHTML = html;

    }).catch(function(error) {
        console.log(error);
    })
}
        
function postSong(){
    const songTitle = document.getElementById("title").value;
    console.log(songTitle);
    fetch(main_url, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify( {
                songTitle: songTitle,
                songTimestamp: new Date().toISOString(),
                deleted: "false",
                favorited: "false"
            })
    }).then((response) => {
        console.log(response);
        getSongs();
    })
}


function deleteSong(){
    const deleteID = document.getElementById("IDToDelete").value;
    console.log(deleteID);
    let specific_url = main_url;
    specific_url += deleteID;
    console.log(specific_url);
    fetch(specific_url, {
            method: "DELETE",
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            }
    }).then((response) => {
        console.log(response);
        getSongs();
    })
}


function favoriteSong()
{
    const songID = document.getElementById("IDToFavorite").value;
    let specific_url = main_url;
    specific_url += songID;

    fetch(specific_url)
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(json){
        let title = json.songTitle;
        let timestamp = json.songTimeStamp;
        let deleted = json.deleted;
        return fetch(specific_url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify( {
                songID: songID,
                songTitle: title,
                songTimestamp: timestamp,
                deleted: deleted,
                favorited: 'true'
            })
        });
    })
    .then(function(response){
        console.log(response);
        getSongs();
    })
    .catch(function(error){
        console.log(error);
    })
}


function findSongs(){
    var url = "https://www.songsterr.com/a/ra/songs.json?pattern="
    let searchString = document.getElementById("searchSong").value;

    url += searchString;

    console.log(searchString)

    fetch(url).then(function(response) {
		console.log(response);
		return response.json();
	}).then(function(json) {
        console.log(json)
        let html = ``;
		json.forEach((song) => {
            console.log(song.title)
            html += `<div class="card col-md-4 bg-dark text-white">`;
			html += `<img src="./resources/images/music.jpeg" class="card-img" alt="...">`;
			html += `<div class="card-img-overlay">`;
			html += `<h5 class="card-title">`+song.title+`</h5>`;
            html += `</div>`;
            html += `</div>`;
		});
		
        if(html === ``){
            html = "No Songs found :("
        }
		document.getElementById("searchSongs").innerHTML = html;

	}).catch(function(error) {
		console.log(error);
	})
}