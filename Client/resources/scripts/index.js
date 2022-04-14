const port = '7039';
let main_url = `https://localhost:${port}/api/songs/`;




function getSongs(){
    fetch(main_url).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json) {
        console.log(json);

        let html = `<div class="row">`;
        let cardPlacementNumber = 0;

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
            cardPlacementNumber++;
            
            // After the third song in the row, a new row starts.
            if(cardPlacementNumber % 3 == 0)
            {
                html += `</div>`
                html += `<div class="row">`
            }
        });        
        
        // If there are no songs
        if(cardPlacementNumber == 0)
        {
            html == `<p>No songs found. Add some songs and/or make sure you are connected to the api server.</p>`
        }

        document.getElementById("cards").innerHTML = html;
    }).catch(function(error) {
        console.log(error);
    })
}
        
function postSong(){
    const songTitle = document.getElementById("title").value;
    
    // Clear input field
    document.getElementById("title").value = '';

    console.log(songTitle);
    fetch(main_url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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

    // Clear input field
    document.getElementById("IDToDelete").value = '';
    
    let specific_url = main_url;
    specific_url += deleteID;
    console.log(specific_url);
    fetch(specific_url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
    }).then((response) => {
        console.log(response);
        getSongs();
    })
}


function favoriteSong()
{
    const songID = document.getElementById("IDToFavorite").value;

    // Clear input field
    document.getElementById("IDToFavorite").value = ''

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

        // Switches favorited status. Lets you unfavorite a favorited song.
        let favorited = json.favorited;
        if(favorited == "false")
        {
            favorited = "true";
        }
        else{
            favorited = "false";
        }

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
                favorited: favorited
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