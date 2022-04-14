// const express = require('express');
// const app = express();
// const cors = require('cors');
// app.use(express.json());
// app.use(cors())
// above was recently added



// TESTING

const allUrl = 'https://fakestoreapi.com/products/'; // link to api
const oneUrl = 'https://fakestoreapi.com/products/3'

function test()
{
    fetch(oneUrl)
        .then(function(response){
            console.log(response);
            return response.json();
        })
        .then(function(json){
            // Do stuff with data from oneUrl
            let title = json.title;
            console.log(title);
            console.log(json);
            return fetch(allUrl);
        })
        .then(function(response){
            console.log(response);
            return response.json();
        })
        .then(function(json){
            // Do stuff with data from allUrl
            console.log(json);
        })
        .catch(function(error){
            console.log(error);
        })
}



// TESTING


function GetSongs(){
    const allSongsApiUrl = "https://localhost:7039/api/songs"
    fetch(allSongsApiUrl).then(function(response){
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
// function putSong(){
//     const putSongApiUrl = "https://localhost:7039/api/songs"
//     const songTitle = document.getElementById("title").value;
//     console.log(songTitle);
//     fetch(putSongApiUrl, {
//             method: "PUT",
//             headers: {
//                 Accept: 'application/json',
//                 "Content-Type": 'application/json'
//             },
//             body: JSON.stringify( {
//                 songID: songID,
//                 songTitle: song.songTitle,
//                 songTimestamp: new Date().toISOString(),
//                 deleted: "false",
//                 favorited: "false"
//             })
//     }).then((response) => {
//         console.log(response);
//         GetSongs();
//     })
// }


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


function putSong()
{
    const putSongApiUrl = "https://localhost:7039/api/songs/15"
    fetch(putSongApiUrl, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify( {
                songID: 15,
                songTitle: "Test",
                songTimestamp: new Date().toISOString(),
                deleted: "false",
                favorited: "false"
            })
    }).then((response) => {
        console.log(response);
        GetSongs();
    })
}

function favoriteSong()
{
    const songID = document.getElementById("IDToFavorite").value;
    let url = `https://localhost:7039/api/songs/`
    url += songID;

    fetch(url)
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(json){
        let title = json.songTitle;
        let timestamp = json.songTimeStamp;
        let deleted = json.deleted;
        return fetch(url, {
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
        GetSongs();
    })
    .catch(function(error){
        console.log(error);
    })
}

function ExpiredFavoriteSong(){
    const songID = document.getElementById("IDToFavorite").value;
    let url = `https://localhost:7039/api/songs/`
    url += songID;

    let songTitle;
    let songTimestamp;

    fetch(url).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json) 
        {
            songTitle = json.songTitle;
            songTimestamp = json.songTimestamp;
            console.log(songTitle);  // Correct
            console.log(songTimestamp); // Correct
        }).then(
        )
    console.log(songTitle); // null
    console.log(songTimestamp); // null

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