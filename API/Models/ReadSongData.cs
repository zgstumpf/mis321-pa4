using API.Models.Interfaces;
using MySql.Data.MySqlClient;

namespace API.Models
{
    public class ReadSongData : IGetAllSongs, IGetSong
    {
        public List<Song> GetAllSongs()
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            // Display in most recent order
            string stm = @"SELECT * FROM songs ORDER BY song_time_stamp DESC";
            using var cmd = new MySqlCommand(stm, con);
            MySqlDataReader rdr = cmd.ExecuteReader();

            List<Song> songsFromDB = new List<Song>();
            while (rdr.Read())
            {
                Song newSong = new Song();
                newSong.SongID = rdr.GetInt32(0);
                newSong.SongTitle = rdr.GetString(1);
                newSong.SongTimestamp = rdr.GetDateTime(2);
                newSong.Deleted = rdr.GetString(3);
                newSong.Favorited = rdr.GetString(4);
                songsFromDB.Add(newSong);
            }
            rdr.Close(); 
            
            Console.WriteLine("Reading all songs...");
            foreach(Song song in songsFromDB)
            {
               Console.WriteLine(song.ToString()); 
            }
            
            return songsFromDB;
        }

        public Song GetSong(int SongID)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = $@"SELECT * FROM songs WHERE id={SongID}";
            Console.WriteLine("Fetching song " + SongID);
            using var cmd = new MySqlCommand(stm, con);
            MySqlDataReader rdr = cmd.ExecuteReader();
            Song newSong = new Song();
            if(rdr.Read())
            {
                newSong.SongID = rdr.GetInt32(0);
                newSong.SongTitle = rdr.GetString(1);
                newSong.SongTimestamp = rdr.GetDateTime(2);
                newSong.Deleted = rdr.GetString(3);
                newSong.Favorited = rdr.GetString(4);
            }
            rdr.Close(); 
            
            Console.WriteLine("Reading data from single song...");
            Console.WriteLine(newSong.ToString()); 
            return newSong;
        }
    }
}

