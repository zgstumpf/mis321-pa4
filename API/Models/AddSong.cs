using API.Models.Interfaces;
using MySql.Data.MySqlClient;

namespace API.Models
{
    public class AddSong : IInsertSong
    {
        public void InsertSong(Song song)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"INSERT INTO songs(song_title, song_time_stamp, deleted, favorited) VALUES(@song_title, @song_time_stamp, @deleted, @favorited)";
            using var cmd = new MySqlCommand(stm, con);
            cmd.Parameters.AddWithValue("@song_title", song.SongTitle);
            cmd.Parameters.AddWithValue("@song_time_stamp", song.SongTimestamp);
            cmd.Parameters.AddWithValue("@deleted", song.Deleted);
            cmd.Parameters.AddWithValue("@favorited", song.Favorited);
            cmd.Prepare();
            cmd.ExecuteNonQuery();
        }
    }
}