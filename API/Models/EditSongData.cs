using API.Models.Interfaces;
using MySql.Data.MySqlClient;

namespace API.Models
{
    public class EditSongData : IEditSongs
    {

        public void Edit(Song song)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = $@"UPDATE songs SET song_title=@title, song_time_stamp=@timestamp, deleted=@deleted, favorited=@favorited WHERE id=@id";
            using var cmd = new MySqlCommand(stm, con);
            cmd.Parameters.AddWithValue("@id", song.SongID);
            cmd.Parameters.AddWithValue("@title", song.SongTitle);
            cmd.Parameters.AddWithValue("@timestamp", song.SongTimestamp);
            cmd.Parameters.AddWithValue("@favorited", song.Favorited);
            cmd.Parameters.AddWithValue("@deleted", song.Deleted);
            cmd.Prepare();
            cmd.ExecuteNonQuery();
        }
    }
}