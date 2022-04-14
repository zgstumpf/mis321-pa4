using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using API.Models.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class songsController : ControllerBase
    {
        // Retrieve all songs in the database.
        // GET: api/songs
        [EnableCors("AnotherPolicy")]
        [HttpGet]
        public List<Song> Get()
        {
            IGetSong readObject1 = new ReadSongData();
            Song songToEdit = readObject1.GetSong(22);
            songToEdit.SongTitle = "EDITED";
            IEditSongs editObject = new EditSongData();
            editObject.Edit(songToEdit);

            IGetAllSongs readObject = new ReadSongData();
            return readObject.GetAllSongs();
        }

        // Retrieve a single song in the datbase.
        // GET: api/songs/5
        // The name after HttpGet must match the name used in the method!
        [EnableCors("AnotherPolicy")]
        [HttpGet("{SongID}", Name = "Get")]
        public Song Get(int SongID)
        {
            IGetSong readObject = new ReadSongData();
            Console.WriteLine(SongID);
            return readObject.GetSong(SongID);
        }

        // Add a song to the database.
        // POST: api/songs
        [EnableCors("AnotherPolicy")]
        [HttpPost(Name = "PostSong")]
        public void Post(Song song)
        {
            IInsertSong insertObject = new AddSong();
            insertObject.InsertSong(song);
        }
        
        // Edit a song in the database.
        // PUT: api/songs/5
        [EnableCors("AnotherPolicy")]
        // [HttpPut]
        // public void Put([FromBody] Song song)
        // {
        //     IEditSongs editObject = new EditSongData();
        //     editObject.Edit(song);
        // }
        [HttpPut("{SongID}")]
        public void Put(int SongID, [FromBody] Song song)
        {
            IEditSongs editObject = new EditSongData();
            editObject.Edit(song);
        }

        // Delete a song in the database.
        // DELETE: api/songs/5
        [EnableCors("AnotherPolicy")]
        [HttpDelete("{SongID}")]
        public void Delete(int SongID)
        {
            IDeleteSongs deleteObject = new RemoveSong();
            deleteObject.DeleteSong(SongID);
        }
    }
}
