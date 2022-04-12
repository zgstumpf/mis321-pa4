function GetSongs(){
    const allSongsApiUrl = "https://localhost:7039/api/songs"
    fetch(allSongsApiUrl).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json) {
        console.log(json);
        let html = ``;
        json.forEach((song) => {
            console.log(song.songTitle);
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
    const postSongApiUrl = "https://localhost:7039/api/songs"
    const songTitle = document.getElementById("title").value;
    console.log(songTitle);
    fetch(postSongApiUrl, {
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
        GetSongs();
    })
}

// unfinished
function putSong(){
    const putSongApiUrl = "https://localhost:7039/api/songs"
    const songTitle = document.getElementById("title").value;
    console.log(songTitle);
    fetch(putSongApiUrl, {
            method: "PUT",
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify( {
                songID: songID,
                songTitle: song.songTitle,
                songTimestamp: new Date().toISOString(),
                deleted: "false",
                favorited: "false"
            })
    }).then((response) => {
        console.log(response);
        GetSongs();
    })
}


function DeleteSong(){
    const deleteID = document.getElementById("IDToDelete").value;
    console.log(deleteID);
    let deleteSongApiUrl = `https://localhost:7039/api/songs/`
    deleteSongApiUrl += deleteID
    fetch(deleteSongApiUrl, {
            method: "DELETE",
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            }
    }).then((response) => {
        console.log(response);
        GetSongs();
    })
}



function FavoriteSong(){
    const songID = document.getElementById("IDToFavorite").value;
    console.log(songID);
    let url = `https://localhost:7039/api/songs/`
    url += songID;
    console.log("Testing Favorite Function");
    console.log(url);

    let songTitle;
    let songTimestamp;

    // return json object at specific URL
    fetch(url).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json) {
        console.log("AAA");
        console.log("JSON OBJECT  " + json);
        console.log("AAA");

        // The correct json object is returned.
        // Below is the part that doesn't work.
        let song = json;
        songTitle = song[songTitle];
        songTimestamp = song[songTimestamp];})

    console.log("Title" + songTitle);
    console.log(songTimestamp);

    fetch(url, {
            method: "PUT",
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify( {
                songID: songID,
                songTitle: songTitle,
                songTimestamp: songTimestamp,
                deleted: "false",
                favorited: "true"
            })
    }).then((response) => {
        console.log(response);
        GetSongs();
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